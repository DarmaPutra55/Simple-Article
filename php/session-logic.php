<?php
    include_once('simple.php');
    class Session {
        private $user;

        public function __construct(){
            $this->user = new User();
        }

        public function checkLogin(){
            if(isset($_SESSION['username'])){
                return $_SESSION['username'];
            
            }
            return "not logged in";
        }

        public function logOut(){
            if($this->checkLogin()){
                session_destroy();
                return "logout success";
            }

            return "logout failed";
        }

        public function logIn(string $username, string $password){
            $login = $this->user->checkUser($username, $password);
            if($login){
                $_SESSION['username'] = $username;
                return "login success";
            }

            return "login failed";
        }

        /*private function erroAlert($msg){
            return "<script type='text/javascript'> alert( ".$msg." ) </script>";
        }*/
    }