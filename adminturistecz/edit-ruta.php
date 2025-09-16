<?php
include 'db.php';
session_start();
if (!isset($_SESSION['user'])) { header("Location: login.php"); exit(); }

$id = intval($_GET['id']);

// --- 1) Obtener datos de la ruta ---
$sql = "SELECT * FROM ruta WHERE id = ?";
$stmt = $conn1->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$ruta = $stmt->get_result()->fetch_assoc();
if (!$ruta) die("Ruta no encontrada");

// --- 2) Si se envía el formulario principal (campos de la ruta) ---
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['guardar_ruta'])) {
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $duracion = $_POST['duracion'];
    $imagen_destacada = $_POST['imagen_destacada'];
    $subtitulo = $_POST['subtitulo'];

    $update = $conn1->prepare("UPDATE ruta SET nombre=?, descripcion=?, duracion=?, imagen_destacada=?, subtitulo=? WHERE id=?");
    $update->bind_param("sssssi", $nombre, $descripcion, $duracion, $imagen_destacada, $subtitulo, $id);
    $update->execute();

    header("Location: edit-ruta.php?id=$id&msg=editado");
    exit();
}

// --- 3) Obtener sitios ya asociados a la ruta ---
$sql_sitios_ruta = "
    SELECT sr.id, sr.orden, s.nombre
    FROM sitios_ruta sr
    INNER JOIN sitio s ON sr.id_sitio = s.id
    WHERE sr.id_ruta = ?
    ORDER BY sr.orden ASC";
$stmt_sr = $conn1->prepare($sql_sitios_ruta);
$stmt_sr->bind_param("i", $id);
$stmt_sr->execute();
$sitios_ruta = $stmt_sr->get_result();

// --- 4) Obtener sitios disponibles para añadir ---
$sql_disponibles = "SELECT id, nombre FROM sitio WHERE id NOT IN (SELECT id_sitio FROM sitios_ruta WHERE id_ruta = ?)";
$stmt_disp = $conn1->prepare($sql_disponibles);
$stmt_disp->bind_param("i", $id);
$stmt_disp->execute();
$sitios_disponibles = $stmt_disp->get_result();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Editar Ruta</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script>
    function confirmarQuitar(id) {
        if (confirm("¿Quitar este sitio de la ruta?")) {
            window.location.href = "remove-sitio-ruta.php?id=" + id + "&id_ruta=<?= $id ?>";
        }
    }
    </script>
</head>
<body class="bg-light">
<div class="container mt-4">
    <h2><i class="fas fa-route"></i> Editar Ruta</h2>

    <?php if (isset($_GET['msg']) && $_GET['msg'] === 'editado'): ?>
        <div class="alert alert-success">Ruta actualizada correctamente</div>
    <?php endif; ?>

    <!-- FORMULARIO PARA EDITAR DATOS DE LA RUTA -->
    <form method="POST" class="card p-4 mb-4 shadow-sm">
        <input type="hidden" name="guardar_ruta" value="1">
        <div class="mb-3">
            <label class="form-label">Nombre</label>
            <input type="text" class="form-control" name="nombre" value="<?= htmlspecialchars($ruta['nombre']) ?>" required>
        </div>
        <div class="mb-3">
            <label class="form-label">Descripción</label>
            <textarea class="form-control" name="descripcion"><?= htmlspecialchars($ruta['descripcion']) ?></textarea>
        </div>
        <div class="mb-3">
            <label class="form-label">Duración</label>
            <input type="text" class="form-control" name="duracion" value="<?= htmlspecialchars($ruta['duracion']) ?>">
        </div>
        <div class="mb-3">
            <label class="form-label">Imagen destacada</label>
            <input type="text" class="form-control" name="imagen_destacada" value="<?= htmlspecialchars($ruta['imagen_destacada']) ?>">
        </div>
        <div class="mb-3">
            <label class="form-label">Subtítulo</label>
            <input type="text" class="form-control" name="subtitulo" value="<?= htmlspecialchars($ruta['subtitulo']) ?>">
        </div>
        <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> Guardar cambios</button>
        <a href="select-rutas.php" class="btn btn-secondary">Volver</a>
    </form>

    <!-- LISTADO DE SITIOS DE LA RUTA -->
    <div class="card shadow-sm mb-4">
        <div class="card-header bg-primary text-white">
            <i class="fas fa-map-marker-alt"></i> Sitios en esta ruta
        </div>
        <div class="card-body">
            <?php if ($sitios_ruta->num_rows == 0): ?>
                <p class="text-muted">Esta ruta no tiene sitios asignados.</p>
            <?php else: ?>
                <table class="table table-sm table-hover">
                    <thead>
                        <tr>
                            <th>Orden</th>
                            <th>Nombre</th>
                            <th class="text-end">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    <?php while ($sr = $sitios_ruta->fetch_assoc()): ?>
                        <tr>
                            <td><?= $sr['orden'] ?></td>
                            <td><?= htmlspecialchars($sr['nombre']) ?></td>
                            <td class="text-end">
                                <a href="edit-orden-sitio.php?id=<?= $sr['id'] ?>&id_ruta=<?= $id ?>" class="btn btn-sm btn-warning">
                                    <i class="fas fa-sort-numeric-down"></i>
                                </a>
                                <button onclick="confirmarQuitar(<?= $sr['id'] ?>)" class="btn btn-sm btn-danger">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    <?php endwhile; ?>
                    </tbody>
                </table>
            <?php endif; ?>
        </div>
    </div>

    <!-- FORMULARIO PARA AGREGAR NUEVOS SITIOS -->
    <div class="card shadow-sm">
        <div class="card-header bg-success text-white">
            <i class="fas fa-plus"></i> Agregar sitio a la ruta
        </div>
        <div class="card-body">
            <form method="POST" action="add-sitio-ruta.php">
                <input type="hidden" name="id_ruta" value="<?= $id ?>">
                <div class="row">
                    <div class="col-md-8 mb-2">
                        <select name="id_sitio" class="form-select" required>
                            <option value="">Seleccione un sitio</option>
                            <?php while ($disp = $sitios_disponibles->fetch_assoc()): ?>
                                <option value="<?= $disp['id'] ?>"><?= htmlspecialchars($disp['nombre']) ?></option>
                            <?php endwhile; ?>
                        </select>
                    </div>
                    <div class="col-md-4 mb-2">
                        <input type="number" name="orden" class="form-control" placeholder="Orden" min="1" required>
                    </div>
                </div>
                <button type="submit" class="btn btn-success"><i class="fas fa-plus"></i> Añadir</button>
            </form>
        </div>
    </div>

</div>
</body>
</html>
