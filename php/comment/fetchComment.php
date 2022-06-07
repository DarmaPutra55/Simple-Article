<?php
    include_once('../simple.php');
    $article_id = $_POST['articleID'];
    $result;

    try{
        $db = new Database();
        $result = json_encode($db->fetchComment($article_id));
    }
    catch(Exception $error){
        $result = json_encode(array("status" => "error"));
    }
    finally{
        header('Content-Type: application/json; charset=utf-8');
        echo $result;
    }
