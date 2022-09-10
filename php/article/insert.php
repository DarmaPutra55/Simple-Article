<?php 
    session_start();
    include_once ('../simple.php');
    $articleTitle = $_POST['articleTitle'];
    $articleContent = $_POST['articleContent'];
    $date = $_POST['date'];
    $uploader = $_SESSION['username'];
    $result;

    try{
        $article = new Article();
        $article->insert($articleTitle, $articleContent, $date, $uploader);
        $result = json_encode(array("status" => "ok"));
    }
    catch(Exception $error){
        $result = json_encode(array("status" => "error"));
    }
    finally{
        header('Content-Type: application/json; charset=utf-8');
        echo $result;
    }
