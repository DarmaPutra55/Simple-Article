<?php
    session_start();
    include_once("../simple.php");
    $commentID = $_POST['commentID'];
    $commentContent = $_POST['commentText'];
    $date = $_POST['date'];
    $uploader = $_SESSION['username'];
    $result;

    try{
        $db = new Database();
        $db->updateComment($commentID, $commentContent, $uploader, $date);
        $result = json_encode(array("status" => "ok"));
    }

    catch(Exception $err){
        $result = json_encode(array("status" => "error"));
    }

    finally{
        header('Content-Type: application/json; charset=utf-8');
        echo $result;
    }