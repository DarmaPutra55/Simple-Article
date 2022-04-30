<?php
    include_once('simple.php');
    $aricleID = null;
    if(isset($_POST['aricleID'])){
        $aricleID = $_POST['aricleID'];
    }
    $result;
    
    try{
        $db = new Database('localhost','root','','dummy_db');
        $result = json_encode($db->fetchArticle($aricleID));
    }
    catch(Exception $error){
        $result = json_encode(array("Error" => "Something went wrong!"));
    }
    finally{
        header('Content-Type: application/json; charset=utf-8');
        echo $result;
    }
