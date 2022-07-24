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
***Operating System/Kernel***
```bash
hostname
cat /etc/issue
cat /*-release
cat /proc/version
uname -a
dmesg | grep -i linux
rpm -q kernel
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


***Operating System/Kernel***
```
systeminfo
systeminfo | findstr /B /C:"OS Name" /C:"OS Version" /C:"System Type"
```
***Processes and Services***
```powershell
tasklist /SVC
route print
netstat -ano
```

***Scheduled Tasks***
```powershell
schtasks /query /fo LIST /v
```