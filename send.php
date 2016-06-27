<?php
if($_POST){
    $name = $_POST['cName'];
    $email = $_POST['cMail'];
    $message = $_POST['cMess'];
	
	$message2 = <<<EMAIL
	
	Name of Customer $name
	
	Email of customer $email
	
	Message
	$message

EMAIL;

//send email
    mail("info.ridewave@gmail.com", "Wave Query",$message2,$email);
}
?>