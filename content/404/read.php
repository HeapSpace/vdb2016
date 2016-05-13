<?php
$filename = "left.txt";
$fd = fopen($filename , "r") or die ("!?!");
$count1 = fread($fd , filesize($filename));
fclose($fd);

$filename = "right.txt";
$fd = fopen($filename , "r") or die ("!?!");
$count2 = fread($fd , filesize($filename));
fclose($fd);

echo "[$count1, $count2]";

?>