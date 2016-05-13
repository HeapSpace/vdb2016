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

	// result as json
	$a = array("$count");
	echo json_encode($a);
} else {
	echo "err";
}

?>
