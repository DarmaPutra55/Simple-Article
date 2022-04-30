<?php
  class Database{
    //private string $request = $_SERVER['REQUEST_METHOD'];

    public function __construct(string $server, string $username, string $password, string $database)
    {
      $this->server = $server;
      $this->username = $username;
      $this->password = $password;
      $this->database = $database;
      //$this->checkDb();
    }

    private function connectDB(){
      $connection = new mysqli($this->server, $this->username, $this->password, $this->database);
      if($connection->connect_errno){
        die("Error: ".$connection->connect_error);
      }
      return $connection;
    }
    
    public function fetchArticle(?int $id){
      if($id === null){
        $result = $this->fetchAllArticle();
      }
      else{
        $result = $this->fetchSingleArticle($id);
      }

      if($result->num_rows == 0) {
        return null;
      }
      
      return $result->fetch_all(MYSQLI_ASSOC);
    }

    private function fetchSingleArticle(int $id){
      $connection = $this->connectDB();
      $statement = $connection->prepare('SELECT articleheader as ArticleHeader, articletext as ArticleText FROM tb_article WHERE id=?');
      $statement->bind_param("i", $id);
      $statement->execute();
      return $statement->get_result();
    }

    private function fetchAllArticle(){
      $connection = $this->connectDB();
      $statement = $connection->prepare('SELECT id as ArticleID, articleheader as ArticleHeader, articletext as ArticleText FROM tb_article');
      $statement->execute();
      return $statement->get_result();
    }

    public function insertArticle(string $article_header, string $article_text, string $date, string $uploader){
      $connection = $this->connectDB();
      $statement = $connection->prepare("INSERT INTO tb_article(articleheader, articletext, upload_date, uploader) VALUES(?, ?, ?, ?)");
      $statement->bind_param('ssss', $article_header, $article_text, $date, $uploader);
      $statement->execute();
    }

    public function deleteArticle(int $article_id){
      $connection = $this->connectDB();
      $statement = $connection->prepare("DELETE FROM tb_article WHERE id = ?");
      $statement->bind_param("i", $article_id);
      $statement->execute();
    }

    public function updateArticle(int $article_id, string $article_header, string $article_text, string $date, string $uploader){
      $connection = $this->connectDB();
      $statement = $connection->prepare("UPDATE tb_article SET articleheader = ?, articletext = ?, upload_date = ?, uploader = ? WHERE id = ?");
      $statement->bind_param('ssssi', $article_header, $article_text, $date, $uploader, $article_id);
      $statement->execute();
    }

    /* TODO: Check database and table, if database no exist, make one. Same goes with the table
    private function checkDb(){
      $connection = new mysqli($this->server, $this->username, $this->password);
      $query = 'SELECT COUNT(*) FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMATA.SCHEMA_NAME="dummy_db"';
      $statement = $connection->prepare($query);
      $statement->execute();
      $resultRaw = $statement->get_result();
      $result = $resultRaw->fetch_array(MYSQLI_NUM);
      if($result[0] < 1){
        return print_r("Database not found!");
      }
    }

    private function createDb(){

    }

    private function checkTb(){
      //SELECT COUNT(*) from INFORMATION_SCHEMA.Tables WHERE TABLE_NAME = "tb_user" <-- Use This!
    }

    private function checkTbArticle(){

    }

    private function checkTbUser(){

    }

    private function createTbUser(){

    }

    private function createTbArticle(){

    }
    */
  }