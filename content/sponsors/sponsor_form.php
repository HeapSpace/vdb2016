<?php

$emailSubject = 'VoxxedDays Belgrade - Sponsor Form (new site test)';
$emailFrom = "sponsors@heapspace.rs";

$name = $_POST['formname'];
$company = $_POST['formcompany'];
$email = $_POST['formemail'];
$phone = $_POST['formphone'];

$body = <<<EOD
<br />
------------<br />
Name: $name <br />
------------<br />
Company: $company<br />
------------<br />
Email: $email <br />
------------<br />
Phone: $phone <br />
------------<br />
<br />
EOD;

$headers = 'From: ' . $email . "\r\n" .
    'Reply-To: ' . $email . "\r\n" .
    'X-Mailer: PHP/' . phpversion() . "\r\n" .
	'Content-type: text/html' . "\r\n";

$success = mail($emailFrom, $emailSubject, $body, $headers);

if ($success) {
  header("Location: thanks/");
} else {
  header("Location: error/");
}

?>
