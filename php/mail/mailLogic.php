<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    
    require '../dependencies/Exception.php';
    require '../dependencies/PHPMailer.php';
    require '../dependencies/SMTP.php';

    class Email{
        protected $mail;
        public function __construct(){
            $this->mail   = new PHPMailer(true);
        }
    }

    class EmailSender extends Email{
        private $emailHeader;
        private $emailContent;
        private $emailSender;

        public function __construct($emailHeader, $emailContent, $emailSender){
            parent::__construct();
            $this->emailHeader = $emailHeader;
            $this->emailContent = $emailContent;
            $this->emailSender = $emailSender;
        }

        public function sendEmail(){
            try{
                $mail = $this->mail;
                $mail->isSMTP();                                            //Send using SMTP
                $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
                $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
                $mail->Username   = 'absoluteneos@gmail.com';                     //SMTP username
                $mail->Password   = 'ckmpnlsfzgsyktlf';                               //SMTP password
                $mail->Port = 587;
                //Set sistem enkripsi untuk menggunakan - ssl (deprecated) atau tls
                $mail->SMTPSecure = 'tls';     
                //$mail->SMTPDebug = 3;                             //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

                //Recipients
                $mail->setFrom("absoluteneos@gmail.com", 'Tester');
                $mail->addReplyTo($this->emailSender);
                $mail->addAddress('jojoisbizzare@gmail.com');               //Name is optional

                //Content
                $mail->isHTML(false);                                  //Set email format to HTML
                $mail->Subject = $this->emailHeader;
                $mail->Body    = $this->emailContent;
                $mail->AltBody = $this->emailContent;

                $mail->send();
                echo 'Message has been sent';
            } 
            
            catch (Exception $e) {
                echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
            }
        }
    }