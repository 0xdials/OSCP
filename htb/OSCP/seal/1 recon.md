# nmap
```
PORT     STATE SERVICE    REASON  VERSION
22/tcp   open  ssh        syn-ack OpenSSH 8.2p1 Ubuntu 4ubuntu0.2 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   3072 4b:89:47:39:67:3d:07:31:5e:3f:4c:27:41:1f:f9:67 (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQC1FohcrXkoPYUOtmzAh5PlCU2H0+sFcGl6XXS6vX2lLJ3RD2Vd+KlcYtc2wQLjcYJhkFe793jmkogOSh0uI+fKQA9z1Ib3J0vtsIaNkXxvSMPcr54QxXgg1guaM1OQl43ePUADXnB6WqAg8QyF6Nxoa18vboOAu3a8Wn9Qf9iCpoU93d5zQj+FsBKVaDs3zuJkUBRfjsqq7rEMpxqCfkFIeUrJF9MBsQhgsEVUbo1zicWG32m49PgDbKr9yE3lPsV9K4b9ugNQ3zwWW5a1OpOs+r3AxFcu2q65N2znV3/p41ul9+fWXo9pm0jJPJ3V5gZphDkXVZEw16K2hcgQcQJUH7luaVTRpzqDxXaiK/8wChtMXEUjFQKL6snEskkRxCg+uLO6HjI19dJ7sTBUkjdMK58TM5RmK8EO1VvbCAAdlMs8G064pSFKxY/iQjp7VWuaqBUetpplESpIe6Bz+tOyTJ8ZyhkJimFG80iHoKWYI2TOa5FdlXod1NvTIkCLD2U=
|   256 04:a7:4f:39:95:65:c5:b0:8d:d5:49:2e:d8:44:00:36 (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBD+SiHX7ZTaXWFgBUKSVlFmMYtqF7Ihjfdc51aEdxFdB3xnRWVYSJd2JhOX1k/9V62eZMhR/4Lc8pJWQJHdSA/c=
|   256 b4:5e:83:93:c5:42:49:de:71:25:92:71:23:b1:85:54 (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIMXLlJgua8pjAw5NcWgGDwXoASfUOqUlpeQxd66seKyT
443/tcp  open  ssl/http   syn-ack nginx 1.18.0 (Ubuntu)
|_http-title: Seal Market
| http-methods: 
|_  Supported Methods: OPTIONS GET HEAD POST
| ssl-cert: Subject: commonName=seal.htb/organizationName=Seal Pvt Ltd/stateOrProvinceName=London/countryName=UK/localityName=Hackney/emailAddress=admin@seal.htb/organizationalUnitName=Infra
| Issuer: commonName=seal.htb/organizationName=Seal Pvt Ltd/stateOrProvinceName=London/countryName=UK/localityName=hackney/emailAddress=admin@seal.htb/organizationalUnitName=Infra
| Public Key type: rsa
| Public Key bits: 2048
| Signature Algorithm: sha256WithRSAEncryption
| Not valid before: 2021-05-05T10:24:03
| Not valid after:  2022-05-05T10:24:03
| MD5:   9c4f 991a bb97 192c df5a c513 057d 4d21
| SHA-1: 0de4 6873 0ab7 3f90 c317 0f7b 872f 155b 305e 54ef
| -----BEGIN CERTIFICATE-----
| MIIDiDCCAnACAWQwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAlVLMQ8wDQYD
| VQQIDAZMb25kb24xEDAOBgNVBAcMB2hhY2tuZXkxFTATBgNVBAoMDFNlYWwgUHZ0
| IEx0ZDEOMAwGA1UECwwFSW5mcmExETAPBgNVBAMMCHNlYWwuaHRiMR0wGwYJKoZI
| hvcNAQkBFg5hZG1pbkBzZWFsLmh0YjAeFw0yMTA1MDUxMDI0MDNaFw0yMjA1MDUx
| MDI0MDNaMIGJMQswCQYDVQQGEwJVSzEPMA0GA1UECAwGTG9uZG9uMRAwDgYDVQQH
| DAdIYWNrbmV5MRUwEwYDVQQKDAxTZWFsIFB2dCBMdGQxDjAMBgNVBAsMBUluZnJh
| MREwDwYDVQQDDAhzZWFsLmh0YjEdMBsGCSqGSIb3DQEJARYOYWRtaW5Ac2VhbC5o
| dGIwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDafbynnscdjWeuXTrD
| M36rTJ0y2pJpDDFe9ngryz/xw1KsoPfEDrDE0XHc8LVlD9cxXd/8+0feeV34d63s
| YyZ0t5tHlAKw1h9TEa/og1yR1MyxZRf+K/wcX+OwXYFtMHkXCZFH7TPXLKtCrMJM
| Z6GCt3f1ccrI10D+/dMo7eyQJsat/1e+6PgrTWRxImcjOCDOZ1+mlfSkvmr5TUBW
| SU3uil2Qo5Kj9YLCPisjKpVuyhHU6zZ5KuBXkudaPS0LuWQW1LTMyJzlRfoIi9J7
| E2uUQglrTKKyd3g4BhWUABbwyxoj2WBbgvVIdCGmg6l8JPRZXwdLaPZ/FbHEQ47n
| YpmtAgMBAAEwDQYJKoZIhvcNAQELBQADggEBAJZGFznhRSEa2DTgevXl1T8uxpiG
| PPd9R0whiIv3s225ir9SWW3Hl1tVkEY75G4PJA/DxmBIHxIK1OU8kZMuJUevnSIC
| rK16b9Y5Y1JEnaQwfKCoQILMU40ED76ZIJigGqAoniGCim/mwR1F1r1g63oUttDT
| aGLrpvN6XVkqSszpxTMMHk3SqwNaKzsaPKWPGuEbj9GGntRo1ysqZfBttgUMFIzl
| 7un7bBMIn+SPFosNGBmXIU9eyR7zG+TmpGYvTgsw0ZJqZL9yQIcszJQZPV3HuLJ8
| 8srMeWYlzSS1SOWrohny4ov8jpMjWkbdnDNGRMXIUpapho1R82hyP7WEfwc=
|_-----END CERTIFICATE-----
| tls-nextprotoneg: 
|_  http/1.1
|_ssl-date: TLS randomness does not represent time
| tls-alpn: 
|_  http/1.1
|_http-server-header: nginx/1.18.0 (Ubuntu)
8080/tcp open  http-proxy syn-ack
| http-auth: 
| HTTP/1.1 401 Unauthorized\x0D
|_  Server returned status 401 but no WWW-Authenticate header.
| http-methods: 
|_  Supported Methods: GET HEAD POST OPTIONS
| fingerprint-strings: 
|   FourOhFourRequest: 
|     HTTP/1.1 401 Unauthorized
|     Date: Sat, 15 Jan 2022 02:33:04 GMT
|     Set-Cookie: JSESSIONID=node013ylrs0xea5t91q0e22naf7ii32.node0; Path=/; HttpOnly
|     Expires: Thu, 01 Jan 1970 00:00:00 GMT
|     Content-Type: text/html;charset=utf-8
|     Content-Length: 0
|   GetRequest: 
|     HTTP/1.1 401 Unauthorized
|     Date: Sat, 15 Jan 2022 02:33:03 GMT
|     Set-Cookie: JSESSIONID=node0y0d5uqcsgpx81cfpdr3ldavp30.node0; Path=/; HttpOnly
|     Expires: Thu, 01 Jan 1970 00:00:00 GMT
|     Content-Type: text/html;charset=utf-8
|     Content-Length: 0
|   HTTPOptions: 
|     HTTP/1.1 200 OK
|     Date: Sat, 15 Jan 2022 02:33:04 GMT
|     Set-Cookie: JSESSIONID=node014zkj0xqq193m1cphgrxp0ct1a1.node0; Path=/; HttpOnly
|     Expires: Thu, 01 Jan 1970 00:00:00 GMT
|     Content-Type: text/html;charset=utf-8
|     Allow: GET,HEAD,POST,OPTIONS
|     Content-Length: 0
|   RPCCheck: 
|     HTTP/1.1 400 Illegal character OTEXT=0x80
|     Content-Type: text/html;charset=iso-8859-1
|     Content-Length: 71
|     Connection: close
|     <h1>Bad Message 400</h1><pre>reason: Illegal character OTEXT=0x80</pre>
|   RTSPRequest: 
|     HTTP/1.1 505 Unknown Version
|     Content-Type: text/html;charset=iso-8859-1
|     Content-Length: 58
|     Connection: close
|     <h1>Bad Message 505</h1><pre>reason: Unknown Version</pre>
|   Socks4: 
|     HTTP/1.1 400 Illegal character CNTL=0x4
|     Content-Type: text/html;charset=iso-8859-1
|     Content-Length: 69
|     Connection: close
|     <h1>Bad Message 400</h1><pre>reason: Illegal character CNTL=0x4</pre>
|   Socks5: 
|     HTTP/1.1 400 Illegal character CNTL=0x5
|     Content-Type: text/html;charset=iso-8859-1
|     Content-Length: 69
|     Connection: close
|_    <h1>Bad Message 400</h1><pre>reason: Illegal character CNTL=0x5</pre>
|_http-title: Site doesn't have a title (text/html;charset=utf-8).
1 service unrecognized despite returning data. If you know the service/version, please submit the following fingerprint at https://nmap.org/cgi-bin/submit.cgi
```

