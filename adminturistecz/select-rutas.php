<?php
include 'db.php';
session_start();
if (!isset($_SESSION['user'])) {
    header("Location: login.php");
    exit();
}

$msg = $_GET['msg'] ?? '';
$mensaje = '';
if ($msg === 'agregado') $mensaje = 'Ruta agregada correctamente.';
elseif ($msg === 'editado') $mensaje = 'Ruta actualizada correctamente.';
elseif ($msg === 'eliminado') $mensaje = 'Ruta eliminada correctamente.';

// Paginación
$por_pagina = 10;
$pagina_actual = max(1, intval($_GET['pagina'] ?? 1));
$offset = ($pagina_actual - 1) * $por_pagina;

// Total de rutas
$total_sql = "SELECT COUNT(*) as total FROM ruta";
$total_result = $conn1->query($total_sql);
$total_rutas = $total_result->fetch_assoc()['total'];
$total_paginas = ceil($total_rutas / $por_pagina);

// Obtener rutas
$sql = "SELECT * FROM ruta LIMIT ? OFFSET ?";
$stmt = $conn1->prepare($sql);
$stmt->bind_param("ii", $por_pagina, $offset);
$stmt->execute();
$result = $stmt->get_result();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Listado de Rutas</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script>
    function confirmarEliminar(id) {
        if (confirm("¿Seguro que deseas eliminar esta ruta? Esta acción no se puede deshacer.")) {
            window.location.href = "delete-ruta.php?id=" + id;
        }
    }
    </script>
</head>
<body>
    <nav class="navbar navbar-expand-lg mb-4" style="background:#31927aff">
        <div class="container">
            <a class="navbar-brand text-white" href="dashboard.php">AdminTuristeCZ</a>
            <div class="d-flex">
                <span class="text-white me-3">Hola, <?= htmlspecialchars($_SESSION['user']) ?></span>
                <a href="logout.php" class="btn btn-outline-light btn-sm">Cerrar sesión</a>
            </div>
        </div>
    </nav>

    <div class="container">
        <?php if ($mensaje): ?>
            <div class="alert alert-success alert-dismissible fade show">
                <?= $mensaje ?>
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        <?php endif; ?>

        <div class="d-flex justify-content-between mb-4">
            <h2><i class="fas fa-route"></i> Rutas</h2>
            <a href="insert-ruta.php" class="btn btn-primary">
                <i class="fas fa-plus"></i> Nueva ruta
            </a>
        </div>

        <div class="card shadow-sm">
            <div class="card-body">
                <?php if ($result->num_rows == 0): ?>
                    <p class="text-center text-muted">No hay rutas registradas.</p>
                <?php else: ?>
                    <table class="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Duración</th>
                                <th>Subtítulo</th>
                                <th class="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        <?php while ($row = $result->fetch_assoc()): ?>
                            <tr>
                                <td><?= $row['id'] ?></td>
                                <td><?= htmlspecialchars($row['nombre']) ?></td>
                                <td><?= htmlspecialchars($row['duracion'] ?? 'N/A') ?></td>
                                <td><?= htmlspecialchars($row['subtitulo'] ?? 'N/A') ?></td>
                                <td class="text-center">
                                    <!-- Botón Editar -->
                                    <a href="edit-ruta.php?id=<?= $row['id'] ?>" class="btn btn-sm btn-warning me-1" title="Editar">
                                        <i class="fas fa-edit"></i>
                                    </a>                                                        
                                    <!-- Botón Eliminar -->
                                    <button onclick="confirmarEliminar(<?= $row['id'] ?>)" class="btn btn-sm btn-danger" title="Eliminar">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        <?php endwhile; ?>
                        </tbody>
                    </table>

                    <!-- Paginación -->
                    <nav>
                        <ul class="pagination justify-content-center">
                            <li class="page-item <?= $pagina_actual <= 1 ? 'disabled' : '' ?>">
                                <a class="page-link" href="?pagina=<?= $pagina_actual - 1 ?>">&laquo;</a>
                            </li>
                            <?php for ($i = 1; $i <= $total_paginas; $i++): ?>
                                <li class="page-item <?= $i == $pagina_actual ? 'active' : '' ?>">
                                    <a class="page-link" href="?pagina=<?= $i ?>"><?= $i ?></a>
                                </li>
                            <?php endfor; ?>
                            <li class="page-item <?= $pagina_actual >= $total_paginas ? 'disabled' : '' ?>">
                                <a class="page-link" href="?pagina=<?= $pagina_actual + 1 ?>">&raquo;</a>
                            </li>
                        </ul>
                    </nav>
                <?php endif; ?>
            </div>
        </div>
    </div>
</body>
</html>
