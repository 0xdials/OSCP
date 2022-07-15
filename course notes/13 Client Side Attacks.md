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



**2.  Is it possible to use the HTML Application attack against Microsoft Edge users, and if so, how?**

# 13.3.3 Microsoft Word Macro
#### Exercises

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