<?php
/**
 * HealthSync Medical Solutions Corporation
 * SMTP Configuration File
 *
 * ⚠️  IMPORTANT: Never commit this file to version control (git).
 *     Add config.php to your .gitignore file.
 *     For Hostinger deployment, update SMTP credentials to your live SMTP account.
 */

// ─────────────────────────────────────────────
//  SMTP SENDER CREDENTIALS
//  Use a Gmail App Password (NOT your regular Gmail password).
//  Steps to generate App Password:
//    1. Go to Google Account → Security
//    2. Enable 2-Factor Authentication
//    3. Search "App passwords" → create one for "Mail"
//    4. Paste the 16-character app password below.
// ─────────────────────────────────────────────
define('SMTP_HOST',       'smtp.gmail.com');
define('SMTP_PORT',       587);                          // TLS port
define('SMTP_ENCRYPTION', 'tls');                        // 'tls' or 'ssl'
define('SMTP_USERNAME',   'healthsync.med@gmail.com');   // Gmail account used to send
define('SMTP_PASSWORD',   'YOUR_APP_PASSWORD_HERE');     // 16-char App Password (no spaces)
define('SMTP_FROM_NAME',  'HealthSync Medical Solutions Corporation');

// ─────────────────────────────────────────────
//  DEPARTMENT EMAIL ROUTING
//  Maps dropdown value → recipient email address
// ─────────────────────────────────────────────
define('DEPARTMENT_EMAILS', [
    'quotation' => [
        'label' => 'Quotation / Official Inquiry',
        'email' => 'healthsync.med@gmail.com',
    ],
    'hr' => [
        'label' => 'Human Resources (Careers)',
        'email' => 'jewellvictorio@gmail.com',
    ],
    'sales' => [
        'label' => 'Sales (Products)',
        'email' => 'zedmhart@gmail.com',
    ],
]);

// ─────────────────────────────────────────────
//  SECURITY SETTINGS
// ─────────────────────────────────────────────
define('RATE_LIMIT_SECONDS', 60);   // Minimum seconds between submissions per IP
define('MAX_FIELD_LENGTH',   2000); // Maximum characters per text field
