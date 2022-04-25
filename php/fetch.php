<?php
    include_once('simple.php');
    $result;
    
    try{
        $db = new Database('localhost','root','','dummy_db');
        $result = json_encode($db->fetchArticle());
    }
    catch(Exception $error){
        $result = json_encode(array("Error" => "Something went wrong!"));
    }
    finally{
        header('Content-Type: application/json; charset=utf-8');
        echo $result;
    }
