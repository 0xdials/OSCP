# 2.4.4 Finding Your Way Around Kali
#### Exercises

_(To be performed on your own Kali VM - Reporting is required for these exercises)_

1.  Use _man_ to look at the man page for one of your preferred commands.

![[man_ls.png]]
![[ls_manpage.png]]

2.  Use _man_ to look for a keyword related to file compression.

![[apropos_compression.png]]

3.  Use _which_ to locate the _pwd_ command on your Kali virtual machine.

![[which_pwd.png]]

4.  Use _locate_ to locate _wce32.exe_ on your Kali virtual machine.

![[updatedb_locate.png]]

5.  Use _find_ to identify any file (not directory) modified in the last day, NOT owned by the root user  and execute _ls -l_ on them. Chaining/piping commands is NOT allowed!

`find . -mtime 1 ! -user root 2>/dev/null -exec ls -l {} +`

![[find_and_ls.png]]