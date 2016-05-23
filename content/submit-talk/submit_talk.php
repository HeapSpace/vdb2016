<?php

$emailSubject = 'VoxxedDays Belgrade - Submit Talk';
$emailFrom = "voxxed-cfp@heapspace.rs";
$formsubmitted = date("Y/m/d H:i:s");

$name = $_POST['formname'];
$email = $_POST['formemail'];
$title = $_POST['formtitle'];
$language = $_POST['formlanguage'];
$shortdesc= $_POST['formshortdesc'];
$fulldesc = $_POST['formfulldesc'];
$type = $_POST['formtype'];
$audience = $_POST['formaudience'];
$tags = $_POST['formtags'];
$code = $_POST['formcode'];

$file = 'submittalk.csv';
$newfile = './csvbackup/submittalk.csv.bak-'.date('Y-m-d-H-i-s');

if (!copy($file, $newfile)) {

}

$fp = fopen(realpath(dirname(__FILE__) . '/submittalk.csv'), 'a') or die("cannot open file");
fputcsv($fp, array($formsubmitted, $name, $email, $title, $shortdesc, $fulldesc, $type, $language, $audience, $tags, $code));
fclose($fp);

$body = <<<EOD
<br />
------------<br />
Name: $name <br />
------------<br />
Email: $email <br />
------------<br />
Title: $title <br />
------------<br />
Language: $language <br />
------------<br />
Short abstract: $shortdesc <br />
------------<br />
Full abstract: $fulldesc <br />
------------<br />
Type of talk: $type <br />
------------<br />
Audience: $audience <br />
------------<br />
Tags: $tags <br />
------------<br />
Level of code: $code <br />
------------<br />
<br />
EOD;

$headers = 'From: ' . $email . "\r\n" .
    'Reply-To: ' . $email . "\r\n" .
    'X-Mailer: PHP/' . phpversion() . "\r\n" .
	'Content-type: text/html' . "\r\n";

$headers2 = 'From: ' . $emailFrom . "\r\n" .
    'Reply-To: ' . $emailFrom . "\r\n" .
    'X-Mailer: PHP/' . phpversion() . "\r\n" .
	'Content-type: text/html' . "\r\n";

$success = mail($emailFrom, $emailSubject, $body, $headers);
$success2 = mail($email, $emailSubject, $body, $headers2);

if ($success && $success2) {
  header("Location: thanks/");
} else {
  header("Location: error/");
}

?>
