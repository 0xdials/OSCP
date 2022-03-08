# 7.1.7 exercises
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

![[Pasted image 20220303230713.png]]


# 7.2.3 port scanning exercises
#### Exercises

_(To be performed on your own Kali machine - Reporting is required for these exercises)_

1.  Use Nmap to conduct a ping sweep of your target IP range and save the output to a file. Use grep to show machines that are online.
`nmap -v -sn <first.three.octets>.1-254 -oG ping-sweep.txt`
we would then grep the output and pipe to cut to easily dentify discovered machines
`grep Up ping-sweep.txt | cut -d " " -f 2`
this can also be accomplished via the "fping" tool, which uses ICMP to identify addresses (does not send TCP syn/ack packets to ports, unlike "nmap -sn")

2.  Scan the IP addresses you found in exercise 1 for open webserver ports. Use Nmap to find the webserver and operating system versions.


3.  Use NSE scripts to scan the machines in the labs that are running the SMB service.


4.  Use Wireshark to capture a Nmap connect and UDP scan and compare it against the Netcat port scans. Are they the same or different?


5.  Use Wireshark to capture a Nmap SYN scan and compare it to a connect scan and identify the difference between them.
