# HealthSync Contact Form — PHP Mailer System

A production-ready Get-Quote / Contact form for **HealthSync Medical Solutions Corporation**.
Sends emails via **PHPMailer + Gmail SMTP** and routes messages to the correct department automatically.

---

## 📁 Files

```
php-mailer/
├── index.html      ← The beautiful contact form (standalone HTML)
├── send.php        ← PHP handler (validation + SMTP send)
├── config.php      ← SMTP credentials & department routing
├── composer.json   ← PHPMailer dependency
└── README.md       ← This file
```

---

## ⚙️ Setup on XAMPP (Localhost)

### Step 1 — Copy files to XAMPP

Copy the entire `php-mailer/` folder into your XAMPP `htdocs` directory:

```
C:\xampp\htdocs\healthsync\
```

### Step 2 — Install PHPMailer via Composer

1. Download **Composer** from https://getcomposer.org/download/ (Windows installer)
2. Open **Command Prompt** in `C:\xampp\htdocs\healthsync\`
3. Run:

```bash
composer install
```

This will create a `vendor/` folder with PHPMailer inside.

> **No Composer?** Manually download PHPMailer:
> - Go to https://github.com/PHPMailer/PHPMailer/releases
> - Download the latest release ZIP
> - Extract it and rename the folder to `PHPMailer`
> - Place it inside `C:\xampp\htdocs\healthsync\`
> - The `send.php` file will automatically fall back to manual includes.

### Step 3 — Configure Gmail SMTP

1. Open `config.php`
2. Replace `YOUR_APP_PASSWORD_HERE` with your **Gmail App Password**:

**How to get a Gmail App Password:**
- Go to https://myaccount.google.com/security
- Enable **2-Step Verification** (required)
- Search for **"App passwords"**
- Select app: **Mail** → Select device: **Other** → name it "HealthSync"
- Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)
- Paste it **without spaces** into `config.php`

```php
define('SMTP_PASSWORD', 'abcdefghijklmnop'); // No spaces
```

### Step 4 — Start XAMPP

1. Open **XAMPP Control Panel**
2. Start **Apache**
3. Open your browser and go to:

```
http://localhost/healthsync/index.html
```

### Step 5 — Test the form

Fill in all fields and click **Send Message**. You should receive the email at the selected department address.

---

## 🚀 Deploying to Hostinger

### Step 1 — Upload files

- Log in to Hostinger → **File Manager** → `public_html/`
- Upload the entire `php-mailer/` folder contents to `public_html/contact/` (or your preferred path)

### Step 2 — Install PHPMailer on Hostinger

Hostinger supports **SSH** (Business plan and above):

```bash
cd ~/public_html/contact
composer install --no-dev
```

Or upload the locally-generated `vendor/` folder directly via File Manager.

### Step 3 — Update CORS origin in `send.php`

Open `send.php` and update the allowed origins array:

```php
$allowed_origins = [
    'https://yourdomain.com',       // ← Replace with your real domain
    'https://www.yourdomain.com',
];
```

### Step 4 — Update form action in your Next.js app

In your Next.js `contact/page.tsx`, change the fetch URL from:

```js
fetch('http://localhost/healthsync/send.php', ...)
```

to:

```js
fetch('https://yourdomain.com/contact/send.php', ...)
```

---

## 📧 Department Routing

| Department Selected        | Email Recipient                    |
|----------------------------|------------------------------------|
| Quotation / Official       | healthsync.med@gmail.com           |
| Human Resources (Careers)  | jsiochi.heathsync@gmail.com        |
| Sales (Products)           | healthsyncmest@gmail.com           |

---

## 🔒 Security Features

| Feature                    | Details                                     |
|----------------------------|---------------------------------------------|
| **Honeypot field**         | Hidden field; bots fill it in → silent drop |
| **Rate limiting**          | 60 seconds between submissions per IP       |
| **Input sanitization**     | `htmlspecialchars` + `strip_tags` on all inputs |
| **Email validation**       | PHP `FILTER_VALIDATE_EMAIL` + JS regex      |
| **Max field length**       | 2,000 chars for message, 100 for name       |
| **CORS restriction**       | Only allows your specific domain(s)         |
| **Error logging**          | SMTP errors logged server-side, not exposed to client |

---

## ❓ Troubleshooting

**Email not sending on localhost?**
- Make sure your Gmail account has 2FA enabled
- Use an **App Password**, NOT your Gmail login password
- Check XAMPP Apache error logs: `C:\xampp\logs\error.log`

**"Could not send" error on live server?**
- Confirm `vendor/` folder was uploaded correctly
- Check Hostinger's PHP error log
- Make sure port 587 (SMTP TLS) is not blocked by Hostinger firewall

**Form submits but no email received?**
- Check your Gmail **Sent** folder — the email may have been sent but filtered
- Check the recipient's **Spam/Junk** folder

---

## 🔗 Integration with Next.js

To use this PHP backend from your Next.js contact page, update your `fetch` call in `contact/page.tsx`:

```javascript
const response = await fetch('http://localhost/healthsync/send.php', {
  method: 'POST',
  body: formData,  // FormData object
});
const data = await response.json();
```

The PHP handler returns JSON:

**Success:**
```json
{ "success": true, "message": "Your message has been sent successfully!" }
```

**Validation Error:**
```json
{
  "success": false,
  "message": "Please fill in all required fields.",
  "errors": {
    "full_name": "Full name is required.",
    "email": "Please enter a valid email address."
  }
}
```

---

*Built for HealthSync Medical Solutions Corporation · Production-ready · XAMPP + Hostinger compatible*
