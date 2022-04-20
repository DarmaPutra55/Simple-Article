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
    
    public function fetchArticle(?int $id){
      $result = $this->fetchArticleSQL($id);
      if($result->num_rows == 0) {
        return null;
      }
      return $result->fetch_all(MYSQLI_ASSOC);
    }

    private function fetchArticleSQL(?int $id){
      $connection = $this->connectDB();
      if(is_null($id)){
        $statement = $connection->prepare('SELECT articleheader as ArticleHeader, articletext as ArticleText FROM tb_article');
      }
      else{
        $statement = $connection->prepare('SELECT articleheader as ArticleHeader, articletext as ArticleText FROM tb_article WHERE id=?');
        $statement->bind_param('i', $id);
      }
      $statement->execute();
      $result = $statement->get_result();
      return $result;
    }

    public function insertArticle(string $articleheader, string $articletext, string $date, int $uploader_id){
      $connection = $this->connectDB();
      $statement = $connection->prepare("INSERT INTO tb_article(articleheader, articletext, upload_date, id_uploader) VALUES(?, ?, ?, ?)");
      $statement->bind_param('sssi', $articleheader, $articletext, $date, $uploader_id);
      $statement->execute();
    }
  }
  

?>