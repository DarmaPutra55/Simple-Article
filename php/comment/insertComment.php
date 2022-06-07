<?php 
    session_start();
    include_once ('../simple.php');
    $articleID = $_POST['articleID'];
    $commentContent = $_POST['commentContent'];
    $uploader = $_SESSION['username'];
    $date = $_POST['date'];
    $result;

    try{
        $db = new Database();
        $db->insertComment($articleID, $commentContent, $uploader, $date);
        $result = json_encode(array("status" => "ok"));
    }
    catch(Exception $error){
        $result = json_encode(array("status" => "error"));
    }
    finally{
        header('Content-Type: application/json; charset=utf-8');
        echo $result;
    }
