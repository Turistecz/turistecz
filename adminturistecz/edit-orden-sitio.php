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

$sql = "SELECT sr.id, sr.id_ruta, sr.id_sitio, sr.orden, s.nombre, sr.texto 
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

// --- 2) Procesar formulario (mejorado con swap + validación de duplicados) ---
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nuevo_orden = intval($_POST['orden']);
    $orden_actual = $registro['orden'];
    $textoSitio = $_POST['textoSitio'];

    $conn1->begin_transaction();

    try {
        // 1) Comprobamos si el orden ya existe en esta ruta
        $check = $conn1->prepare("SELECT id FROM sitios_ruta WHERE id_ruta = ? AND orden = ? AND id <> ?");
        $check->bind_param("iii", $id_ruta, $nuevo_orden, $id);
        $check->execute();
        $result_check = $check->get_result();

        if ($result_check->num_rows > 0) {
            // Si existe, intercambiamos orden (swap)
            $row_swap = $result_check->fetch_assoc();
            $id_swap = $row_swap['id'];


            $swap_stmt = $conn1->prepare("UPDATE sitios_ruta SET orden = ? WHERE id = ? ");
            $swap_stmt->bind_param("ii", $orden_actual, $id_swap);
            $swap_stmt->execute();
        }

        // Actualizamos el sitio actual
        $update = $conn1->prepare("UPDATE sitios_ruta SET orden = ? , texto = ? WHERE id = ?");
        var_dump($textoSitio);
        $update->bind_param("isi", $nuevo_orden, $textoSitio, $id);
        $update->execute();

        // Comprobamos si la actualización violó la restricción única
        if ($conn1->errno === 1062) { // 1062 = error de clave duplicada
            throw new Exception("Ya existe otro sitio con el mismo orden en esta ruta.");
        }

        $conn1->commit();

        header("Location: edit-ruta.php?id={$registro['id_ruta']}&msg=orden_actualizado");
        exit();

    } catch (Exception $e) {
        $conn1->rollback();
        echo "<div class='alert alert-danger text-center'>⚠️ Error: " . htmlspecialchars($e->getMessage()) . "</div>";
    }
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
                <div class="mb-3">
                    <label class="form-label">Texto del Sitio</label>
                    <input type="text" name="textoSitio" class="form-control" value="<?= $registro['texto'] ?>" required>
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
