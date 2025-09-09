<?php
session_start();
if (!isset($_SESSION['user'])) {
    header("Location: login.php");
    exit();
}
?>
<h1>Hola, <?php echo htmlspecialchars($_SESSION['user']); ?> 👋</h1>
<a href="logout.php">Cerrar sesión</a>

