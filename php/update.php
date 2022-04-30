<?php 
    include_once('simple.php');
    $article_id = $_POST['articleID'];
    $article_header = $_POST['articleTitle'];
    $article_text = $_POST['articleContent'];
    $uploader = $_POST['uploader'];
    $update_date = $_POST['date'];
    $result;

    try{
        $db = new Database('localhost','root','','dummy_db');
        $db->updateArticle($article_id, $article_header, $article_text, $uploader, $update_date);
        $result = json_encode(array("Success" => "Data sucessfully updated!"));
    }
    catch(Exception $error){
        $result = json_encode(array("Error" => "Something went wrong!"));
    }
    finally{
        header('Content-Type: application/json; charset=utf-8');
        echo $result;
    }
