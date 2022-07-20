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