<?php

$filename = "left.txt";
$fp = fopen($filename , "r") or die ("!?!");
$count = intval(trim(fgets($fp)));
fclose($fp);

echo "[$count]";

?>