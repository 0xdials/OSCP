# 6.3.1 Exercises
## Practice - Whois Enumeration

_(To be performed from your own Kali VM - Reporting is required for these exercises)_

#### Exercises

1.  What is the first nameserver for _offensive-security.com_ (the one with the lowest number and ends in -A)?

![[whois_first_named_server.png]]
# 6.4.1 Exercises
## Practice - Google Hacking

_(To be performed from your own Kali VM - Reporting is required for these exercises)_

#### Exercises

1.  Who is the VP of Legal for MegaCorp One and what is their email address?
Name: Mike Carlow
Title: VP Of Legal  
Email: mcarlow@megacorpone.com

2.  Use Google dorks (either your own or any from the GHDB) to search www.megacorpone.com for interesting documents.
![[Pasted image 20220301193527.png]]

3.  What other MegaCorp One employees can you identify that are not listed on www.megacorpone.com?
![[Pasted image 20220301193714.png]]

4.  What is the email address of VP of Legal for Megacorpone.com?
`site:megacorpone.com allintext:"VP"`
![[Pasted image 20220301193824.png]]


# 6.5.1 exercises
## Practice - Netcraft

_(To be performed from your own Kali VM - Reporting is required for these exercises)_

#### Exercises

1.  Use Netcraft to determine what application server is running on www.megacorpone.com.

![[Pasted image 20220301221623.png]]
![[Pasted image 20220301221655.png]]

2.  What is the name of the _Client-Side Scripting Framework_ that handles fonts?

![[Pasted image 20220301221755.png]]




# 6.7.1 exercises
## Practice - Open-Source Code

#### Exercises

1.  Perform some open-source recon on the MegaCorp One's GitHub repository to see if you can find some user credentials. What is the username associated with the discovered hash?

![[Pasted image 20220302135200.png]]
![[Pasted image 20220302135219.png]]![[Pasted image 20220302135316.png]]



# 6.12.3 exercises
## Practice - User Information Gathering

_(To be performed from your own Kali VM - Reporting is required for these exercises)_

1.  Use theHarvester to enumerate emails addresses for megacorpone.com.
`theharvester -d megacorpone.com -b google`
first@megacorpone.com
joe@megacorpone.com
mcarlow@megacorpone.com
x22joe@megacorpone.com
![[Pasted image 20220302195043.png]]
![[Pasted image 20220302195058.png]]
2.  Experiment with different data sources (-b). Which ones work best for you?
