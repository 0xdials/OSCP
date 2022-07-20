# 16.1.4 Considerations and Preparations
**1.  Start the Pure-FTPd FTP server on your Kali system, connect to it using the FTP client on the Debian lab VM, and observe how the interactive prompt works.**

The following script will create the necessary users and gorups as well as start the FTP service
```bash
groupadd ftpgroup
useradd -g ftpgroup -d /dev/null -s /etc ftpuser
pure-pw useradd offsec -u ftpuser -d /ftphome
pure-pw mkdb
cd /etc/pure-ftpd/auth/
ln -s ../conf/PureDB 60pdb
mkdir -p /ftphome
chown -R ftpuser:ftpgroup /ftphome/
systemctl restart pure-ftpd
```


![[systemctl_ftpd.png]]

We can now switch to our Debian client and attempt to connect.
![[frp_connect.png]]


**2.  Attempt to log in to the FTP server from a Netcat reverse shell and see what happens.**

After setting up our listener on the Debian client we can use netcat to connect to our listener. We then use the command "ftp" to attempt to interact with our FTP server running on our Kali machine. This will result in a loss of control of our shell.
![[non-interactive_ftp.png]]

**3.  Research alternative methods to upgrade a non-interactive shell.**

To upgrade our shell we can use the python module "pty" , a standard module that is often used to upgrade to interactive shells. We can see that after upgrading our shell via "pty" we can access the ftp server running on our Kali machine.
![[interactive_ftp.png]]


# 16.2.6 Transferring Files with Windows Hosts

**1.  Use VBScript to transfer files in a non-interactive shell from Kali to Windows.**


**2.  Use PowerShell to transfer files in a non-interactive shell from Kali to Windows and vice versa.**


**3.  For PowerShell version 3 and above, which is present by default on Windows 8.1 and Windows 10, the cmdlet [Invoke-WebRequest](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/invoke-webrequest?view=powershell-6) was added. Try to make use of it in order to perform both upload and download requests to your Kali machine.**


**4.  Use TFTP to transfer files from a non-interactive shell from Kali to Windows.**

**Note:** If you encounter problems, first attempt the transfer process within an interactive shell and watch for issues that may cause problems in a non-interactive shell.