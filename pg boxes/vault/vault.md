# nmap 
```
Nmap scan report for 192.168.138.172
Host is up (0.083s latency).
Not shown: 65514 filtered tcp ports (no-response)
PORT      STATE SERVICE       VERSION
53/tcp    open  domain        Simple DNS Plus
88/tcp    open  kerberos-sec  Microsoft Windows Kerberos (server time: 2022-06-13 21:13:46Z)
135/tcp   open  msrpc         Microsoft Windows RPC
139/tcp   open  netbios-ssn   Microsoft Windows netbios-ssn
389/tcp   open  ldap          Microsoft Windows Active Directory LDAP (Domain: vault.offsec0., Site: Default-First-Site-Name)
445/tcp   open  microsoft-ds?
464/tcp   open  kpasswd5?
593/tcp   open  ncacn_http    Microsoft Windows RPC over HTTP 1.0
636/tcp   open  tcpwrapped
3268/tcp  open  ldap          Microsoft Windows Active Directory LDAP (Domain: vault.offsec0., Site: Default-First-Site-Name)
3269/tcp  open  tcpwrapped
3389/tcp  open  ms-wbt-server Microsoft Terminal Services
| rdp-ntlm-info: 
|   Target_Name: VAULT
|   NetBIOS_Domain_Name: VAULT
|   NetBIOS_Computer_Name: DC
|   DNS_Domain_Name: vault.offsec
|   DNS_Computer_Name: DC.vault.offsec
|   DNS_Tree_Name: vault.offsec
|   Product_Version: 10.0.17763
|_  System_Time: 2022-06-13T21:14:39+00:00
|_ssl-date: 2022-06-13T21:15:18+00:00; 0s from scanner time.
| ssl-cert: Subject: commonName=DC.vault.offsec
| Not valid before: 2022-06-12T21:04:00
|_Not valid after:  2022-12-12T21:04:00
5985/tcp  open  http          Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
|_http-server-header: Microsoft-HTTPAPI/2.0
|_http-title: Not Found
9389/tcp  open  mc-nmf        .NET Message Framing
49666/tcp open  msrpc         Microsoft Windows RPC
49668/tcp open  msrpc         Microsoft Windows RPC
49669/tcp open  ncacn_http    Microsoft Windows RPC over HTTP 1.0
49670/tcp open  msrpc         Microsoft Windows RPC
49675/tcp open  msrpc         Microsoft Windows RPC
49699/tcp open  msrpc         Microsoft Windows RPC
49790/tcp open  msrpc         Microsoft Windows RPC
Service Info: Host: DC; OS: Windows; CPE: cpe:/o:microsoft:windows

Host script results:
| smb2-security-mode: 
|   3.1.1: 
|_    Message signing enabled and required
| smb2-time: 
|   date: 2022-06-13T21:14:42
|_  start_date: N/A
```

Our network scan shows us both ldap and DNS, indicating that this is most likely a domain controller. We will start by enumerating the smb share.

We start by anonymous login to smb and enumerating the shares. For this we use crackmapexec and its spider_plus module to list all files present.
![[Pasted image 20220613150130.png]]
We can then pipe the json output of the spider_plus json through jq, filtering all but the directories and their files. 

![[Pasted image 20220613150258.png]]
Nothing stands out but interestingly we do have READ/WRITE permissions on DocumentsShare. From here we can try to capture a user's hash by uploading malicious scf, url, and lnk file. To create these files we can use a script created by XCT found here https://github.com/xct/hashgrab 


