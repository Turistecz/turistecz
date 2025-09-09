<?php
$host = "localhost";
$user = "root"; // el usuario por defecto en XAMPP
$pass = "";     // en XAMPP normalmente no hay contraseña
$db   = "adminturistecz";

$conn = new mysqli($host, $user, $pass, $db, 3307);

$host1 = "localhost" ; 
$user1 = "rooteador" ;
$pass1 = "msTrky2obX1TpYc";
$db1 = "turistecz";

$conn1 = new mysqli($host1, $user1, $pass1, $db1);

    // Verificar conexión
    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }
    if ($conn1->connect_error) {
        die("Conexión BD2 fallida: " . $conn1->connect_error);
    }
echo "Conexión exitosa"; 
?>

    
