<?php

$emailSubject = 'VoxxedDays Belgrade - Submit Talk';

$formsubmitted = date("Y/m/d H:i:s")

$name = $_POST['form-name'];
$email = $_POST['form-email'];
$title = $_POST['form-'];
$language = $_POST['form-language'];
$shortdesc= $_POST['form-short-desc'];
$fulldesc = $_POST['form-long-desc'];
$type = $_POST['form-type'];
$audience = $_POST['form-audience'];
$tags = $_POST['form-tags'];
$code = $_POST['form-code'];

$fp = fopen("../submittalk.csv", 'a');
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
EOD;

$headers = 'From: ' . $email . "\r\n" .
    'Reply-To: voxxed@heapspace.rs' . "\r\n" .
    'X-Mailer: PHP/' . phpversion() . "\r\n" .
	'Content-type: text/html' . "\r\n";


$success = mail("dtasic@gmail.com", $emailSubject, $body, $headers);
$success2 = mail($email, $emailSubject, $body, $headers);

?>

<!DOCTYPE html>
<html>
<head>
	<%= render '/_head.html', :title => 'Default title'%>
	<%= meta_tag :keywords %>
</head>
<body>
	<%= render '/_header.html'%>

	<div>
		Thanks for submitting
	</div>

	<%= render '/_footer.html'%>
	<%= render '/_bottomscripts.html'%>
</body>
</html>
