<?php
include 'db.php';
session_start();
if (!isset($_SESSION['user'])) {
    header("Location: login.php");
    exit();
}

$sql = "SELECT * FROM sitio";
$result = $conn1->query($sql);

if (!$result) {
    die("Error en la consulta: " . $conn1->error);
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Listado de Sitios</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body {
            background: #f4f6f9;
        }
        .navbar {
            background: #2c3e50;
        }
        .navbar-brand, .nav-link {
            color: white !important;
        }
        .table th {
            background: #34495e;
            color: white;
        }
        .table-hover tbody tr:hover {
            background-color: #f1f5f9;
        }
        .btn-sm {
            font-size: 0.85rem;
        }
    </style>
</head>
<body>
    <nav class="navbar navbar-expand-lg mb-4">
        <div class="container">
            <a class="navbar-brand" href="#"><i class="fas fa-map-marked-alt"></i> AdminTuristeCZ</a>
            <div class="d-flex">
                <span class="text-white me-3">Hola, <?= htmlspecialchars($_SESSION['user']) ?></span>
                <a href="logout.php" class="btn btn-outline-light btn-sm">Cerrar sesión</a>
            </div>
        </div>
    </nav>

    <div class="container">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2><i class="fas fa-list"></i> Sitios Turísticos</h2>
            <a href="insert-sitios.php" class="btn btn-primary">
                <i class="fas fa-plus"></i> Nuevo sitio
            </a>
        </div>

        <div class="card shadow-sm">
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover table-striped align-middle">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Dirección</th>
                                <th>Teléfono</th>
                                <th>Web</th>
                                <th>Rampas</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php while ($row = $result->fetch_assoc()): ?>
                                <tr>
                                    <td><?= $row['id'] ?></td>
                                    <td><?= htmlspecialchars($row['nombre']) ?></td>
                                    <td><?= htmlspecialchars($row['direccion'] ?? 'N/A') ?></td>
                                    <td><?= htmlspecialchars($row['telefono'] ?? 'N/A') ?></td>
                                    <td>
                                        <?php if ($row['enlace_web']): ?>
                                            <a href="<?= $row['enlace_web'] ?>" target="_blank" class="text-primary">
                                                <i class="fas fa-globe"></i>
                                            </a>
                                        <?php else: ?>
                                            N/A
                                        <?php endif; ?>
                                    </td>
                                    <td>
                                        <span class="badge bg-<?= $row['rampas'] === 'SI' ? 'success' : ($row['rampas'] === 'NO' ? 'danger' : 'secondary') ?>">
                                            <?= ucfirst(strtolower(str_replace('_', ' ', $row['rampas']))) ?>
                                        </span>
                                    </td>
                                    <td>
                                        <a href="edit-sitio.php?id=<?= $row['id'] ?>" class="btn btn-sm btn-warning">
                                            <i class="fas fa-edit"></i>
                                        </a>
                                    </td>
                                </tr>
                            <?php endwhile; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</body>
</html>