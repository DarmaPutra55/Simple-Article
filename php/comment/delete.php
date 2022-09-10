<?php 
    include_once('../simple.php');
    $comment_id = $_POST['CommentID'];
    $result;

    try{
        $comment = new Comment();
        $comment->delete($comment_id);
        $result = json_encode(array("status" => "ok"));
    }
    catch(Exception $error){
        $result = json_encode(array("status" => "error"));
    }
    finally{
        header('Content-Type: application/json; charset=utf-8');
        echo $result;
    }
