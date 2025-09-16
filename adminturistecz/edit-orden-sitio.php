<?php
include 'db.php';
session_start();
if (!isset($_SESSION['user'])) { 
    header("Location: login.php");
    exit();
}

// --- 1) Obtener el registro de sitios_ruta ---
$id = intval($_GET['id']);       // ID del registro en sitios_ruta
$id_ruta = intval($_GET['id_ruta']);

$sql = "SELECT sr.id, sr.id_ruta, sr.id_sitio, sr.orden, s.nombre 
        FROM sitios_ruta sr 
        INNER JOIN sitio s ON sr.id_sitio = s.id
        WHERE sr.id = ?";
$stmt = $conn1->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();
$registro = $result->fetch_assoc();

if (!$registro) {
    die("Registro no encontrado");
}

// --- 2) Procesar formulario ---
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nuevo_orden = intval($_POST['orden']);
    $update = $conn1->prepare("UPDATE sitios_ruta SET orden = ? WHERE id = ?");
    $update->bind_param("ii", $nuevo_orden, $id);
    $update->execute();

    header("Location: edit-ruta.php?id={$registro['id_ruta']}");
    exit();
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Editar orden de sitio</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
<div class="container mt-5">
    <div class="card shadow-sm">
        <div class="card-header bg-warning">
            <strong>Editar orden de sitio</strong>
        </div>
        <div class="card-body">
            <form method="POST">
                <div class="mb-3">
                    <label class="form-label">Sitio</label>
                    <input type="text" class="form-control" value="<?= htmlspecialchars($registro['nombre']) ?>" disabled>
                </div>
                <div class="mb-3">
                    <label class="form-label">Orden</label>
                    <input type="number" name="orden" class="form-control" value="<?= $registro['orden'] ?>" min="1" required>
                </div>
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-save"></i> Guardar
                </button>
                <a href="edit-ruta.php?id=<?= $registro['id_ruta'] ?>" class="btn btn-secondary">
                    Cancelar
                </a>
            </form>
        </div>
    </div>
</div>
</body>
</html>
