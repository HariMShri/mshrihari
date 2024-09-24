<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize input data
    $name = htmlspecialchars(trim($_POST['name']));
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars(trim($_POST['phone']));
    $subject = htmlspecialchars(trim($_POST['subject']));
    $message = htmlspecialchars(trim($_POST['message']));
    
    // Validate required fields
    if (empty($name) || empty($email) || empty($phone) || empty($subject) || empty($message)) {
        echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
        exit;
    }
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid email address.']);
        exit;
    }
    
    // Prepare email content (Optional: Add more headers and sanitation for email body)
    $to = "your-email@example.com"; // Replace with your email address
    $headers = "From: $email\r\n";
    $subject = "Contact Form: $subject";
    $body = "Name: $name\nEmail: $email\nPhone: $phone\n\nMessage:\n$message";
    
    // Attempt to send the email
    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(['status' => 'success', 'message' => 'Thank you! Your message has been sent.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Oops! Something went wrong, try again later.']);
    }
}
?>
