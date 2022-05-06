<?php
session_start();
include_once('session-logic.php');
$username = $_POST['username'];
$password = $_POST['password'];
try{
    $session = new Session();
    $session->logIn($username, $password);
    $session->checkLogin();
}
catch(Exception $err){
    echo("Error: ".$err);
}