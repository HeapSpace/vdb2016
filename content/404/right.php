<?php

$filename = "left.txt";
$count = -1;

if (file_exists($filename)) {
	$fp = fopen($filename, "r+") or die ("?Right");
	if (flock($fp, LOCK_EX)) {
		$count = intval(trim(fgets($fp)));
		$count = $count + 1;
		if ($count > 100) {
			$count = 100;
		}
		ftruncate($fp, 0);
		$val = strval($count);
		fwrite($fp, $val);
		flock($fp, LOCK_UN);
	}
	fclose($fp);
}
echo json_encode(array($count));

?>
