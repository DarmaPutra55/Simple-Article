<?php
    include_once 'simple.php';
    class Session {

        public function __construct(){
            $this->db = new Database('localhost','root','','dummy_db');
        }

        public function checkLogin(){
            if(isset($_SESSION['username'])){
                return true;
            }
            
            return $this->erroAlert("User not found!");
        }

        public function logOut(){
            if($this->checkLogin()){
                session_destroy();
                return "Logout success!";
            }
            return $this->erroAlert("Logout failed!");
        }

        public function logIn(string $username, string $password){
            $login = $this->db->loginUser($username, $password);
            print_r($login);
            if($login === "Found User."){
                $_SESSION['username'] = $username;
            }
            else{
                $this->erroAlert("User not found!");
            }
        }

        private function erroAlert($msg){
            return "<script type='text/javascript'> alert( ".$msg." ) </script>";
        }
    }