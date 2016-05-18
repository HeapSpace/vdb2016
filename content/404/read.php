<?php

$filename = "left.txt";
$fp = fopen($filename , "r") or die ("!?!");
$count = intval(trim(fgets($fp, 1024)));
fclose($fp);

echo "[$count]";

?>