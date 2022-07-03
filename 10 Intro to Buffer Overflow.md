# 10.2.5
#### Exercises

_(To be performed on your own Kali and Windows lab client machines - Reporting is required for these exercises)_

1.  Repeat the steps shown in this section to see the 12 A's copied onto the stack.
We first must open the executable and supply the 12 A's as an argument.
![[Pasted image 20220703135907.png]]

Then we must find our main function, using a known string present in the function, and set a breakpoint on our function.
![[Pasted image 20220703140337.png]]
We can now run the program (F9), which will stop out our function, and we can then step into this function with F7
![[Pasted image 20220703140544.png]]
To see the A's copied onto the stack we simply need to execute our function, done with Ctrl+F9. From here we can see our 12 A's on the stack.
![[Pasted image 20220703140710.png]]


2.  Supply at least 80 A's and verify that EIP after the _strcpy_ will contain the value 41414141.
For this exercise we must adjust the initial arguement of 12 A's to 80. After that we follow the same steps listed above.

Once we execute arrive at the return instruction of the main function we can see our A's being copied onto the stack and then popped into EIP.

![[Pasted image 20220703141511.png]]