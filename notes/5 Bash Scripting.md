#### Exercises

_(To be performed on your own Kali VM - Reporting is required for these exercises)_

1.  Research Bash loops and write a short script to perform a ping sweep of your target IP range of 10.11.1.0/24.
```bash
#!/bin/bash


for i  in $(seq 0 256)
do
	if ($( ping 10.11.1.$i -c1 > /dev/null ))
	then
		echo "10.11.1.$i"
	fi
done
```

2.  Try to do the above exercise with a higher-level scripting language such as Python, Perl, or Ruby.
```python 
#!/bin/python
import sys
import os

for i in range(0, 257):
	response = os.system(f"ping 10.11.1.{i} -c1 > /dev/null")

	if response == 0:
		print(f"10.11.1.{i}")
	else:
		pass
```

3.  Use the practical examples in this module to help you create a Bash script that extracts JavaScript files from the **access_log.txt** file (http://www.offensive-security.com/pwk-files/access_log.txt.gz). Make sure the file names DO NOT include the path, are unique, and are sorted.
`cat access_log.txt | grep -o ".*\.js" | sed 's:.*/::' | sort | uniq`

4.  Re-write the previous exercise in another language such as Python, Perl, or Ruby.
```python
#!/bin/python

filelist = set()

with open("access_log.txt") as file:
	lines =file.readlines()

for line in lines:
	if ".js" in line: #return all lines that contain .js extension
		split = line.split() #split the lines by space
		filepath = split[6] #return index that contains filename and path
		filename = filepath[filepath.rindex('/')+1:] #return txt after last "/"
		filelist.add(filename) #append to set

print(sorted(filelist))
```