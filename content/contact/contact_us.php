<?php

$emailSubject = 'VoxxedDays Belgrade - Contact Form';
$emailFrom = "voxxed@heapspace.rs";

$name = $_POST['formname'];
$email = $_POST['formemail'];
$subject = $_POST['formsubject'];
$message = $_POST['formmessage'];

$body = <<<EOD
<br />
------------<br />
Name: $name <br />
------------<br />
Email: $email <br />
------------<br />
Subject: $subject <br />
------------<br />
Message: $message <br />
------------<br />
<br />
EOD;

$body2 = <<<EOD
<br />
Thank you for expressing interest in Voxxed Days Belgrade 2016<br />
We will get back to you very soon!<br />
<br />
VoxxedDays Belgrade Team<br />
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
$success2 = mail($email, $emailSubject, $body2, $headers2);

if ($success && $success2) {
  header("Location: thanks/");
} else {
  header("Location: error/");
}

?>
