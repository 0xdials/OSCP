# resources and threat tracking
## common vulnerability scoring system SIG CVSS

## mitre att&ck


# attacks

## xss - cross site scripting
an attack where malicious scripts are injected into a web application and sent to a different user. typically used to steal cookies or session tokens, they can also go so far as to rewrite the content of the HTML page.

##### remedy
sanitize input, dompurify is a good librarry

#### reflected 
where the malicious script comes from the current http request - application receives data in an http request and includes that data within the immediate response in an unsafe way

*example* the website has as search function which receives the user supplied term in the URL
``https://insecure-website.com/search?term=SEARCH_TEARM
the application then echos this search term in the response
`<p>You searched for: SEARCH_TERM</p>`
it may be possible to abuse this to execute JS code, the following snippet entered as the search term could allow for xss
`https://insecure-website.com/search?term=<script>/*+Bad+stuff+here...+*/</script>`
resulting in the following being reflected back to the user
`<p>You searched for: <script>/* Bad stuff here... */</script></p>`

#### stored
(also known as persistent or second-order XSS) arises when an application receives data from an untrusted source and includes that data within its later HTTP responses in an unsafe way.
*example* this can be seen in the following example, looking at a message board which accepts and stores malicious code.
`<p>Hello, this is my message!</p>`
as the example application does not perform any other processing of the input an attacker can easily send a message which attacks other users
`<p><script>/* Bad stuff here... */</script></p>`

#### dom-based
document-object model



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
when a web application allows redirection to any site
exampled with SSRF:
- web application does not allow connections from localhost
- web application allows open redirects
`allowed.com/?redirect=//127.0.0.1`

## http parameter pollution
when an attacker is able to craft an http request to manipulate or retrieve hidden data.

## insecure direct object reference - idor
