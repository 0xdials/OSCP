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