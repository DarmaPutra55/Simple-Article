<?php
    include_once 'mailLogic.php';
    $emailSender = "absoluteneos@gmail.com"; //$_POST['emailSender'];
    $emailTitle = "Contact agreement"; //$_POST['emailTitle'];
    $emailContent = "You feel for it fool!"; //$_POST['emailContent'];
    $emailContent = wordwrap($emailContent, 70);
    $result;

    try{
        $mail = new EmailSender($emailTitle, $emailContent, $emailSender);
        $mail->sendEmail();
        $result = json_encode(array('status'=>'ok'));
    }

    catch(Exception $err){
        $result = json_encode(array('status'=>'error'));
    }

    finally{
        header('Content-Type: application/json; charset=utf-8');
        echo $result;
    }