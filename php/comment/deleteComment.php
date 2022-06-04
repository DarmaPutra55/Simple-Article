<?php 
    include_once('simple.php');
    $comment_id = $_POST['CommentID'];
    $result;

    try{
        $db = new Database();
        $db->deleteComment($comment_id);
        $result = json_encode(array("status" => "ok"));
    }
    catch(Exception $error){
        $result = json_encode(array("status" => "error"));
    }
    finally{
        header('Content-Type: application/json; charset=utf-8');
        echo $result;
    }
