<?php 
    include_once ('simple.php');
    $articleTitle = $_POST['articleTitle'];
    $articleContent = $_POST['articleContent'];
    $date = $_POST['date'];
    $uploader = $_POST['uploader'];
    $result;

    try{
        $db = new Database();
        $db->insertArticle($articleTitle, $articleContent, $date, $uploader);
        $result = json_encode(array("status" => "ok"));
    }
    catch(Exception $error){
        $result = json_encode(array("status" => "error"));
    }
    finally{
        header('Content-Type: application/json; charset=utf-8');
        echo $result;
    }
