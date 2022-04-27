<?php
  class Database{
    //private string $request = $_SERVER['REQUEST_METHOD'];

    public function __construct(string $server, string $username, string $password, string $database)
    {
      $this->server = $server;
      $this->username = $username;
      $this->password = $password;
      $this->database = $database;
    }

    private function connectDB(){
      $connection = new mysqli($this->server, $this->username, $this->password, $this->database);
      if($connection->connect_errno){
        die("Error: ".$connection->connect_error);
      }
      return $connection;
    }
    
    public function fetchArticle(){
      $connection = $this->connectDB();
      $statement = $connection->prepare('SELECT id as ArticleID, articleheader as ArticleHeader, articletext as ArticleText FROM tb_article');
      $statement->execute();
      $result = $statement->get_result();
      if($result->num_rows == 0) {
        return null;
      }
      return $result->fetch_all(MYSQLI_ASSOC);
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

    public function updateArticle(int $article_id, string $article_header, string $article_text, string $date){
      $connection = $this->connectDB();
      $statement = $connection->prepare("UPDATE tb_article SET articleheader = ?, articletext = ?, upload_date = ? WHERE id = ?");
      $statement->bind_param('sssi', $article_header, $article_text, $date, $article_id);
      $statement->execute();
    }
  }
