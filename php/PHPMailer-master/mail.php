<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/vendor/autoload.php';

// 1️⃣ Validate email
if (!isset($_POST['email']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    exit('Invalid email address');
}

$email = $_POST['email'];

// 2️⃣ (Optional) Save email to database or file
file_put_contents('subscribers.txt', $email . PHP_EOL, FILE_APPEND);

// 3️⃣ Create PHPMailer instance
$mail = new PHPMailer(true);

try {
    // SMTP settings
    $mail->isSMTP();
    $mail->Host       = 'smtp.example.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'newsletter@example.com';
    $mail->Password   = 'EMAIL_PASSWORD';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // Sender & recipient
    $mail->setFrom('newsletter@example.com', 'My Newsletter');
    $mail->addAddress($email);

    // Email content
    $mail->isHTML(true);
    $mail->Subject = 'Welcome to our Newsletter!';
    $mail->Body = '
        <h2>Thank you for subscribing!</h2>
        <p>You will now receive our latest updates.</p>
        <p>If you did not subscribe, you can ignore this email.</p>
    ';
    $mail->AltBody = 'Thank you for subscribing to our newsletter!';

    $mail->send();
    echo 'Subscription successful. Please check your email.';

} catch (Exception $e) {
    echo 'Mailer Error: ' . $mail->ErrorInfo;
}
