<?php
include 'db.php';
session_start();
if (!isset($_SESSION['user'])) {
    header("Location: login.php");
    exit();
}

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
    $insertFields = [
        'nombre' => htmlspecialchars(trim($_POST['nombre'])),
        'latitud' => htmlspecialchars(trim($_POST['latitud'])),
        'longitud' => htmlspecialchars(trim($_POST['longitud'])),
        'direccion' => htmlspecialchars(trim($_POST['direccion'])),
        'horario_visita' => htmlspecialchars(trim($_POST['horario_visita'])),
        'telefono' => htmlspecialchars(trim($_POST['telefono'])),
        'enlace_web' => filter_var(trim($_POST['enlace_web']), FILTER_VALIDATE_URL) ?: null
    ];

    foreach ($campos as $campo) {
        $insertFields[$campo] = $_POST[$campo] ?? 'NO_HAY_INFORMACION';
    }

    $columns = implode(", ", array_keys($insertFields));
    $placeholders = str_repeat("?, ", count($insertFields) - 1) . "?";
    $sql = "INSERT INTO sitio ($columns) VALUES ($placeholders)";
    $stmt = $conn1->prepare($sql);

    $types = str_repeat("s", count($insertFields));
    $values = array_values($insertFields);

    $stmt->bind_param($types, ...$values);

    if ($stmt->execute()) {
        header("Location: select-sitios.php?msg=agregado");
        exit();
    } else {
        $error = "Error al guardar: " . $stmt->error;
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agregar Sitio</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body {
            background: #f4f6f9;
        }
        .navbar {
            background: #31927aff;
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
            <span class="text-white">Nuevo sitio</span>
        </div>
    </nav>

    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-10 col-lg-8">
                <div class="card shadow-sm">
                    <div class="card-header bg-success text-white">
                        <h5><i class="fas fa-plus-circle"></i> Agregar Sitio</h5>
                    </div>
                    <div class="card-body">
                        <?php if (isset($error)): ?>
                            <div class="alert alert-danger"><?= $error ?></div>
                        <?php endif; ?>

                        <form method="POST">
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Nombre *</label>
                                    <input type="text" name="nombre" class="form-control" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Dirección</label>
                                    <input type="text" name="direccion" class="form-control">
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Latitud</label>
                                    <input type="text" name="latitud" class="form-control">
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Longitud</label>
                                    <input type="text" name="longitud" class="form-control">
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Teléfono</label>
                                    <input type="text" name="telefono" class="form-control">
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Horario visita</label>
                                    <input type="text" name="horario_visita" class="form-control">
                                </div>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Enlace web</label>
                                <input type="url" name="enlace_web" class="form-control" placeholder="https://...">
                            </div>

                            <hr>
                            <h6>Accesibilidad</h6>
                            <div class="row">
                                <?php foreach ($campos as $campo): ?>
                                    <div class="col-md-6 col-lg-4 mb-3">
                                        <label class="form-label"><?= ucfirst(str_replace("_", " ", $campo)) ?></label>
                                        <select name="<?= $campo ?>" class="form-select">
                                            <?php foreach ($opciones as $valor => $texto): ?>
                                                <option value="<?= $valor ?>"><?= $texto ?></option>
                                            <?php endforeach; ?>
                                        </select>
                                    </div>
                                <?php endforeach; ?>
                            </div>

                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <a href="select-sitios.php" class="btn btn-danger">Cancelar</a>
                                <button type="submit" class="btn btn-success">Guardar sitio</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>