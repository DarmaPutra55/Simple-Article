<?php
    session_start();
    include_once('session-logic.php');
    $session = new Session();
    $result;

    try{
        $validity = $session->checkLogin();
        if($validity !== "not logged in"){
            $result = json_encode(array("username"=>$validity));
        }
        
        else{
            $result = json_encode(array("error"=>"not-logged"));
        }
    
    }
    catch(Exception $err){
        $result = json_encode(array("error"=>"error"));
    }

    finally{
        header('Content-Type: application/json; charset=utf-8');
        echo ($result);
    }
