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


# 22.2.4 A Modern Approach

**1.  Modify the PowerShell script to only return members of the Domain Admins group.**

The script will be using a DirectorySearcher object to query Active Directory using LDAP in order to enumerate ad users along with all the properties of each user account. This script will use a specific LDAP provider path which we will need to create. 

LDAP provider path format:
`LDAP://HostName[:PortNumber][/DistinguishedName]`

We start by retrieving the current hostname:
`[System.DirectoryServices.ActiveDirectory.Domain]::GetCurrentDomain()`
![[hostname.png]]

```powershell
# Script to output the full LDAP providor path needed to perform
# LDAP queries against the domain controller

# create variable to store current domain object
$domainObj = [System.DirectoryServices.ActiveDirectory.Domain]::GetCurrentDomain()

# create variable to store primary domain controller
$PDC = ($domainObj.PdcRoleOwner).Name

# begin formation of path
$SearchString = "LDAP://"

# append primary domain controller object to path
$SearchString += $PDC + "/"

$DistinguishedName = "DC=$($domainObj.Name.Replace('.', ',DC='))"

$SearchString += $DistinguishedName

$SearchString

```

**2.  Modify the PowerShell script to return all computers in the domain.**

**3.  Add a filter to only return computers running Windows 10.**