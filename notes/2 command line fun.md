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
![[recently_modified_bg_process.png]]

2.  Re-run the previous command and suspend it; once suspended, background it.
![[background_process.png]]

3.  Bring the previous background job into the foreground.
![[fg_process.png]]

4.  Start the Firefox browser on your Kali system. Use **ps** and **grep** to identify Firefox's PID.
![[ps_command.png]]

5.  Terminate Firefox from the command line using its PID.
![[kill_command_firefox.png]]

# 3.7.3 exercises
#### Exercises

_(To be performed on your own Kali VM - Reporting is required for these exercises)_

1.  Start your apache2 web service and access it locally while monitoring its **access.log** file in real-time.
`systemctl start apache2.service`
`tail -f ./var/log/apache2/access.log`
![[tail_monitor_accesslogs.png]]

2.  Use a combination of **watch** and **ps** to monitor the most CPU-intensive processes on your Kali machine in a terminal window; launch different applications to see how the list changes in real time.

`watch "ps aux | sort -nrk 3,3 | head -n 5"`
![[watch_ps_command.png]]

# 3.8.4 exercises
#### Exercises

_(To be performed on your own Kali VM - Reporting is required for these exercises)_

1.  Download the PoC code for an exploit from https://www.exploit-db.com using **curl**, **wget**, and **axel**, saving each download with a different name.

`wget https://www.exploit-db.com/download/50714 -O exploit.rb`
`curl -o exploit2.rb https://www.exploit-db.com/download/50714`
`axel -a -n 20 -o exploit3.rb https://www.exploit-db.com/download/50714`


# 3.9.4 exercises
_(To be performed on your own Kali VM - Reporting is required for these exercises)_

1.  Create an alias named ".." to change to the parent directory and make it persistent across terminal sessions.


2.  Permanently configure the history command to store 10000 entries and include the full date in its output.