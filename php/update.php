<?php 
    include_once('simple.php');
    $article_id = $_POST['article_id'];
    $article_header = $_POST['article_header'];
    $article_text = $_POST['article_text'];
    $update_date = $_POST['update_date'];
    $result;

    try{
        $db = new Database('localhost','root','','dummy_db');
        $db->updateArticle($article_id, $article_header, $article_text, $update_date);
        $result = json_encode(array("Success" => "Data sucessfully updated!"));
    }
    catch(Exception $error){
        $result = json_encode(array("Error" => "Something went wrong!"));
    }
    finally{
        header('Content-Type: application/json; charset=utf-8');
        echo $result;
    }
?>