<?php
include 'db.php';
session_start();
if (!isset($_SESSION['user'])) {
    header("Location: login.php");
    exit();
}

if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    die("ID no válido.");
}

$id = intval($_GET['id']);
$sql = "SELECT * FROM sitio WHERE id = ?";
$stmt = $conn1->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    die("Sitio no encontrado.");
}

$sitio = $result->fetch_assoc();

$opciones = [
    "NO" => "No",
    "SI" => "Sí",
    "NO_HAY_INFORMACION" => "No hay información",
    "BAJO_PETICION" => "Bajo petición"
];

$campos = [
    "rampas", "ascensores", "puertas_automaticas", "escaleras_mecanicas",
    "servicios_adaptados", "sala_lactancia", "cambiador", "parking_adaptado",
    "bancos", "mostrador_adaptado", "sin_barreras_arquitectonicas", "braille",
    "interprete_lengua_signos", "videos_subtitulos", "ayudas_visuales",
    "guias_turisticos_multiidioma", "elementos_audiovisuales_multiidioma",
    "documentacion_multiidioma", "visitas_grupales", "ayuda_movilidad",
    "lenguaje_simple", "acceso_perros_guias", "acceso_perros_asistencia"
];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $updateFields = [
        'nombre' => htmlspecialchars(trim($_POST['nombre'])),
        'latitud' => htmlspecialchars(trim($_POST['latitud'])),
        'longitud' => htmlspecialchars(trim($_POST['longitud'])),
        'direccion' => htmlspecialchars(trim($_POST['direccion'])),
        'horario_visita' => htmlspecialchars(trim($_POST['horario_visita'])),
        'telefono' => htmlspecialchars(trim($_POST['telefono'])),
        'enlace_web' => filter_var(trim($_POST['enlace_web']), FILTER_VALIDATE_URL) ?: null
    ];

    foreach ($campos as $campo) {
        if (isset($_POST[$campo]) && array_key_exists($_POST[$campo], $opciones)) {
            $updateFields[$campo] = $_POST[$campo];
        }
    }

    $setClause = implode(", ", array_map(fn($k) => "$k = ?", array_keys($updateFields)));
    $sqlUpdate = "UPDATE sitio SET $setClause WHERE id = ?";
    $stmtUpdate = $conn1->prepare($sqlUpdate);

    $types = str_repeat("s", count($updateFields)) . "i";
    $values = array_values($updateFields);
    $values[] = $id;

    $stmtUpdate->bind_param($types, ...$values);

    if ($stmtUpdate->execute()) {
        header("Location: select-sitios.php?msg=editado");
        exit();
    } else {
        $error = "Error al actualizar: " . $stmtUpdate->error;
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Sitio</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body {
            background: #f4f6f9;
        }
        .navbar {
            background: #2c3e50;
        }
        .form-label {
            font-weight: 500;
        }
    </style>
</head>
<body>
    <nav class="navbar navbar-expand-lg mb-4">
        <div class="container">
            <a class="navbar-brand" href="select-sitios.php"><i class="fas fa-arrow-left"></i> Volver</a>
            <span class="text-white">Editar: <?= htmlspecialchars($sitio['nombre']) ?></span>
        </div>
    </nav>

    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-10 col-lg-8">
                <div class="card shadow-sm">
                    <div class="card-header bg-primary text-white">
                        <h5><i class="fas fa-edit"></i> Editar Sitio</h5>
                    </div>
                    <div class="card-body">
                        <?php if (isset($error)): ?>
                            <div class="alert alert-danger"><?= $error ?></div>
                        <?php endif; ?>

                        <form method="POST">
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Nombre</label>
                                    <input type="text" name="nombre" class="form-control" value="<?= htmlspecialchars($sitio['nombre']) ?>" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Dirección</label>
                                    <input type="text" name="direccion" class="form-control" value="<?= htmlspecialchars($sitio['direccion'] ?? '') ?>">
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Latitud</label>
                                    <input type="text" name="latitud" class="form-control" value="<?= htmlspecialchars($sitio['latitud'] ?? '') ?>">
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Longitud</label>
                                    <input type="text" name="longitud" class="form-control" value="<?= htmlspecialchars($sitio['longitud'] ?? '') ?>">
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Teléfono</label>
                                    <input type="text" name="telefono" class="form-control" value="<?= htmlspecialchars($sitio['telefono'] ?? '') ?>">
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Horario visita</label>
                                    <input type="text" name="horario_visita" class="form-control" value="<?= htmlspecialchars($sitio['horario_visita'] ?? '') ?>">
                                </div>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Enlace web</label>
                                <input type="url" name="enlace_web" class="form-control" value="<?= htmlspecialchars($sitio['enlace_web'] ?? '') ?>">
                            </div>

                            <hr>
                            <h6>Accesibilidad</h6>

                            <div class="row">
                                <?php foreach ($campos as $campo): ?>
                                    <div class="col-md-6 col-lg-4 mb-3">
                                        <label class="form-label"><?= ucfirst(str_replace("_", " ", $campo)) ?></label>
                                        <select name="<?= $campo ?>" class="form-select">
                                            <?php foreach ($opciones as $valor => $texto): ?>
                                                <option value="<?= $valor ?>" <?= $sitio[$campo] === $valor ? 'selected' : '' ?>>
                                                    <?= $texto ?>
                                                </option>
                                            <?php endforeach; ?>
                                        </select>
                                    </div>
                                <?php endforeach; ?>
                            </div>

                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <a href="select-sitios.php" class="btn btn-secondary">Cancelar</a>
                                <button type="submit" class="btn btn-success">Guardar cambios</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>