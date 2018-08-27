<?php

if($_SERVER["REQUEST_METHOD"] == "POST"){
  /* URL production phase starts here */

define("CLIENT_ID", API_KEY);

$page = $_REQUEST["page"];
$perPage = $_REQUEST["per_page"];
$orderBy = $_REQUEST["order_by"];
$query = $_REQUEST["query"];
$method = $_REQUEST["method"];

$url="https://api.unsplash.com/";
switch($method){
  case "photos" : $url.="photos?client_id=".CLIENT_ID."&order_by=$orderBy&page=$page&per_page=$perPage";
                  break;
  case "search" : $url.="search/photos?client_id=".CLIENT_ID."&page=$page&per_page=$perPage&query=$query";
                  break;
}

// If the value of the url exist in session retrive it otherwise request to server then save it in session
session_start();
$data = null;
if(isset($_SESSION[$url]) && !empty($_SESSION[$url])){
  $data = $_SESSION[$url];
}else{
  $data = file_get_contents($url);
  $_SESSION[$url] = $data;
}
echo $data;

}else{
echo "FUCK OFF HACKER";
}
?>
