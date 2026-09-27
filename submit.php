<?php

$name = $_POST['name'];
$email = $_POST['email'];
$whatsapp = $_POST['whatsapp'];

$package = $_POST['package'];
$guests = $_POST['guests'];

$date = $_POST['date'];
$message = $_POST['message'];


// =======================
// SIMPAN DATABASE
// =======================

// nanti bisa diganti Google Sheet / MySQL


// =======================
// WHATSAPP MESSAGE
// =======================


$admin_number = "6287787066982";


$text = "

🔔 NEW TOUR INQUIRY

Name:
$name

Email:
$email

WhatsApp:
$whatsapp

Package:
$package

Guests:
$guests people

Preferred Date:
$date

Message:
$message

";


$url = 
"https://wa.me/"
.$admin_number
."?text="
.urlencode($text);


// redirect ke WhatsApp

header("Location: ".$url);

exit;


?>