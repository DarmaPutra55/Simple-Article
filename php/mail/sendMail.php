<?php
    include_once 'mailLogic.php';
    $emailSender = $_POST['emailSender'];
    $emailTitle = $_POST['emailTitle'];
    $emailContent = $_POST['emailContent'];
    $emailContent = wordwrap($emailContent, 70);
    $result;

    try{
        $mail = new EmailSender($emailTitle, $emailContent, $emailSender);
        $mail->sendEmail();
    }

    catch(Exception $err){        
    }