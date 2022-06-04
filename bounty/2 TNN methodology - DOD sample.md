# seeds
- start with .mil -> wildcards file 
- use assetfinder to gather domains
`cat wildcards| assetfinder | anew domains`
- use httprobe to see whos listening
`cat domains | httprobe -c 80 -prefer-https | anew hosts` 
- use fff to make requests and redict to new file to create ROOTS
`cat hosts | fff -d 1 -S -o roots`
- now have directory named 'roots' with each site and response/header
- use gf to start enumerating roots folder
- gf -list to gather list of possible searches, example below:
`gf meg-headers | sort >> headers.sort`
