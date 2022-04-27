<?php 
    include_once ('simple.php');
    $articleTitle = $_POST['articleTitle'];
    $articleContent = $_POST['articleContent'];
    $date = $_POST['date'];
    $uploader = $_POST['uploader'];
    $result;

    try{
        $db = new Database('localhost','root','','dummy_db');
        $db->insertArticle($articleTitle, $articleContent, $date, $uploader);
        $result = json_encode(array("Success" => "Data sucessfully added!"));
    }
    catch(Exception $error){
        $result = json_encode(array("Error" => "Something went wrong!"));
    }
    finally{
        header('Content-Type: application/json; charset=utf-8');
        echo $result;
    }
