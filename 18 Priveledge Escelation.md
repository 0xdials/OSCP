# 18.1.2 Manual Enumeration
**1. Perform various manual enumeration methods covered in this section on both your dedicated Windows and Linux clients. Try experimenting with various options for the tools and commands used in this section.**

In order to manually enumerate the system properly we can issue a number of commands. Although the section lists a few examples I will be posting my personal Linux process below.
***<note: words inside <> indicate the use of a variable>***

**Linux**
***Users***
```bash
whoami
id
cat /etc/passwd
```

***Operating System/Kernel/Drivers***
```bash
hostname
cat /etc/issue
cat /*-release
cat /proc/version
uname -a
dmesg | grep -i linux
rpm -q kernel
lsmod
/sbin/modinfo libdata
```

***AutoElevating Binaries***
```bash
find / -perm -u=s -type f 2>/dev/null
```

***Environment Variables***
```bash
env
set
cat /etc/profile
cat /etc/bashrc
cat ~/.bash_profile
cat ~/.bashrc
cat ~/.bash_logout
cat ~/.zshrc
```

***Processes and Services***
```Bash
ps aux | grep root
ps -elf
top
cat /etc/service
dpkg -l
rpm -qa
```

***Files & Permissions***
```bash
find / -writable -type d 2>/dev/null
```
***Unmounted Drives***
```bash
mount
cat /etc/fstab
lsblk
```
***Cron***
```bash
crontab -l
cat /etc/cron*
```
***Network***
```Bash
hostname
ifconfig
ip a
ip link
ip addr
/sbin/route
grep -Hs iptables /etc/*
cat /etc/network/interfaces
cat /etc/sysconfig/network
cat /etc/resolv.conf
cat /etc/sysconfig/network
cat /etc/networks
dnsdomainname
lsof -i
lsof -i :80

ss -anp
netstat -antup
netstat -antpx
netstat -tulpn
chkconfig --list
chkconfig --list | grep 3:on
last
w
```


**WINDOWS**
***Users
```powershell
whoami
net user # enumerate usernames
net  user <USERNAME> # enumerate username "USERNAME"
```

***Network***
```powershell
hostname
ipconfig /all
```

***Firewall***
```powershell
netsh advfirewall show current profile
netsh advfirewall firewall show rule name=all
```

***Operating System/Kernel/Drivers***
```powershell
systeminfo
systeminfo | findstr /B /C:"OS Name" /C:"OS Version" /C:"System Type"
wmic qfe get Caption, Description, HotFixID, InstalledOn
PS> driverquery.exe /v /fo csv | ConverFrom-CSV | Select-Object 'Display Name', 'Start Mode', Path
Get-WmiObject Win32_PnPSignedDriver | Select-Object DeviceName, DriverVersion, Manufacturer | Where-Object {$_.DeviceName -like "*VMware*"}
```
***Processes and Services***
```powershell
tasklist /SVC
route print
netstat -ano
wmic get name, version, vendor
```
**AutoElevating Binaries***
```powershell
reg query HKEY_CURRENT_USER\Software\Policies\Microsoft\Windows\Installer
reg query HKEY_LOCAL_MACHINE\Software\Policies\Microsoft\Windows\Installer
```
***Scheduled Tasks***
```powershell
schtasks /query /fo LIST /v
```

***Files & Permissions***
```powershell
accesschk.exe -uws "Everyone" "C:\Program Files"
PS> Get-ChildItem "C:\Program Files" -Recurse | Get-ACL | ?{$_.AccessToString - match "Everyone\sAllow\s\sModify"}
Get-WmiObject Win32_PnPSignedDriver | Select-Object DeviceName, DriverVersion, Manufacturer | Where-Object {$_.DeviceName -like "*VMware*"}
```
***Unmounted Drives***
```powershell
mountvol
```


# 18.1.4 Automated Enumeration

**1.  Inspect your Windows and Linux clients by using the tools and commands presented in this section in order to get comfortable with automated local enumeration techniques.**

For windows, we can start by exploring some of the options present in the "windows-pricesc-check2.exe" binary. To start lets list out the "Help" contents with the -h flag.
```
C:\Tools\privilege_escalation\windows-privesc-check-master>windows-privesc-check2.exe -h
windows-privesc-check v2.0 (http://pentestmonkey.net/windows-privesc-check)

Usage: C:\Tools\privilege_escalation\windows-privesc-check-master\windows-privesc-check2.exe (--dump [ dump opts] | --dumptab | --audit) [examine opts] [host opts] -o report-file-stem

Options:
  --version             show program's version number and exit
  -h, --help            show this help message and exit
  --dump                Dumps info for you to analyse manually
  --dumptab             Dumps info in tab-delimited format
  --audit               Identify and report security weaknesses
  --pyshell             Start interactive python shell

  examine opts:
    At least one of these to indicate what to examine (*=not implemented)

    -a, --all           All Simple Checks (non-slow)
    -A, --allfiles      All Files and Directories (slow)
    -D, --drives        Drives
    -e, --reg_keys      Misc security-related reg keys
    -E, --eventlogs     Event Log*
    -f INTERESTING_FILE_LIST, --interestingfiledir=INTERESTING_FILE_LIST
                        Changes -A behaviour.  Look here INSTEAD
    -F INTERESTING_FILE_FILE, --interestingfilefile=INTERESTING_FILE_FILE
                        Changes -A behaviour.  Look here INSTEAD.  On dir per
                        line
    -G, --groups        Groups
    -H, --shares        Shares
    -I, --installed_software
                        Installed Software
    -j, --tasks         Scheduled Tasks
    -k, --drivers       Kernel Drivers
    -L, --loggedin      Logged In
    -O, --ntobjects     NT Objects
    -n, --nointerestingfiles
                        Changes -A/-f/-F behaviour.  Don't report interesting
                        files
    -N, --nounreadableif
                        Changes -A/-f/-F behaviour.  Report only interesting
                        files readable by untrsuted users (see -x, -X, -b, -B)
    -P, --progfiles     Program Files Directory Tree
    -r, --registry      Registry Settings + Permissions
    -R, --processes     Processes
    -S, --services      Windows Services
    -t, --paths         PATH
    -T PATCHFILE, --patches=PATCHFILE
                        Patches.  Arg is filename of xlsx patch info.
                        Download from
                        http://go.microsoft.com/fwlink/?LinkID=245778 or pass
                        'auto' to fetch automatically
    -U, --users         Users
    -v, --verbose       More verbose output on console
    -W, --errors        Die on errors instead of continuing (for debugging)
    -z, --noappendices  No report appendices in --audit mode

  host opts:
    Optional details about a remote host (experimental).  Default is
    current host.

    -s REMOTE_HOST, --server=REMOTE_HOST
                        Remote host or IP
    -u REMOTE_USER, --user=REMOTE_USER
                        Remote username
    -p REMOTE_PASS, --pass=REMOTE_PASS
                        Remote password
    -d REMOTE_DOMAIN, --domain=REMOTE_DOMAIN
                        Remote domain

  dump opts:
    Options to modify the behaviour of dump/dumptab mode

    -M, --get_modals    Dump password policy, etc.
    -V, --get_privs     Dump privileges for users/groups

  report opts:
    Reporting options

    -o REPORT_FILE_STEM, --report_file_stem=REPORT_FILE_STEM
                        Filename stem for txt, html report files
    -x IGNORE_PRINCIPAL_LIST, --ignoreprincipal=IGNORE_PRINCIPAL_LIST
                        Don't report privesc issues for these users/groups
    -X IGNORE_PRINCIPAL_FILE, --ignoreprincipalfile=IGNORE_PRINCIPAL_FILE
                        Don't report privesc issues for these users/groups
    -0, --ignorenoone   No one is trusted (even Admin, SYSTEM).  hyphen zero
    -c, --exploitablebycurrentuser
                        Report only privesc issues relating to current user
    -b EXPLOITABLE_BY_LIST, --exploitableby=EXPLOITABLE_BY_LIST
                        Report privesc issues only for these users/groups
    -B EXPLOITABLE_BY_FILE, --exploitablebyfile=EXPLOITABLE_BY_FILE
                        Report privesc issues only for these user/groupss
```
We can see a number of different ways we can utilize this tool to check for possible privilege escalation strategies. For example, lets take a look at the system's user groups with the following command:
`C:\Tools\privilege_escalation\windows-privesc-check-master>windows-privesc-check2.exe --dump -G`
![[Pasted image 20220724163551.png]]

For unix based systems we can use a similar script known as "unix-privesc-check". Running the script with no arguments will show us the help menu. We can run the script with the "standard" flag and pipe the output to a text file to review.


**2.  Experiment with different windows-privesc-check and unix_privesc_check options.**