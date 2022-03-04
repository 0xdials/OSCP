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