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
```
***Device Drivers & Kernel Modules
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
```
find / -writable -type d 2>/dev/null
```
***Unmounted Drives***
```bash
mount
cat /etc/fstab
lsblk
```
***Cron***
```
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

***Scheduled Tasks***
```powershell
schtasks /query /fo LIST /v
```

***Files & Permissions***
```powershell
accesschk.exe -uws "Everyone" "C:\Program Files"
PS> Get-ChildItem "C:\Program Files" -Recurse | Get-ACL | ?{$_.AccessToString - match "Everyone\sAllow\s\sModify"}
```
***Unmounted Drives***
```powershell
mountvol
```