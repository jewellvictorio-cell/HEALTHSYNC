// src/app/api/contact/emailTemplate.ts

// Logo hosted on Vercel — accessible in emails
const LOGO_URL = "https://healthsyncmsc.vercel.app/images/logo.png";

function emailHeader(badgeText: string, bgGradient: string) {
  return (
    `<div class="header" style="background:${bgGradient};color:#ffffff;padding:28px 24px;text-align:center;">` +
    `<table cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;"><tr>` +
    `<td style="vertical-align:middle;padding-right:12px;">` +
    `<img src="${LOGO_URL}" alt="Logo" width="40" height="40" style="display:block;width:40px;height:40px;border-radius:6px;object-fit:contain;background:rgba(255,255,255,0.1);" />` +
    `</td>` +
    `<td style="vertical-align:middle;text-align:left;">` +
    `<h1 style="margin:0;font-size:20px;font-weight:800;letter-spacing:0.5px;color:#ffffff;line-height:1.2;">Healthsync Medical Solutions Corporation</h1>` +
    `</td></tr></table>` +
    `<span class="badge">${badgeText}</span>` +
    `</div>`
  );
}

function emailFooter(year: number) {
  return `<div class="footer" style="background-color:#f0f3f5;color:#999;text-align:center;padding:16px;font-size:11px;">&copy; ${year} Healthsync Medical Solutions Corporation. All rights reserved.</div>`;
}

/**
 * Generates an HTML email template for a quote request.
 */
export function generateQuoteEmailTemplate(data: {
  full_name: string;
  email: string;
  phone: string;
  department: string;
  message: string;
}) {
  const { full_name, email, phone, department, message } = data;
  const title = "New Quote Request \u2013 " + department;
  const year = new Date().getFullYear();
  return "<!DOCTYPE html>" +
"<html lang=\"en\">" +
"<head>" +
"  <meta charset=\"UTF-8\" />" +
"  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />" +
"  <title>" + title + "</title>" +
"  <style>" +
"    body { font-family: Arial, Helvetica, sans-serif; background-color: #f4f7f9; margin: 0; padding: 20px; }" +
"    .container { max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }" +
"    .header h1 { margin: 0; font-size: 20px; letter-spacing: 0.5px; }" +
"    .badge { display: inline-block; background: rgba(255,255,255,0.2); color: #fff; padding: 4px 12px; border-radius: 12px; font-size: 11px; margin-top: 12px; text-transform: uppercase; letter-spacing: 1px; }" +
"    .content { padding: 24px; color: #333333; line-height: 1.6; }" +
"    .content h2 { margin-top: 0; color: #004e8a; font-size: 18px; border-bottom: 2px solid #e8eef3; padding-bottom: 8px; }" +
"    .field-row { padding: 8px 0; border-bottom: 1px solid #f0f3f5; }" +
"    .field-label { font-weight: 600; color: #004e8a; }" +
"    .message-box { background: #f9fafb; border-left: 4px solid #004e8a; padding: 12px 16px; margin-top: 16px; border-radius: 0 4px 4px 0; }" +
"  </style>" +
"</head>" +
"<body>" +
"  <div class=\"container\">" +
"    " + emailHeader("Quote Request", "linear-gradient(135deg, #004e8a, #0073c2)") +
"    <div class=\"content\">" +
"      <h2>" + title + "</h2>" +
"      <div class=\"field-row\"><span class=\"field-label\">Name:</span> " + full_name + "</div>" +
"      <div class=\"field-row\"><span class=\"field-label\">Email:</span> " + email + "</div>" +
"      <div class=\"field-row\"><span class=\"field-label\">Phone:</span> " + phone + "</div>" +
"      <div class=\"field-row\"><span class=\"field-label\">Department:</span> " + department + "</div>" +
"      <div class=\"message-box\"><p>" + message.replace(/\n/g, "<br/>") + "</p></div>" +
"    </div>" +
"    " + emailFooter(year) +
"  </div>" +
"</body>" +
"</html>";
}

/**
 * Generates an HTML email template for a career application.
 */
export function generateCareerEmailTemplate(data: {
  full_name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  message: string;
}) {
  const { full_name, email, phone, department, position, message } = data;
  const title = "New Career Application \u2013 " + position;
  const year = new Date().getFullYear();
  const msgHtml = message ? message.replace(/\n/g, "<br/>") : "<em>No additional message provided.</em>";
  return "<!DOCTYPE html>" +
"<html lang=\"en\">" +
"<head>" +
"  <meta charset=\"UTF-8\" />" +
"  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />" +
"  <title>" + title + "</title>" +
"  <style>" +
"    body { font-family: Arial, Helvetica, sans-serif; background-color: #f4f7f9; margin: 0; padding: 20px; }" +
"    .container { max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }" +
"    .header h1 { margin: 0; font-size: 20px; letter-spacing: 0.5px; }" +
"    .badge { display: inline-block; background: rgba(255,255,255,0.2); color: #fff; padding: 4px 12px; border-radius: 12px; font-size: 11px; margin-top: 12px; text-transform: uppercase; letter-spacing: 1px; }" +
"    .content { padding: 24px; color: #333333; line-height: 1.6; }" +
"    .content h2 { margin-top: 0; color: #1a6b3c; font-size: 18px; border-bottom: 2px solid #e8eef3; padding-bottom: 8px; }" +
"    .field-row { padding: 8px 0; border-bottom: 1px solid #f0f3f5; }" +
"    .field-label { font-weight: 600; color: #1a6b3c; }" +
"    .message-box { background: #f9fafb; border-left: 4px solid #1a6b3c; padding: 12px 16px; margin-top: 16px; border-radius: 0 4px 4px 0; }" +
"    .resume-note { background: #fff3cd; border: 1px solid #ffc107; padding: 10px 14px; border-radius: 6px; margin-top: 16px; font-size: 13px; color: #856404; }" +
"  </style>" +
"</head>" +
"<body>" +
"  <div class=\"container\">" +
"    " + emailHeader("Career Application", "linear-gradient(135deg, #1a6b3c, #28a745)") +
"    <div class=\"content\">" +
"      <h2>" + title + "</h2>" +
"      <div class=\"field-row\"><span class=\"field-label\">Name:</span> " + full_name + "</div>" +
"      <div class=\"field-row\"><span class=\"field-label\">Email:</span> " + email + "</div>" +
"      <div class=\"field-row\"><span class=\"field-label\">Phone:</span> " + phone + "</div>" +
"      <div class=\"field-row\"><span class=\"field-label\">Department:</span> " + department + "</div>" +
"      <div class=\"field-row\"><span class=\"field-label\">Position:</span> " + position + "</div>" +
"      <div class=\"message-box\"><p>" + msgHtml + "</p></div>" +
"      <div class=\"resume-note\">&#128206; Please check the attachment for the applicant&#39;s resume/CV.</div>" +
"    </div>" +
"    " + emailFooter(year) +
"  </div>" +
"</body>" +
"</html>";
}

/**
 * Generates an HTML email template for a product inquiry.
 */
export function generateProductInquiryTemplate(data: {
  full_name: string;
  email: string;
  phone: string;
  product: string;
  message: string;
}) {
  const { full_name, email, phone, product, message } = data;
  const title = "Product Inquiry \u2013 " + product;
  const year = new Date().getFullYear();
  return "<!DOCTYPE html>" +
"<html lang=\"en\">" +
"<head>" +
"  <meta charset=\"UTF-8\" />" +
"  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />" +
"  <title>" + title + "</title>" +
"  <style>" +
"    body { font-family: Arial, Helvetica, sans-serif; background-color: #f4f7f9; margin: 0; padding: 20px; }" +
"    .container { max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }" +
"    .header h1 { margin: 0; font-size: 20px; letter-spacing: 0.5px; }" +
"    .badge { display: inline-block; background: rgba(255,255,255,0.2); color: #fff; padding: 4px 12px; border-radius: 12px; font-size: 11px; margin-top: 12px; text-transform: uppercase; letter-spacing: 1px; }" +
"    .content { padding: 24px; color: #333333; line-height: 1.6; }" +
"    .content h2 { margin-top: 0; color: #7b2d8e; font-size: 18px; border-bottom: 2px solid #e8eef3; padding-bottom: 8px; }" +
"    .field-row { padding: 8px 0; border-bottom: 1px solid #f0f3f5; }" +
"    .field-label { font-weight: 600; color: #7b2d8e; }" +
"    .message-box { background: #f9fafb; border-left: 4px solid #7b2d8e; padding: 12px 16px; margin-top: 16px; border-radius: 0 4px 4px 0; }" +
"  </style>" +
"</head>" +
"<body>" +
"  <div class=\"container\">" +
"    " + emailHeader("Product Inquiry", "linear-gradient(135deg, #7b2d8e, #a855f7)") +
"    <div class=\"content\">" +
"      <h2>" + title + "</h2>" +
"      <div class=\"field-row\"><span class=\"field-label\">Name:</span> " + full_name + "</div>" +
"      <div class=\"field-row\"><span class=\"field-label\">Email:</span> " + email + "</div>" +
"      <div class=\"field-row\"><span class=\"field-label\">Phone:</span> " + phone + "</div>" +
"      <div class=\"field-row\"><span class=\"field-label\">Product:</span> " + product + "</div>" +
"      <div class=\"message-box\"><p>" + message.replace(/\n/g, "<br/>") + "</p></div>" +
"    </div>" +
"    " + emailFooter(year) +
"  </div>" +
"</body>" +
"</html>";
}

/**
 * Generates an HTML email template for an offer submission.
 */
export function generateOfferEmailTemplate(data: {
  full_name: string;
  email: string;
  phone: string;
  offer_details: string;
  message: string;
}) {
  const { full_name, email, phone, offer_details, message } = data;
  const title = "New Offer Submission";
  const year = new Date().getFullYear();
  return "<!DOCTYPE html>" +
"<html lang=\"en\">" +
"<head>" +
"  <meta charset=\"UTF-8\" />" +
"  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />" +
"  <title>" + title + "</title>" +
"  <style>" +
"    body { font-family: Arial, Helvetica, sans-serif; background-color: #f4f7f9; margin: 0; padding: 20px; }" +
"    .container { max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }" +
"    .header h1 { margin: 0; font-size: 20px; letter-spacing: 0.5px; }" +
"    .badge { display: inline-block; background: rgba(255,255,255,0.2); color: #fff; padding: 4px 12px; border-radius: 12px; font-size: 11px; margin-top: 12px; text-transform: uppercase; letter-spacing: 1px; }" +
"    .content { padding: 24px; color: #333333; line-height: 1.6; }" +
"    .content h2 { margin-top: 0; color: #b45309; font-size: 18px; border-bottom: 2px solid #e8eef3; padding-bottom: 8px; }" +
"    .field-row { padding: 8px 0; border-bottom: 1px solid #f0f3f5; }" +
"    .field-label { font-weight: 600; color: #b45309; }" +
"    .message-box { background: #f9fafb; border-left: 4px solid #b45309; padding: 12px 16px; margin-top: 16px; border-radius: 0 4px 4px 0; }" +
"  </style>" +
"</head>" +
"<body>" +
"  <div class=\"container\">" +
"    " + emailHeader("Offer Submission", "linear-gradient(135deg, #b45309, #f59e0b)") +
"    <div class=\"content\">" +
"      <h2>" + title + "</h2>" +
"      <div class=\"field-row\"><span class=\"field-label\">Name:</span> " + full_name + "</div>" +
"      <div class=\"field-row\"><span class=\"field-label\">Email:</span> " + email + "</div>" +
"      <div class=\"field-row\"><span class=\"field-label\">Phone:</span> " + phone + "</div>" +
"      <div class=\"field-row\"><span class=\"field-label\">Offer Details:</span> " + offer_details + "</div>" +
"      <div class=\"message-box\"><p>" + message.replace(/\n/g, "<br/>") + "</p></div>" +
"    </div>" +
"    " + emailFooter(year) +
"  </div>" +
"</body>" +
"</html>";
}
