<?php
    session_start();
    include_once('../simple.php');
    include_once('../session-logic.php');
    $username = $_POST['username'];
    $password = $_POST['password'];
    $result;

    try{
        $user = new User();
        $session = new Session();

        if(!$user->checkUser($username)){
            $user->register($username, $password);
            $session->logIn($username, $password);
            $result = json_encode(array('success'=>'ok'));
        }
        else{
            $result = json_encode(array('error'=>'username-exist'));
        }
    }

    catch(Exception $err){
        $result = json_encode(array('error'=>'error'));
    }

    finally{
        header('Content-Type: application/json; charset=utf-8');
        echo ($result);
    }
