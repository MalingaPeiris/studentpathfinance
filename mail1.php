<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Collect form data
  $name = htmlspecialchars(trim($_POST['name']));
  $email = htmlspecialchars(trim($_POST['email']));
  $service = htmlspecialchars(trim($_POST['service']));
  $phone = htmlspecialchars(trim($_POST['phone']));
  $message = htmlspecialchars(trim($_POST['message']));

  // Set email details
  $to = "info@studentpathfinance.com"; // The email address where the form will be sent
  $subject = "New Contact Form Submission from $name";

  

  // Create email body
  $body = "
    <html>
    <head>
    <title>Contact Form Submission</title>
    </head>
    <body>
    <h2>Contact Form Details</h2>
    <p><strong>Name:</strong> $name</p>
    <p><strong>Email:</strong> $email</p>
    <p><strong>Phone:</strong> $phone</p>
    <p><strong>Service:</strong> $service</p>
    <p><strong>Message:</strong></p>
    <p>$message</p>
    </body>
    </html>
    ";

  // Set content-type for HTML email
  $headers = "MIME-Version: 1.0" . "\r\n";
  $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

  // Additional headers
  $headers .= "From: deadsnake404@gmail.com";
  $headers .= "Reply-To: $email" . "\r\n";

  mail($to, $subject, $body, $headers);

  // Send email
  if (mail($to, $subject, $body, $headers)) {
    // Success message
    echo "Message sent successfully!";
  } else {
    // Error message
    echo "Failed to send message. Please try again.";
  }
}
?>