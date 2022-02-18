# 4.2.5 exercises
#### Exercises

_(To be performed on your own Kali and Windows 10 lab client machines - Reporting is required for these exercises)_

1.  Use **socat ** to transfer **powercat.ps1 ** from your Kali machine to your Windows system. Keep the file on your system for use in the next section.
host
`sudo socat TCP4-LISTEN:443,fork file:secret_passwords.txt`
recipient
`socat TCP4:10.11.0.4:443 file:received_secret_passwords.txt,create`
2.  Use **socat ** to create an encrypted reverse shell from your Windows system to your Kali machine.


3.  Create an encrypted bind shell on your Windows system. Try to connect to it from Kali without encryption. Does it still work?


4.  Make an unencrypted **socat ** bind shell on your Windows system. Connect to the shell using Netcat. Does it work?

