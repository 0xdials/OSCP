# 20.1.2 Port Forwarding
**1.  Connect to your dedicated Linux lab client and run the clear_rules.sh script from /root/port_forwarding_and_tunneling/ as root.**

In preparation for the following exercise we simply need to ssh into our Debian machine and run the required script as root.



**2.  Attempt to replicate the port-forwarding technique covered in the above scenario.**

once our systems are prepared for the exercise we begin by checking the connectivity of both machines. Doing so will show us that although our local, Kali machine is able to reach the internet our Debian lab client will have no connection. 
Local Kali Machine
![[Pasted image 20220727202728.png]]

Debian Lab Client
![[Pasted image 20220727202848.png]]

In order to route Google's traffic to our Debian machine we will be utilizing RINETD, once installed we can navigate to the config folder found at /etc/rinetd.conf. We make the following edit to the configuration fire:
![[Pasted image 20220727203726.png]]
This will forward all traffic our Kali machine receives on port 80 to the Google IP and port and specified earlier.

Upon restarting the service we can see that we are now listening on port 80.
![[Pasted image 20220727203949.png]]

Now to verify our connection, let's switch back to our Debian lab machine and attempt to connect to our listening Kali machine.
![[Pasted image 20220727204428.png]]
And we see we get a 200 OK from google, redirected through our Kali machine.

# 20.2.2 SSH Local Port Forwarding
**1.  Connect to your dedicated Linux lab client and run the clear_rules.sh script from /root/port_forwarding_and_tunneling/ as root.**

As we did previously, we simply need to run the requested script.

**2.  Run the ssh_local_port_forwarding.sh script from /root/port_forwarding_and_tunneling/ as root.**

In addition to the clear_rules.sh script we must also run the ssh_local_port_forwarding.sh script in the same directory.

**3.  Take note of the Linux client and Windows Server 2016 IP addresses shown in the Student Control Panel.**


**4.  Attempt to replicate the smbclient enumeration covered in the above scenario.**

# 20.2.4 SSH Remote Port Forwarding

**1. Connect to your dedicated Linux lab client via SSH and run the clear_rules.sh script from /root/port_forwarding_and_tunneling/ as root.**


**2. Close any SSH connections to your dedicated Linux lab client and then connect as the student account using rdesktop and run the ssh_remote_port_forward.sh script from /root/port_forwarding_and_tunneling/ as root.**


**3. Attempt to replicate the SSH remote port forwarding covered in the above scenario and ensure that you can scan and interact with the MySQL service.**


# 20.2.6 SSH Dynamic Port Forwarding

**1.  Connect to your dedicated Linux lab client and run the clear_rules.sh script from /root/port_forwarding_and_tunneling/ as root.**


**2.  Take note of the Linux client and Windows Server 2016 IP addresses.**


**3.  Create a SOCKS4 proxy on your Kali machine, tunneling through the Linux target.**


**4.  Perform a successful nmap scan against the Windows Server 2016 machine through the proxy.**


**5.  Perform an nmap SYN scan through the tunnel. Does it work? Are the results accurate?**


# 20.3.1 PLINK.exe

**1.  Obtain a reverse shell on your Windows lab client through the Sync Breeze vulnerability.**


**2.  Use plink.exe to establish a remote port forward to the MySQL service on your Windows 10 client.**


**3.  Scan the MySQL port via the remote port forward.**


# 20.4.1 NETSH
**1.  Obtain a reverse shell on your Windows lab client through the Sync Breeze vulnerability.**


**2.  Using the SYSTEM shell, attempt to replicate the port forwarding example using netsh.**

# 20.5.1 HTTPTunneling Through Deep Packet Inspection
**1.  Connect to your dedicated Linux lab client as the student account using rdesktop and run the http_tunneling.sh script from /root/port_forwarding_and_tunneling/ as root.**


**2.  Start the apache2 service and exploit the vulnerable web application hosted on port 443 (covered in a previous module) in order to get a reverse HTTP shell.**


**3.  Replicate the scenario demonstrated above using your dedicated clients.**