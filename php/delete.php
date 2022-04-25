<?php 
    include_once('simple.php');
    $article_id = $_POST['article_id'];
    $result;

    try{
        $db = new Database('localhost','root','','dummy_db');
        $db->deleteArticle($article_id);
        $result = json_encode(array("Success" => "Data sucessfully deleted!"));
    }
    catch(Exception $error){
        $result = json_encode(array("Error" => "Something went wrong!"));
    }
    finally{
        header('Content-Type: application/json; charset=utf-8');
        echo $result;
    }
