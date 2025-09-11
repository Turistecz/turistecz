<?php
include 'db.php';
session_start();
if (!isset($_SESSION['user'])) {
    header("Location: login.php");
    exit();
}

// Mensajes de éxito
$msg = $_GET['msg'] ?? '';
$mensaje = '';
if ($msg == 'agregado') {
    $mensaje = 'Sitio agregado correctamente.';
} elseif ($msg == 'editado') {
    $mensaje = 'Sitio actualizado correctamente.';
}

// Consulta: obtener todos los sitios
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
        .alert-success {
            font-weight: 500;
        }
        .details-panel {
            margin-top: 10px;     
            border-radius: 8px;
            background-color: #f8f9fa;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }
        .details-panel.show {
            max-height: 12000px; /* ajusta según el contenido */
            padding: 15px;
            border: 1px solid #dee2e6;
            nth-child(even) {
            background-color: #be0f0fff;
             overflow-y: auto;
            }
        }
        .details-title {
            font-weight: bold;
            margin-bottom: 10px;
            color: #2c3e50;
        }
        .details-row {
            display: flex;
            justify-content: space-between;
            padding: 0px 20px;
            border-bottom: 1px solid #eee;
                        
        }
        .details-row:nth-child(even) {
            background-color: #cfcac5ff;
        }
        .details-row:nth-child(odd) {
            background-color: transparent;
        }
        .details-row:last-child {
            border-bottom: none;
        }
        .details-label {
            font-weight: 500;
            width: 150px;
        }
        .details-value {
            word-break: break-word;
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

        <!-- Mensaje de éxito -->
        <?php if ($mensaje): ?>
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <i class="fas fa-check-circle"></i> <?= $mensaje ?>
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        <?php endif; ?>

        <div class="d-flex justify-content-between align-items-center mb-4">
        <h2><i class="fas fa-list"></i> Sitios Turísticos</h2>
            <div>
                <a href="insert-ruta.php" class="btn btn-primary me-2">
                    <i class="fas fa-route"></i> Nueva ruta
                </a>
                <a href="insert-sitios.php" class="btn btn-primary">
                    <i class="fas fa-map-marker-alt"></i> Nuevo sitio
                </a>
            </div>
        </div>
                

        <div class="card shadow-sm">
            <div class="card-body">
                <?php if ($result->num_rows == 0): ?>
                    <div class="text-center text-muted py-4">
                        <i class="fas fa-map-marker-alt fa-3x mb-3"></i>
                        <p>No hay sitios registrados aún.</p>
                    </div>
                <?php else: ?>
                    <table class="table table-hover table-striped align-middle">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Dirección</th>
                                <th>Teléfono</th>
                                <th>Web</th>
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
                                        <a href="edit-sitio.php?id=<?= $row['id'] ?>" class="btn btn-sm btn-warning me-1">
                                            <i class="fas fa-edit"></i>
                                        </a>
                                        <button class="btn btn-sm btn-outline-info" onclick="toggleDetails(this)">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                    </td>
                                </tr>
                                <!-- Panel de detalles oculto -->
                                <tr>
                                    <td colspan="7">
                                        <div id="details-<?= $row['id'] ?>" class="details-panel">
                                            <div class="details-title"><i class="fas fa-info-circle"></i> Detalles completos</div>
                                            <?php
                                                $campos = [
                                                    "ascensores", "rampas", "puertas_automaticas", "escaleras_mecanicas",
                                                    "servicios_adaptados", "sala_lactancia", "cambiador",
                                                    "parking_adaptado", "bancos", "mostrador_adaptado",
                                                    "sin_barreras_arquitectonicas", "braille", "interprete_lengua_signos",
                                                    "videos_subtitulos", "ayudas_visuales", "guias_turisticos_multiidioma",
                                                    "elementos_audiovisuales_multiidioma", "documentacion_multiidioma",
                                                    "visitas_grupales", "ayuda_movilidad", "lenguaje_simple",
                                                    "acceso_perros_guias", "acceso_perros_asistencia"
                                                ];

                                                foreach ($campos as $campo) {
                                                    $valor = $row[$campo];
                                                    $texto = match($valor) {
                                                        'NO' => 'No',
                                                        'SI' => 'Sí',
                                                        'NO_HAY_INFORMACION' => 'No hay información',
                                                        'BAJO_PETICION' => 'Bajo petición',
                                                        default => $valor
                                                    };
                                                    ?>
                                                    <div class="details-row">
                                                        <span class="details-label"><?= ucfirst(str_replace('_', ' ', $campo)) ?>:</span>
                                                        <span class="details-value"><?= htmlspecialchars($texto) ?></span>
                                                    </div>
                                                    <?php
                                                }
                                            ?>
                                        </div>
                                        </td>
                                    </tr>
                                <?php endwhile; ?>
                            </tbody>
                        </table>
                    <?php endif; ?>

    <script>
        function toggleDetails(btn) {
            const panel = btn.closest('tr').nextElementSibling.querySelector('.details-panel');
            panel.classList.toggle('show');
            const icon = btn.querySelector('i');
            if (panel.classList.contains('show')) {
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        }
    </script>
</body>
</html>