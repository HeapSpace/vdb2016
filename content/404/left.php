<?php

$filename = "left.txt" ;

if (file_exists($filename)) {
	// increments count
	$fp = fopen($filename, "r+") or die ("?!?");
	flock($fp, 1);
	$count = fgets($fp, 1024);
	$count += 1;
	fseek($fp, 0);
	fputs($fp, $count);
	flock($fp, 3);
	fclose($fp);

	echo json_encode(array("$count"));
} else {
	$fp = fopen($filename, "a") or die ("!?!");
	flock($fp, 1);
	fputs($fp, 1);
	flock($fp, 3);
	fclose($fp);

	echo json_encode(array("1"));
}

?>
