<?php 
    include_once('../simple.php');
    $article_id = $_POST['ArticleID'];
    $result;

    try{
        $article = new Article();
        $article->delete($article_id);
        $result = json_encode(array("status" => "ok"));
    }
    catch(Exception $error){
        $result = json_encode(array("status" => "error"));
    }
    finally{
        header('Content-Type: application/json; charset=utf-8');
        echo $result;
    }
