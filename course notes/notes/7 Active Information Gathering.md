# 7.1.7 DNS exercises
#### Exercises

_(To be performed on your own Kali machine - Reporting is required for these exercises)_

1.  Find the DNS servers for the megacorpone.com domain.
`for i in $(cat domains_list.txt); do host $i.megacorpone.com; done | grep -v NXDOMAIN`
yields the following results:
```
www.megacorpone.com has address 149.56.244.87
mail.megacorpone.com has address 51.222.169.212
ns1.megacorpone.com has address 51.79.37.18
ns2.megacorpone.com has address 51.222.39.63
test.megacorpone.com has address 51.222.169.219
www2.megacorpone.com has address 149.56.244.87
ns3.megacorpone.com has address 66.70.207.180
admin.megacorpone.com has address 51.222.169.208
mail2.megacorpone.com has address 51.222.169.213
vpn.megacorpone.com has address 51.222.169.220
beta.megacorpone.com has address 51.222.169.209
support.megacorpone.com has address 51.222.169.218
intranet.megacorpone.com has address 51.222.169.211
router.megacorpone.com has address 51.222.169.214
syslog.megacorpone.com has address 51.222.169.217
fs1.megacorpone.com has address 51.222.169.210
```

2.  Write a small script to attempt a zone transfevim r from megacorpone.com using a higher-level scripting language such as Python, Perl, or Ruby.

to use our script:
`./dns_zone_xfer.py <domain name> <file containing list of servers>`
```python
#!/bin/python
import sys
import os

args = sys.argv 
host = args[1]


with open(args[2]) as file:
	lines = file.readlines()


for line in lines:
	os.system(f"host -l {host} {line} ")


```


3.  Recreate the example above and use **dnsrecon** to attempt a zone transfer from megacorpone.com
`dnsrecon -d megacorpone.com -t axfr`

![[dnsrecon.png]]


# 7.2.3 port scanning exercises !!connection problems!!
#### Exercises

_(To be performed on your own Kali machine - Reporting is required for these exercises)_

1.  Use Nmap to conduct a ping sweep of your target IP range and save the output to a file. Use grep to show machines that are online.
`nmap -v -sn <first.three.octets>.1-254 -oG ping-sweep.txt`
we would then grep the output and pipe to cut to easily dentify discovered machines
`grep Up ping-sweep.txt | cut -d " " -f 2`
![[greppable_poing_range.png]]
this can also be accomplished via the "fping" tool, which uses ICMP to identify addresses (does not send TCP syn/ack packets to ports, unlike "nmap -sn")
![[fping_range.png]]
2.  Scan the IP addresses you found in exercise 1 for open webserver ports. Use Nmap to find the webserver and operating system versions.
run nmap, scanning for top 20 ports and reading IPs from a list
`nmap -sT -A --top-ports=20 -iL ping-sweep.txt`
```
Nmap scan report for 192.168.198.8
Host is up (0.084s latency).

PORT     STATE  SERVICE       VERSION
22/tcp   open   ssh           OpenSSH 8.2p1 Ubuntu 4ubuntu0.2 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   3072 8e:08:fb:84:69:56:cf:34:4b:2d:82:a5:30:b9:5e:72 (RSA)
|   256 af:8d:4e:d7:10:62:6b:0f:dc:82:f7:70:e4:fb:eb:b6 (ECDSA)
|_  256 8a:00:93:9f:56:1a:0b:a2:d3:b0:c8:59:01:ad:8f:ff (ED25519)
25/tcp   open   smtp          Postfix smtpd
| ssl-cert: Subject: commonName=mail
| Subject Alternative Name: DNS:mail
| Not valid before: 2021-12-02T15:18:58
|_Not valid after:  2031-11-30T15:18:58
|_smtp-commands: mail, PIPELINING, SIZE 10240000, VRFY, ETRN, STARTTLS, ENHANCEDSTATUSCODES, 8BITMIME, DSN, SMTPUTF8, CHUNKING
Service Info: Host:  mail; OS: Linux; CPE: cpe:/o:linux:linux_kernel

Nmap scan report for 192.168.198.9
Host is up (0.084s latency).

PORT     STATE  SERVICE       VERSION
135/tcp  open   msrpc         Microsoft Windows RPC
139/tcp  open   netbios-ssn   Microsoft Windows netbios-ssn
445/tcp  open   microsoft-ds?
Service Info: OS: Windows; CPE: cpe:/o:microsoft:windows

Host script results:
| smb2-time: 
|   date: 2022-03-08T22:24:32
|_  start_date: N/A
| smb2-security-mode: 
|   3.1.1: 
|_    Message signing enabled but not required
...
```

3.  Use NSE scripts to scan the machines in the labs that are running the SMB service.
`nmap --script=smb-os-discovery -iL ping-sweep.txt -oG smb`
```Starting Nmap 7.92 ( https://nmap.org ) at 2022-03-08 16:36 PST
Nmap scan report for 192.168.198.6
Host is up (0.083s latency).
Not shown: 998 closed tcp ports (conn-refused)
PORT   STATE SERVICE
22/tcp open  ssh
80/tcp open  http

Nmap scan report for 192.168.198.8
Host is up (0.082s latency).
Not shown: 998 closed tcp ports (conn-refused)
PORT   STATE SERVICE
22/tcp open  ssh
25/tcp open  smtp```
```
4.  Use Wireshark to capture a Nmap connect and UDP scan and compare it against the Netcat port scans. Are they the same or different?
nmap udp scan of port 160
![[nmap_udp.png]]
vs netcat udp scan of the same port
![[nc_udp_scan.png]]

5.  Use Wireshark to capture a Nmap SYN scan and compare it to a connect scan and identify the difference between them.
<<<<<<< HEAD



# 7.4.3 NFS enumeration
## Practice - NFS Enumeration

_(To be performed on your own Kali machine - Reporting is required for these exercises)_

1.  Use Nmap to make a list of machines running NFS in the labs.
`nmap -v -p 111 10.11.1.1-255`
![[nmap_rpc.png]]

2.  Use NSE scripts to scan these systems and collect additional information about accessible shares.
=======
connect scan
![[connect_scan.png]]
SYN scan
![[SYN_scan.png]]

# 7.3.3 SMB exercises !!!CONNECTION PROBLEMS!!!
#### Exercises

_(To be performed on your own Kali machine - Reporting is required for these exercises)_

1.  Use Nmap to make a list of the SMB servers in the lab that are running Windows.
`nmap -v -p 139, 445 --script=smb-os-discovery -iL iplist`

2.  Use NSE scripts to scan these systems for SMB vulnerabilities.


3.  Use nbtscan and enum4linux against these systems to identify the types of data you can obtain from different versions of Windows.



# 7.4.3 nfs enumeration
## Practice - NFS Enumeration

_(To be performed on your own Kali machine - Reporting is required for these exercises)_

1.  Use Nmap to make a list of machines running NFS in the labs.
`nmap -v -p 111 10.11.1.1-255`
yields the following ips
10.11.1.5
10.11.1.8
10.11.1.10
10.11.1.13
10.11.1.14
10.11.1.39
10.11.1.44
10.11.1.115
10.11.1.120
10.11.1.121
10.11.1.122
10.11.1.123
10.11.1.136
10.11.1.141
10.11.1.217
10.11.1.222
10.11.1.231
10.11.1.237
with these being considered "open"
10.11.1.8
10.11.1.115
10.11.1.141
10.11.1.217
10.11.1.231
10.11.1.237


2.  Use NSE scripts to scan these systems and collect additional information about accessible shares.

`nmap -p 111 --script nfs* -iL iplist `
![[nmap_rpc_scripts.png]]


# 7.5.1 smtp enumeration
## Pratice - SMTP Enumeration

_(To be performed on your own Kali machine - Reporting is required for these exercises)_

1.  Search your target network range to see if you can identify any systems that respond to the SMTP _VRFY_ command.
first we use nmap to quickly identify which hosts are currently running SMTP
`nmap -p 25 10.11.1.0/24`
we can continue enumeration on discovered hosts with nmap user enumeration scripts
`nmap -p 25 -iL smtp_list --script smtp-enum-users.nse`
or manually with netcat
`nc -nv 10.11.1.231 25`
![[netcat_smtp.png]]

2.  Try using this Python code to automate the process of username discovery using a text file with usernames as input.
using the "vrfy.py" python code below we can write a very simple bash one liner to test each username present in a username file
` for user in $(cat usernames); do python2 vrfy.py "$user" 10.11.1.231; done`
![[smtp_script.png]]

python script
```python
#!/usr/bin/python

import socket
import sys

if len(sys.argv) != 3:
        print "Usage: vrfy.py <username> <ip>"
        sys.exit(0)
ip = sys.argv[2]

# Create a Socket
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Connect to the Server
connect = s.connect((ip, 25))

# Receive the banner
banner = s.recv(1024)

print banner

# VRFY a user
s.send('VRFY ' + sys.argv[1] + '\r\n')
result = s.recv(1024)

print result 

# Close the socket
s.close()
```


# 7.6.4 snmp enumeration
## Practice - SNMP Enumeration

_(To be performed on your own Kali machine - Reporting is required for these exercises)_

1.  Scan your target network with onesixtyone to identify any SNMP servers.
We first create a file containing a list of strings which onesixtyone will send as an SNMP request to each IP. This list can be created manually or a community generated list can be used.
Manually create a  community file:
`echo -e "private\npublic\nmanager" > community `
We now run a quick bash one-liner to create a list of IPs for the network we wish to scan:
`for ip in $(seq 1 254); do echo 10.11.1.$ip; done > ips`
Finally, we run `onesixtyone` with our previously generated files:
`onesixtyone -c community -i ips `
This yields one result:
![[onesixtyone_results.png]]
2.  Use snmpwalk and snmp-check to gather information about the discovered targets.
we use the snmpwalk tool to furhter enumerate on the findings of onesixtyone:
`snmpwalk -c public -v1 -t 10 10.11.1.115 `

![[snmpwalk_results.png]]