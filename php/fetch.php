<?php
    include_once('simple.php');
    $id = null;
    $result = null;
    if(isset($_POST['id'])){
        $id = $_POST['id'];
    }
    try{
        $db = new Database('localhost','root','','dummy_db');
        $result = json_encode($db->fetchArticle($id));
    }
    catch(Exception $error){
        $result = json_encode(array("Error" => $error));
    }
    finally{
        header('Content-Type: application/json; charset=utf-8');
        echo $result;
    }
?>