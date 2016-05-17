<?php

$filename = "left.txt" ;

if (file_exists($filename)) {
	$fp = fopen($filename, "r+") or die ("?Right");
	flock($fp, 1);
	$count = fgets($fp, 1024);
	$count += 1;
	if ($count > 100) {
		$count = 100;
	}
	fseek($fp, 0);
	fputs($fp, $count);
	flock($fp, 3);
	fclose($fp);

	echo json_encode(array("$count"));
} else {
	echo json_encode(array("-1"));
}

?>
