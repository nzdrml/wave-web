<?php

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

if(!empty($request)){
    require_once 'php/swiftmailer/lib/swift_required.php';

    $message = "<h1>{$request->name} <{$request->mail}></h1>";
    $message = "<h3>{$request->mail}</h3>";
    $message .= "<p>{$request->mess}</p>";

    $transport = Swift_MailTransport::newInstance();
    $mailer = Swift_Mailer::newInstance($transport);
    $message = Swift_Message::newInstance('Ride Wave Contact Form')
        ->setFrom(array('admin@ridewave.co' => 'Admin'))
        ->setTo(array('mark5cinco92@gmail.com', 'info.ridewave@gmail.com' => 'Admin'))
        ->setBody($message, 'text/html');

    $result = $mailer->send($message);

    echo json_encode(["code" => $result]);
}else{
    echo json_encode(["code" => 0, "post" => $postdata]);
}

