<?php
ini_set("display_errors","On");
$json = json_decode(file_get_contents('php://input'));
exec("node vote.js ".$json->user." > ./vote.txt &");

