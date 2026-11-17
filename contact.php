<?php
/**
 * OSP Contractors — contact form handler.
 * Receives a POST from contact.html (via fetch) and emails it to the company.
 * Returns JSON: {"ok":true} or {"ok":false,"error":"..."}.
 *
 * Compatible with PHP 5.4 and newer (the hosting currently runs PHP 5.4).
 *
 * CONFIG: edit these two addresses if needed.
 *  - $to   : where messages are delivered
 *  - $from : must be an address on the website's own domain (the SPF record of
 *            osp-contractors.gr already authorises this server)
 */
$to   = 'info@osp-contractors.gr';
$from = 'no-reply@osp-contractors.gr';

header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store');

function respond($status, $ok, $error = '') {
    http_response_code($status);
    if ($ok) {
        echo json_encode(array('ok' => true));
    } else {
        echo json_encode(array('ok' => false, 'error' => $error));
    }
    exit;
}

// Read a POST value as a string ('' if missing or not a string).
function post_value($key) {
    if (!isset($_POST[$key]) || !is_string($_POST[$key])) {
        return '';
    }
    return $_POST[$key];
}

// Multibyte-safe substring (falls back to substr if mbstring is missing).
function cut($v, $max) {
    if (function_exists('mb_substr')) {
        return mb_substr($v, 0, $max, 'UTF-8');
    }
    return substr($v, 0, $max);
}

// Strip CR/LF so values can never inject extra mail headers.
function clean_line($v, $max) {
    $v = preg_replace('/[\r\n\t]+/', ' ', $v);
    return trim(cut($v, $max));
}

$method = isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : '';
if ($method !== 'POST') {
    respond(405, false, 'method');
}

// Honeypot: real users never see or fill this field. Pretend success to bots.
if (post_value('website') !== '') {
    respond(200, true);
}

$name    = clean_line(post_value('name'), 120);
$email   = clean_line(post_value('email'), 200);
$subject = clean_line(post_value('subject'), 200);
$message = trim(cut(post_value('message'), 5000));
$agreed  = post_value('agreement') !== '';

if ($name === '' || $subject === '' || $message === '' || !$agreed
    || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, false, 'validation');
}

$body  = "Νέο μήνυμα από τη φόρμα επικοινωνίας του osp-contractors.gr\n";
$body .= "------------------------------------------------------------\n";
$body .= "Όνομα:  $name\n";
$body .= "Email:  $email\n";
$body .= "Θέμα:   $subject\n\n";
$body .= $message . "\n\n";
$body .= "------------------------------------------------------------\n";
$body .= "Ο αποστολέας δήλωσε ότι διάβασε την Πολιτική Απορρήτου.\n";

$headers = array(
    'From: OSP Contractors website <' . $from . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: PHP/' . phpversion(),
);

$encodedSubject = '=?UTF-8?B?' . base64_encode('[osp-contractors.gr] ' . $subject) . '?=';

// The 5th argument sets the envelope sender, which improves deliverability.
$sent = @mail($to, $encodedSubject, $body, implode("\r\n", $headers), '-f' . $from);

if (!$sent) {
    error_log('contact.php: mail() failed');
    respond(500, false, 'send');
}

respond(200, true);
