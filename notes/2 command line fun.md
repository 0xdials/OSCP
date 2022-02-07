# 3.1.4 exercises
#### Exercises
_(To be performed on your own Kali VM - Reporting is required for these exercises)_

1.  Inspect your bash history and use _history expansion_ to re-run a command from it.
![[history_search.png]]
![[rerun_command.png]]
2.  Execute different commands of your choice and experiment browsing the history through the shortcuts as well as the _reverse-i-search_ facility.
![[bck-i-search.png]]

# 3.2.6 exercises
#### Exercises
_(To be performed on your own Kali VM - Reporting is required for these exercises)_

1.  Use the **cat** command in conjunction with **sort** to reorder the content of the **/etc/passwd** file on your Kali Linux system.
![[cat_pipe_sort.png]]

2.  Redirect the output of the previous exercise to a file of your choice in your home directory.
![[output_redirect.png]]

# 3.3.6 exercises
#### Exercises

_(To be performed on your own Kali VM - Reporting is required for these exercises)_

1.  Using **/etc/passwd**, extract the user and home directory fields for all users on your Kali machine for which the shell is set to _/bin/false_. Make sure you use a Bash one-liner to print the output to the screen. The output should look similar to Listing 26 below:
`cat /etc/passwd | grep /bin/false | awk -F ":" '{print "User " $1 " home directory is " $6}' `
![[Pasted image 20220206182853.png]]

2.  Copy the **/etc/passwd** file to your home directory (**/home/kali**).
    
3.  Use **cat** in a one-liner to print the output of the **/kali/passwd** and replace all instances of the "Gnome Display Manager" string with "GDM".
(System uses Lightdm, replaced command accordingly)
![[Pasted image 20220206183618.png]]
![[Pasted image 20220206183544.png]]