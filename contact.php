<?php
/**
 * OSP Contractors — contact form handler.
 * Receives a POST from contact.html (via fetch) and emails it to the company.
 * Returns JSON: {"ok":true} or {"ok":false,"error":"..."}.
 *
 * CONFIG: edit these two addresses if needed.
 *  - $to   : where messages are delivered
 *  - $from : must be an address on the website's own domain (anti-spam rules
 *            on the hosting reject or junk mail sent "from" other domains)
 */
$to   = 'info@osp-contractors.gr';
$from = 'no-reply@osp-contractors.gr';

header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store');

function respond(int $status, bool $ok, string $error = ''): void {
    http_response_code($status);
    echo json_encode($ok ? ['ok' => true] : ['ok' => false, 'error' => $error]);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, false, 'method');
}

// Honeypot: real users never see or fill this field. Pretend success to bots.
if (!empty($_POST['website'] ?? '')) {
    respond(200, true);
}

// Strip CR/LF so values can never inject extra mail headers.
function clean_line(string $v, int $max): string {
    $v = preg_replace('/[\r\n\t]+/', ' ', $v);
    return trim(mb_substr($v, 0, $max, 'UTF-8'));
}

$name    = clean_line((string)($_POST['name'] ?? ''), 120);
$email   = clean_line((string)($_POST['email'] ?? ''), 200);
$subject = clean_line((string)($_POST['subject'] ?? ''), 200);
$message = trim(mb_substr((string)($_POST['message'] ?? ''), 0, 5000, 'UTF-8'));
$agreed  = !empty($_POST['agreement']);

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

$headers = [
    'From: OSP Contractors website <' . $from . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: PHP/' . phpversion(),
];

$encodedSubject = '=?UTF-8?B?' . base64_encode('[osp-contractors.gr] ' . $subject) . '?=';

// The 5th argument sets the envelope sender, which improves deliverability.
$sent = @mail($to, $encodedSubject, $body, implode("\r\n", $headers), '-f' . $from);

if (!$sent) {
    error_log('contact.php: mail() failed');
    respond(500, false, 'send');
}

respond(200, true);
