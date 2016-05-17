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

$headers = 'From: ' . $emailFrom . "\r\n" .
    'Reply-To: ' . $emailFrom . "\r\n" .
    'X-Mailer: PHP/' . phpversion() . "\r\n" .
	'Content-type: text/html' . "\r\n";


$success = mail($emailFrom, $emailSubject, $body, $headers);
$success2 = mail($email, $emailSubject, $body, $headers);

if ($success && $success2) {
  header("Location: thanks/");
} else {
  header("Location: error/");
}

?>
