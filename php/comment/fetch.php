<?php
    include_once('../simple.php');
    $article_id = $_POST['articleID'];
    $result;

    try{
        $comment = new Comment();
        $result = json_encode($comment->fetch($article_id));
    }
    catch(Exception $error){
        $result = json_encode(array("status" => "error"));
    }
    finally{
        header('Content-Type: application/json; charset=utf-8');
        echo $result;
    }
