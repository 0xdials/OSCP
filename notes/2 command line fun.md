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
![[cat_awk_one_liner.png]]

2.  Copy the **/etc/passwd** file to your home directory (**/home/kali**).
    `cp /etc/passwd .`
	
3.  Use **cat** in a one-liner to print the output of the **/kali/passwd** and replace all instances of the "Gnome Display Manager" string with "GDM".
(System uses Lightdm, replaced command accordingly)
![[sed_lightdm.png]]
![[light_dm.png]]


# 3.5.4 exercises
#### Exercises

_(To be performed on your own Kali VM - Reporting is required for these exercises)_

1.  Download the archive from the following URL https://offensive-security.com/pwk-files/scans.tar.gz


2.  This archive contains the results of scanning the same target machine at different times. Extract the archive and see if you can spot the differences by diffing the scans.
![[vim_d.png]]
![[vimdiff_output.png]]

# 3.6.4 exercises
#### Exercises

_(To be performed on your own Kali VM - Reporting is required for these exercises)_

1.  Find files that have changed on your Kali virtual machine within the past 7 days by running a specific command in the background.


2.  Re-run the previous command and suspend it; once suspended, background it.


3.  Bring the previous background job into the foreground.


4.  Start the Firefox browser on your Kali system. Use **ps** and **grep** to identify Firefox's PID.


5.  Terminate Firefox from the command line using its PID.