<?php
    session_start();
    include_once('../session-logic.php');
    $session = new Session();
    $result;
    
    try{
        $session->logOut();
        $result = json_encode(array("success"=>"ok"));
    }
    catch(Exception $err){
        $result = json_encode(array("error"=>"error"));
    }
    finally{
        header('Content-Type: application/json; charset=utf-8');
        echo $result;
    }