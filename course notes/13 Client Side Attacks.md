# 13.1.5 Know Your Target
#### Exercises
_(To be performed on your own Kali and Ubuntu lab client machines - Reporting is not required for these exercises)_

**1.  Identify your public IP address. Using public information sources, see what you can learn about your IP address. If you don't find anything on your specific IP address, try the class C it is a part of.**

My public IP address is 154.21.212.154, and a fair amount of information is available including location and that the IP is a VPN. 

![[Pasted image 20220714211853.png]]

In addition to this information the company who provides the VPN was also discovered as well athe browser and OS.
![[Pasted image 20220714212318.png]]


**2.  Compare what information you can gather about your home IP address to one gathered for your work IP address. Think about how an attacker could use the discovered information as part of an attack.**

As I currently only have a home IP I went ahead and used the MegaCorp One IP of 149.56.244.87. There is quite a bit of information available including location, ASN information, domains, and hosting organization to name a few.
![[Pasted image 20220714212931.png]]
![[Pasted image 20220714213044.png]]



**3.  Download the _Fingerprint2_ library and craft a web page similar to the one shown in the [Client Fingerprinting] section. Browse the web page from your Windows 10 lab machine and repeat the steps in order to collect the information extracted by the JavaScript library on your Kali web server.**