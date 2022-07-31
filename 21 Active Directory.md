# 21.2.2 Traditional Approach
**1. Connect to your Windows 10 client and use net.exe to lookup users and groups in the domain. See if you can discover any interesting users or groups.**

There are a number of different ways we can use the net command to manually enumerate the users and groups. We start by issuing the "net user" command, receiving a list of users on the machine.

![[net_user.png]]

From here we can expand on this by requesting information on all users on the domain, we do this with the "net user /domain" command. 
![[net_user_domain.png]]


Here, we spot an interesting user, jeff_admin. To get more information on "jeff_admin" we can input the following command "net user Jeff_admin /domain"
![[net_user_jeff.png]]

Finally, we can list group on the domain with "net group /domain". Note that this will not show nested groups.
![[net_group_domain.png]]