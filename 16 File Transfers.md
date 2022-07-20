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


![[Pasted image 20220719154430.png]]

We can now switch to our Debian client and attempt to connect.
![[frp_connect.png]]


**2.  Attempt to log in to the FTP server from a Netcat reverse shell and see what happens.**



**3.  Research alternatives methods to upgrade a non-interactive shell.**

