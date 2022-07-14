# 12.2.1 - Replicating the Crash

## Practice - Replicating the Crash

_(To be performed on your own Kali and Debian lab client machines - Reporting is required for these exercises)_

1.  Log in to your dedicated Linux client using the credentials you received.
In order to login to our linux client we simply need to start the machine and then rdesktop with our credentials.
`rdesktop -u student -g 1024x768 -r clipboard:CLIPBOARD 192.168.233.44`

2.  On your Kali machine, recreate the proof-of-concept code that crashes the Crossfire server.


3.  Attach the debugger to the Crossfire server, run the exploit against your Linux client, and confirm that the EIP register is overwritten by the malicious buffer.