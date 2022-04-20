<?php 
    include_once ('simple.php');
    $articleheader = $_POST['articleheader'];
    $articletext = $_POST['articletext'];
    $date = $_POST['date'];
    $uploader_id = $_POST['uploader_id'];
    $result = null;

    try{
        $db = new Database('localhost','root','','dummy_db');
        $db->insertArticle($articleheader, $articletext, $date, $uploader_id);
        $result = json_encode(array("Success" => "Data sucessfully added!"));
    }
    catch(Exception $error){
        $result = json_encode(array("Error" => $error));
    }
    finally{
        header('Content-Type: application/json; charset=utf-8');
        echo $result;
    }
?>