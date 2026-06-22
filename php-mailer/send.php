<?php
/**
 * HealthSync Medical Solutions Corporation
 * Contact / Get-Quote Form Handler
 *
 * Handles form submission, validation, spam protection,
 * and sends email via PHPMailer + SMTP.
 *
 * Works on XAMPP (localhost) and Hostinger (live).
 */

declare(strict_types=1);

// ── Allow cross-origin requests from your Next.js front-end on localhost ──
$allowed_origins = [
    'http://localhost:9002',   // Next.js dev
    'http://localhost:3000',   // Alternative dev port
    'https://yourdomain.com',  // ← Replace with your live domain on Hostinger
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins, true)) {
    header("Access-Control-Allow-Origin: $origin");
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Handle CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

// ── Load config ───────────────────────────────────────────────────────────────
require_once __DIR__ . '/config.php';

// ── Load PHPMailer (via Composer autoload or manual include) ──────────────────
if (file_exists(__DIR__ . '/vendor/autoload.php')) {
    require_once __DIR__ . '/vendor/autoload.php';
} else {
    // Fallback: manual includes (for XAMPP without Composer)
    require_once __DIR__ . '/PHPMailer/src/Exception.php';
    require_once __DIR__ . '/PHPMailer/src/PHPMailer.php';
    require_once __DIR__ . '/PHPMailer/src/SMTP.php';
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// ── Helper: Send JSON response and exit ──────────────────────────────────────
function respond(bool $success, string $message, int $httpCode = 200): void
{
    http_response_code($httpCode);
    echo json_encode(['success' => $success, 'message' => $message]);
    exit;
}

// ── Helper: Sanitize string input ────────────────────────────────────────────
function clean(string $value): string
{
    return htmlspecialchars(strip_tags(trim($value)), ENT_QUOTES, 'UTF-8');
}

// ════════════════════════════════════════════════════════════════════════════
//  RATE LIMITING  (simple session-based, per IP)
// ════════════════════════════════════════════════════════════════════════════
session_start();

$ip_key = 'last_submit_' . md5($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0');
$now    = time();

if (isset($_SESSION[$ip_key]) && ($now - $_SESSION[$ip_key]) < RATE_LIMIT_SECONDS) {
    respond(false, 'Please wait a moment before submitting again.', 429);
}

// ════════════════════════════════════════════════════════════════════════════
//  HONEYPOT SPAM PROTECTION
//  The "website" field is hidden from real users. Bots fill it in.
// ════════════════════════════════════════════════════════════════════════════
$honeypot = $_POST['website'] ?? '';
if (!empty($honeypot)) {
    // Silently pretend success to confuse bots
    respond(true, 'Your message has been sent successfully!');
}

// ════════════════════════════════════════════════════════════════════════════
//  COLLECT & VALIDATE FORM DATA
// ════════════════════════════════════════════════════════════════════════════
$errors = [];

// Full Name
$full_name = clean($_POST['full_name'] ?? '');
if (empty($full_name)) {
    $errors['full_name'] = 'Full name is required.';
} elseif (mb_strlen($full_name) > 100) {
    $errors['full_name'] = 'Full name is too long.';
}

// Email Address
$email = clean($_POST['email'] ?? '');
if (empty($email)) {
    $errors['email'] = 'Email address is required.';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Please enter a valid email address.';
}

// Phone Number (optional)
$phone = clean($_POST['phone'] ?? '');
if (!empty($phone) && !preg_match('/^[\+\d\s\-\(\)]{7,20}$/', $phone)) {
    $errors['phone'] = 'Please enter a valid phone number.';
}

// Department
$department = clean($_POST['department'] ?? '');
$departments = DEPARTMENT_EMAILS;
if (empty($department) || !array_key_exists($department, $departments)) {
    $errors['department'] = 'Please select a valid department.';
}

// Message
$message_body = clean($_POST['message'] ?? '');
if (empty($message_body)) {
    $errors['message'] = 'Message is required.';
} elseif (mb_strlen($message_body) > MAX_FIELD_LENGTH) {
    $errors['message'] = 'Message is too long (max ' . MAX_FIELD_LENGTH . ' characters).';
}

// Return validation errors
if (!empty($errors)) {
    http_response_code(422);
    echo json_encode([
        'success'  => false,
        'message'  => 'Please fill in all required fields.',
        'errors'   => $errors,
    ]);
    exit;
}

// ════════════════════════════════════════════════════════════════════════════
//  DETERMINE RECIPIENT
// ════════════════════════════════════════════════════════════════════════════
$dept_info      = $departments[$department];
$to_email       = $dept_info['email'];
$dept_label     = $dept_info['label'];

// ════════════════════════════════════════════════════════════════════════════
//  BUILD EMAIL BODY (HTML)
// ════════════════════════════════════════════════════════════════════════════
$submitted_at = date('F j, Y \a\t g:i A T');

$html_body = <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Inquiry — HealthSync</title>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6f9; margin: 0; padding: 20px; }
    .wrapper { max-width: 600px; margin: 0 auto; }
    .header {
      background: linear-gradient(135deg, #0a4f8c 0%, #1a7fc1 100%);
      border-radius: 12px 12px 0 0;
      padding: 32px 36px;
      text-align: center;
    }
    .header h1 { color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 0.3px; }
    .header p  { color: #b8d9f5; margin: 6px 0 0; font-size: 13px; }
    .badge {
      display: inline-block;
      background: #e8f4fe;
      color: #0a4f8c;
      font-size: 12px;
      font-weight: 700;
      padding: 4px 14px;
      border-radius: 20px;
      margin-bottom: 20px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .card { background: #ffffff; border-radius: 0 0 12px 12px; padding: 36px; box-shadow: 0 4px 24px rgba(0,0,0,0.07); }
    .field { margin-bottom: 20px; }
    .field-label { font-size: 11px; font-weight: 700; color: #6b7a8d; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 4px; }
    .field-value { font-size: 15px; color: #1a2b3c; padding: 12px 16px; background: #f7f9fc; border-radius: 8px; border-left: 3px solid #1a7fc1; word-break: break-word; }
    .message-box { background: #f7f9fc; border-radius: 8px; padding: 16px; border-left: 3px solid #1a7fc1; white-space: pre-wrap; font-size: 15px; color: #1a2b3c; line-height: 1.6; }
    .divider { height: 1px; background: #e8eef4; margin: 24px 0; }
    .footer { text-align: center; font-size: 12px; color: #9aa5b1; padding-top: 24px; }
    .dept-tag { display: inline-block; background: #1a7fc1; color: white; padding: 5px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>HealthSync Medical Solutions Corporation</h1>
      <p>New Inquiry Received via Website</p>
    </div>
    <div class="card">
      <div style="text-align:center; margin-bottom: 24px;">
        <span class="dept-tag">$dept_label</span>
      </div>

      <div class="field">
        <div class="field-label">Full Name</div>
        <div class="field-value">$full_name</div>
      </div>

      <div class="field">
        <div class="field-label">Email Address</div>
        <div class="field-value"><a href="mailto:$email" style="color:#1a7fc1;text-decoration:none;">$email</a></div>
      </div>

      <div class="field">
        <div class="field-label">Phone Number</div>
        <div class="field-value">{$phone_display}</div>
      </div>

      <div class="divider"></div>

      <div class="field">
        <div class="field-label">Message</div>
        <div class="message-box">$message_body</div>
      </div>

      <div class="divider"></div>
      <div class="footer">
        <p>Submitted on <strong>$submitted_at</strong></p>
        <p>This message was sent through the HealthSync website contact form.</p>
        <p style="color:#c0392b; font-size:11px;">Reply directly to this email to respond to the sender.</p>
      </div>
    </div>
  </div>
</body>
</html>
HTML;

// Inject phone display (empty phone shows "Not provided")
$phone_display = !empty($phone) ? $phone : '<em style="color:#9aa5b1;">Not provided</em>';
$html_body = str_replace('{$phone_display}', $phone_display, $html_body);

// ════════════════════════════════════════════════════════════════════════════
//  SEND EMAIL via PHPMailer
// ════════════════════════════════════════════════════════════════════════════
try {
    $mail = new PHPMailer(true);

    // ── Server Settings ──
    $mail->isSMTP();
    $mail->Host       = SMTP_HOST;
    $mail->SMTPAuth   = true;
    $mail->Username   = SMTP_USERNAME;
    $mail->Password   = SMTP_PASSWORD;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = SMTP_PORT;
    $mail->CharSet    = 'UTF-8';

    // ── Disable debug output in production ──
    $mail->SMTPDebug = SMTP::DEBUG_OFF;

    // ── From / Reply-To ──
    $mail->setFrom(SMTP_USERNAME, SMTP_FROM_NAME);
    $mail->addReplyTo($email, $full_name);   // Reply goes directly to sender

    // ── Recipient (routed by department) ──
    $mail->addAddress($to_email, $dept_label);

    // ── Content ──
    $mail->isHTML(true);
    $mail->Subject = "[$dept_label] New Inquiry from $full_name — HealthSync Website";
    $mail->Body    = $html_body;
    $mail->AltBody = "New inquiry from: $full_name\nEmail: $email\nPhone: $phone\nDepartment: $dept_label\n\nMessage:\n$message_body\n\nSubmitted: $submitted_at";

    $mail->send();

    // ── Record submission time for rate limiting ──
    $_SESSION[$ip_key] = $now;

    respond(true, 'Your message has been sent successfully! We will get back to you within 1–2 business days.');

} catch (Exception $e) {
    // Log the real error server-side, send a generic message to the client
    error_log('[HealthSync Mailer Error] ' . $mail->ErrorInfo . ' | IP: ' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'));
    respond(false, 'Sorry, we could not send your message right now. Please try again later or contact us directly.', 500);
}
