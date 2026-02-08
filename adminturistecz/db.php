<?php

// Lee variable de entorno y aplica default si no existe
function env_or_default(string $key, string $default = ''): string {
    $val = getenv($key);
    return ($val === false || $val === '') ? $default : $val;
}

/**
 * Conexión 1: Admin DB  -> $conn
 */
$adminHost = env_or_default('ADMIN_DB_HOST', '127.0.0.1');
$adminPort = env_or_default('ADMIN_DB_PORT', '3306');
$adminDb   = env_or_default('ADMIN_DB_NAME', 'adminturistecz');
$adminUser = env_or_default('ADMIN_DB_USER', 'root');
$adminPass = env_or_default('ADMIN_DB_PASS', '');

$conn = new mysqli($adminHost, $adminUser, $adminPass, $adminDb, (int)$adminPort);

if ($conn->connect_error) {
    die("Error conexión Admin DB: " . $conn->connect_error);
}

/**
 * Conexión 2: App DB -> $conn1
 */
$appHost = env_or_default('APP_DB_HOST', '127.0.0.1');
$appPort = env_or_default('APP_DB_PORT', '3306');
$appDb   = env_or_default('APP_DB_NAME', 'turistecz');
$appUser = env_or_default('APP_DB_USER', 'root');
$appPass = env_or_default('APP_DB_PASS', '');

$conn1 = new mysqli($appHost, $appUser, $appPass, $appDb, (int)$appPort);

if ($conn1->connect_error) {
    die("Error conexión App DB: " . $conn1->connect_error);
}