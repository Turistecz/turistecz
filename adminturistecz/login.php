<?php
include 'db.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $correo = $_POST['correo'];
    $contrasena = $_POST['contrasena'];
    
    $correo = filter_var(trim($_POST['correo']), FILTER_VALIDATE_EMAIL);
    $contrasena = htmlspecialchars(trim($_POST['contrasena']));

    $sql = "SELECT * FROM admins WHERE correo = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $correo);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        if (password_verify($contrasena, $row['contrasena'])) {
            session_regenerate_id(true);
            $_SESSION['user'] = $row['correo'];
            echo " Bienvenido, " . $_SESSION['user'];
        } else {
            echo " Contraseña incorrecta.";
        }
    } else {
        echo " Usuario no encontrado.";
    }

}
?>

<!-- Formulario HTML -->
<form method="POST" action="login.php">
    <input type="email" name="correo" placeholder="Correo" required><br>
    <input type="password" name="contrasena" placeholder="Contraseña" required><br>
    <button type="submit">Iniciar sesión</button>       
</form>
