<?php

$emailSubject = 'VoxxedDays Belgrade - Contact Form (new site test)';

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

$headers = 'From: ' . $email . "\r\n" .
    'Reply-To: voxxed@heapspace.rs' . "\r\n" .
    'X-Mailer: PHP/' . phpversion() . "\r\n" .
	'Content-type: text/html' . "\r\n";


$success = mail("voxxed@heapspace.rs", $emailSubject, $body, $headers);
$success2 = mail($email, $emailSubject, $body, $headers);

if ($success && $success2) {
  header("Location: thankyou_contact.html");
} else {
  header("Location: formerror_contact.html");
}

?>
