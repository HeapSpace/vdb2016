<?php

$emailSubject = 'VoxxedDays Belgrade - Contact Form (new site test)';
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

$headers = 'From: ' . $emailFrom . "\r\n" .
    'Reply-To: ' . $emailFrom . "\r\n" .
    'X-Mailer: PHP/' . phpversion() . "\r\n" .
	'Content-type: text/html' . "\r\n";


$success = mail($emailFrom, $emailSubject, $body, $headers);
$success2 = mail($email, $emailSubject, $body, $headers);
$failtest = false;

if ($success && $success2 && $failtest) {
  header("Location: thanks/");
} else {
  header("Location: error/");
}

?>
