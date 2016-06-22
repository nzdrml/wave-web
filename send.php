<?php
if($_POST){
    $name = $_POST['cName'];
    $email = $_POST['cMail'];
    $message = $_POST['cMess'];

//send email
    mail("livingbetweenrainbows@gmail.com", "Wave Query",$email, $message);
}
?>