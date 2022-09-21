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


# 21.2.4 A Modern Approach

**1.  Modify the PowerShell script to only return members of the Domain Admins group.**

**2.  Modify the PowerShell script to return all computers in the domain.**

**3.  Add a filter to only return computers running Windows 10.**

The script will be using a DirectorySearcher object to query Active Directory using LDAP in order to enumerate ad users along with all the properties of each user account. This script will use a specific LDAP provider path which we will need to create. 

LDAP provider path format:
`LDAP://HostName[:PortNumber][/DistinguishedName]`

We start by retrieving the current hostname:
`[System.DirectoryServices.ActiveDirectory.Domain]::GetCurrentDomain()`
![[hostname.png]]
We can see from this output that our current domain name is "corp.com" with the primary domain controller being "dc01.corp.com". We can conclude that the full providor path will be as follows:
`LDAP://DC01.corp.com/DC=corp,DC=com`
Using this information we can continue construction of our script, instantiating the DirectorySearcher class with our recently created LDAP provider path. We must also specify a SearchRoot, the node which handles searches. This takes the form of an object in the DirectoryEntry class. If no aruments are presented to the constructor SearchRoot will indicate that every search should return results from the entire AD network. Our script should now look something like the following.
```Powershell
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

# Istantiate DirectorySearcher class
$Searcher = New-Object System.DirectoryServices.DirectorySearcher([ADSI]$SearchString)

$objDomain = New-Object System.DirectoryServices.DirectoryEntry
# specify SearchRoot
$Searcher.SearchRoot = $objDomain
```

Finally, we can add filters to narrow our searches.

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

# Istantiate DirectorySearcher class
$Searcher = New-Object System.DirectoryServices.DirectorySearcher([ADSI]$SearchString)
$objDomain = New-Object System.DirectoryServices.DirectoryEntry

# specify SearchRoot
$Searcher.SearchRoot = $objDomain
# Question 1 - return all domain admins on network
# $Searcher.filter="memberof=CN=Domain Admins,CN=Users,DC=corp,DC=com"
# QEUSTION 2 - return all computers on network: # $Searcher.filter="objectcategory=CN=Computer,CN=Schema,CN=Configuration,DC=corp,DC=com"
# QUESTION 3 - return computers running windows 10
# $Searcher.filter="operatingsystem=*windows 10*"

$Result = $Searcher.FindAll()

Foreach($obj in $Result)
{
    Foreach($prop in $obj.Properties)
    {
        $prop
    }
    
    Write-Host "------------------------"
}

```

# 21.2.6 Resolving Nested Groups

**1.  Repeat the enumeration to uncover the relationship between Secret_Group, Nested_Group, and Another_Nested_Group.**
We start by modifying our previous script to find all all records with an objectClass set to "Group".
```Powershell
$domainObj = [System.DirectoryServices.ActiveDirectory.Domain]::GetCurrentDomain()

$PDC = ($domainObj.PdcRoleOwner).Name

$SearchString = "LDAP://"

$SearchString += $PDC + "/"

$DistinguishedName = "DC=$($domainObj.Name.Replace('.', ',DC='))"

$SearchString += $DistinguishedName

$Searcher = New-Object System.DirectoryServices.DirectorySearcher([ADSI]$SearchString)

$objDomain = New-Object System.DirectoryServices.DirectoryEntry

$Searcher.SearchRoot = $objDomain

$Searcher.filter="(objectClass=Group)"

$Result = $Searcher.FindAll()

Foreach($obj in $Result)
{
    $obj.Properties.name
}
```

From there, we can begin enumeration on the listed Groups, specifically "Secret_Group", "Netsted_Group", and "Another_Nested_Group".
```Powershell
$domainObj = [System.DirectoryServices.ActiveDirectory.Domain]::GetCurrentDomain()

$PDC = ($domainObj.PdcRoleOwner).Name

$SearchString = "LDAP://"

$SearchString += $PDC + "/"

$DistinguishedName = "DC=$($domainObj.Name.Replace('.', ',DC='))"

$SearchString += $DistinguishedName

$Searcher = New-Object System.DirectoryServices.DirectorySearcher([ADSI]$SearchString)

$objDomain = New-Object System.DirectoryServices.DirectoryEntry

$Searcher.SearchRoot = $objDomain


$Searcher.filter="(name=Secret_Group)" 
# Replace "Secret_Group" with Nested_Group/Another_Nested_Group

$Result = $Searcher.FindAll()

Foreach($obj in $Result)
{
    $obj.Properties.member
}
```


**2.  The script presented in this section required us to change the group name at each iteration. Adapt the script in order to unravel nested groups programmatically without knowing their names beforehand.**

For this question we simply need to iterate over each group and list out their members. In order to capture nested groups we must instruct the script to enumerate this recursively. 

```Powershell
$domainObj = [System.DirectoryServices.ActiveDirectory.Domain]::GetCurrentDomain()

$PDC = ($domainObj.PdcRoleOwner).Name

$SearchString = "LDAP://"

$SearchString += $PDC + "/"

$DistinguishedName = "DC=$($domainObj.Name.Replace('.', ',DC='))"

$SearchString += $DistinguishedName

$Searcher = New-Object System.DirectoryServices.DirectorySearcher([ADSI]$SearchString)

$objDomain = New-Object System.DirectoryServices.DirectoryEntry

$Searcher.SearchRoot = $objDomain

$Searcher.filter="(objectClass=Group)"

$Result = $Searcher.FindAll()

Foreach($Groups in $Result)
{   
    $Groups.Properties.name
    $Groups.Properties.member   
}
```


# 21.2.8 Currently Logged on Users

**1.  Download and use PowerView to perform the same enumeration against the student VM while in the context of the _Offsec_ account.**


**2.  Log in to the student VM with the _Jeff_Admin_ account and perform a remote desktop login to the domain controller using the _Jeff_Admin_ account. Next, execute the Get-NetLoggedOn function on the student VM to discover logged-in users on the domain controller while in the context of the _Jeff_Admin_ account.**


**3.  Repeat the enumeration by using the _DownloadString_ method from the _System.Net.WebClient_ class in order to download PowerView from your Kali system and execute it in memory without saving it to the hard disk.**