<?php
    session_start();
    include_once('simple.php');
    include_once('session-logic.php');
    $username = "Darma";
    $password = "Dambala";
    $result;

    try{
        $db = new Database();
        $session = new Session();

        if(!$db->checkUser($username)){
            $db->registerUser($username, $password);
            $session->logIn($username, $password);
            $result = json_encode(array('success'=>'Registration success!'));
        }
        else{
            $result = json_encode(array('error'=>'Username already exist!'));
        }
    }

    catch(Exception $err){
        $result = json_encode(array('error'=>'Something went wrong!'));
    }

    finally{
        header('Content-Type: application/json; charset=utf-8');
        echo ($result);
    }
