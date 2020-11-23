<?php
ini_set("display_errors","On");
$json = json_decode(file_get_contents('php://input'));
if(isset($json)){
    if($json->type=="test"){
        
    }else{
        exec("node vote.js ".$json->user." > ./vote.txt &");
    }
}else{
 echo "error"; 
}
