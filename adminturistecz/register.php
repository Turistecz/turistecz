<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $email    = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // encriptar

    $username = htmlspecialchars(trim($_POST['username']));
    $email = filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL);
    $password = $_POST['password']; // lo hasheas después


    $sql = "INSERT INTO admins (nombre, correo, contrasena) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $username, $email, $password);

    if ($stmt->execute()) {
        echo " Registro exitoso. Ahora puedes iniciar sesión.";
    } else {
        echo " Error: " . $stmt->error;
    }
}
?>

<!-- Formulario HTML -->
<form method="POST" action="register.php">
    <input type="text" name="username" placeholder="Usuario" required><br>
    <input type="email" name="email" placeholder="Email" required><br>
    <input type="password" name="password" placeholder="Contraseña" required><br>
    <button type="submit">Registrarme</button>
</form>
