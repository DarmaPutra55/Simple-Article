<?php
    session_start();
    include_once('../session-logic.php');
    $username = $_POST['username'];
    $password = $_POST['password'];
    $result;

    try{
        $session = new Session();
        $loginStatus = $session->logIn($username, $password);
        
        if($loginStatus === "login success"){
            $result = json_encode(array('success'=>'ok'));
        }
        else{
            $result = json_encode(array('error'=>'user not found'));
        }
    }
    catch(Exception $err){
        $result = json_encode(array('error'=>'error'));
    }
    finally{
        header('Content-Type: application/json; charset=utf-8');
        echo $result;
    }