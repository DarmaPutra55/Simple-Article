<?php
  class Database{
    //private string $request = $_SERVER['REQUEST_METHOD'];

    public $host;
    public $username;
    public $password;
    public $database;

    public function __construct()
    {
      $this->host = 'localhost';
      $this->username = 'root';
      $this->password = '';
      $this->database = 'dummy_db';
      //$this->checkDb();
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

  abstract class DatabaseConnector {
    protected $db;

    public function __construct(){
      $this->db = new Database();
    }

    protected function connectDB(){
      $connection = new mysqli($this->db->host, $this->db->username, $this->db->password, $this->db->database);
      if($connection->connect_errno){
        die("Error: ".$connection->connect_error);
      }
      return $connection;
    }
  }

  class Article extends DatabaseConnector{ //Handle CRUD operation for Article table

    public function fetch(?int $id){
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
      $statement = $connection->prepare('SELECT articleheader as ArticleHeader, articletext as ArticleText, upload_date as UploadDate, uploader as Author FROM tb_article WHERE id=?');
      $statement->bind_param("i", $id);
      $statement->execute();
      return $statement->get_result();
    }

    private function fetchAllArticle(){
      $connection = $this->connectDB();
      $statement = $connection->prepare('SELECT id as ArticleID, articleheader as ArticleHeader, articletext as ArticleText, upload_date as UploadDate, uploader as Author FROM tb_article');
      $statement->execute();
      return $statement->get_result();
    }

    public function insert(string $article_header, string $article_text, string $date, string $uploader){
      $connection = $this->connectDB();
      $statement = $connection->prepare("INSERT INTO tb_article(articleheader, articletext, upload_date, uploader) VALUES(?, ?, ?, ?)");
      $statement->bind_param('ssss', $article_header, $article_text, $date, $uploader);
      $statement->execute();
    }

    public function delete(int $article_id){
      $connection = $this->connectDB();
      $statement = $connection->prepare("DELETE FROM tb_article WHERE id = ?");
      $statement->bind_param("i", $article_id);
      $statement->execute();
    }

    public function update(int $article_id, string $article_header, string $article_text, string $date, string $uploader){
      $connection = $this->connectDB();
      $statement = $connection->prepare("UPDATE tb_article SET articleheader = ?, articletext = ?, upload_date = ?, uploader = ? WHERE id = ?");
      $statement->bind_param('ssssi', $article_header, $article_text, $date, $uploader, $article_id);
      $statement->execute();
    }
  }

  class Comment extends DatabaseConnector { //Handle CRUD operation for Comment table

    public function fetch($id){
      $connection = $this->connectDB();
      $statement = $connection->prepare('SELECT id_comment as CommentID, comment as CommentText, username as Username, comment_date as CommentDate FROM tb_comment WHERE id_article =?');
      $statement->bind_param("i", $id);
      $statement->execute();
      $result = $statement->get_result();
      return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function insert(int $article_id, string $comment_text, string $uploader, string $date){
      $connection = $this->connectDB();
      $statement = $connection->prepare("INSERT INTO tb_comment(id_article, comment, username, comment_date) VALUES(?, ?, ?, ?)");
      $statement->bind_param('isss', $article_id, $comment_text, $uploader, $date);
      $statement->execute();
    }

    public function delete(int $comment_id){
      $connection = $this->connectDB();
      $statement = $connection->prepare("DELETE FROM tb_comment WHERE id_comment = ?");
      $statement->bind_param("i", $comment_id);
      $statement->execute();
    }

    public function update(int $id_comment, string $comment_text, string $uploader, string $date){
      $connection = $this->connectDB();
      $statement = $connection->prepare("UPDATE tb_comment SET comment = ?, username = ?, comment_date = ? WHERE id_comment = ?");
      $statement->bind_param('sssi', $comment_text, $uploader, $date, $id_comment);
      $statement->execute();
    }
  }

  class User extends DatabaseConnector { //Handle database operation involving user table

    public function checkUser(string $username, string $password = null){
      if($password === null){
        $result = $this->checkRegister($username);
      }
      else{
        $result = $this->checkLogin($username, $password);
      }

      if($result[0]['Status'] === 1){
        return true;
      }
      return false;
    }

    private function checkLogin(string $username, string $password){
      $connection = $this->connectDB();
      $statement = $connection->prepare("SELECT COUNT(username) as Status FROM tb_user WHERE username = ? AND password = ?");
      $statement->bind_param("ss", $username, $password);
      $statement->execute();
      $resultRaw = $statement->get_result();
      return $resultRaw->fetch_all(MYSQLI_ASSOC);
    }

    private function checkRegister(string $username){
      $connection = $this->connectDB();
      $statement = $connection->prepare("SELECT COUNT(username) as Status FROM tb_user WHERE username = ?");
      $statement->bind_param("s", $username);
      $statement->execute();
      $resultRaw = $statement->get_result();
      return $resultRaw->fetch_all(MYSQLI_ASSOC);
    }

    public function register(string $username, string $password){
      $connection = $this->connectDB();
      $statement = $connection->prepare("INSERT INTO tb_user(username, password) VALUES(?, ?)");
      $statement->bind_param("ss", $username, $password);
      $statement->execute();
    }
  }