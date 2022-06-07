<?php 
    session_start();
    include_once('simple.php');
    $article_id = $_POST['articleID'];
    $article_header = $_POST['articleTitle'];
    $article_text = $_POST['articleContent'];
    $uploader = $_SESSION['username'];
    $update_date = $_POST['date'];
    $result;

    try{
        $db = new Database();
        $db->updateArticle($article_id, $article_header, $article_text, $update_date, $uploader);
        $result = json_encode(array("status" => "ok"));
    }
    catch(Exception $error){
        $result = json_encode(array("status" => "error"));
    }
    finally{
        header('Content-Type: application/json; charset=utf-8');
        echo $result;
    }
