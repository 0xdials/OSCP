# 18.1.2 Manual Enumeration
**1. Perform various manual enumeration methods covered in this section on both your dedicated Windows and Linux clients. Try experimenting with various options for the tools and commands used in this section.**

In order to manually enumerate the system properly we can issue a number of commands. Although the section lists a few examples I will be posting my personal Linux process below.

**Linux**
***Operating System/Kernel***
```bash
cat /etc/issue
cat /*-release

cat /proc/version
uname -a
dmesg | grep -i linux
rpm -q kernel
```

***Environment Variables
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
Processes and Services
```Bash
ps aux | grep root
ps -elf
top
cat /etc/service
dpkg -l
rpm -qa
```
Cron
```
crontab -l
cat /etc/cron*
```
Network
```Bash
ifconfig
ip link
ip addr
cat /etc/network/interfaces
cat /etc/sysconfig/network
cat /etc/resolv.conf
cat /etc/sysconfig/network
cat /etc/networks
iptables -L
hostname
dnsdomainname
lsof -i
lsof -i :80
netstat -antup
netstat -antpx
netstat -tulpn
chkconfig --list
chkconfig --list | grep 3:on
last
w
```
