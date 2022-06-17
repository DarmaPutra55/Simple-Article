<?php
    include_once('../simple.php');
    $aricleID = null;
    if(isset($_POST['aricleID'])){
        $aricleID = $_POST['aricleID'];
    }
    $result;
    
    try{
        $article = new Article();
        $result = json_encode($article->fetch($aricleID));
    }
    catch(Exception $error){
        $result = json_encode(array("status" => "error"));
    }
    finally{
        header('Content-Type: application/json; charset=utf-8');
        echo $result;
    }
