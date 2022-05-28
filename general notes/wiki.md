# resources and threat tracking
## common vulnerability scoring system SIG CVSS

## mitre att&ck


# attacks

## xss - cross site scripting
an attack where malicious scripts are injected into a web application and sent to a different user. typically used to steal cookies or session tokens, they can also go so far as to rewrite the content of the HTML page.

## csrf - cross-site request forgery 
forces a user to execute unwanted actions on a web app which they are currently authenticated. this can force users into doing things like changing account details or transfering funds. typically defended against with tokens
#### example: https://youtu.be/d2nVDoVr0jE?t=2315 41:30 for python script

## ssrf - server-side request forgery
occurs when a web app is fetching a remote resource without valifating the user-supplied uri. it allows attackers to send crafted requests to an unexpected destination, even when protected by a firewall, vpn, etc

## sql injection
an attack where an sql query is maliciously injected into an application via the input data from the client. this can typically read sensitive data from the database, modify data, and even execute administration operations or issue commands to the host operating system.

## local file inclusion
lfi is the process of including files that are already locally present on the server. typical example:
`http://vulnerable_host/preview.php?file=example.html`
to
`http://vulnerable_host/preview.php?file=../../../../etc/passwd`

## remote file inclusion
same as lfi but for files not present on the server

## open redirect vulnerability

usually used as a phishing attack