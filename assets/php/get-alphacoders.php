<?php

if($_SERVER["REQUEST_METHOD"] == "POST"){
  /* URL production phase starts here */
  define("API_KEY", API_KEY);

  $method = $_REQUEST['method'];
  $infoLevel = $_REQUEST['info_level'];
  $page = $_REQUEST['page'];
  $checkLast = $_REQUEST['check_last'];
  $sort = $_REQUEST['sort'];
  $id = $_REQUEST['id']; //ID(wallpaper, group, category etc)
  $term = $_REQUEST['term']; // Search Terms

  $url = "https://wall.alphacoders.com/api2.0/get.php?auth=".API_KEY."&";

  switch($method){
    case "newest" :
    case "highest_rated" :
    case "by_views" :
    case "by_favorites" :
    case "popular" :  $url.="method=$method&page=$page&info_level=$infoLevel&check_last=$checkLast";
                    break;
    case "category" : $url.="method=$method&page=$page&info_level=$infoLevel&check_last=$checkLast&id=$id&sort=$sort";
                    break;
    case "category_list" : $url.="method=$method";
                    break;
    case "featured" : $url.="method=$method&page=$page&info_level=$infoLevel&check_last=$checkLast&sort=$sort";
                    break;
    case "search" : $url.="method=$method&page=$page&info_level=$infoLevel&check_last=$checkLast&term=$term";
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
