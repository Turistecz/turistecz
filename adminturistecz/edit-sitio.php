<?php
include 'db.php'; // Asegúrate que este archivo define $conn1 para turistecz
session_start();

if (!isset($_SESSION['user'])) {
    header("Location: login.php");
    exit();
}

if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    die("ID de sitio no válido.");
}

$id = intval($_GET['id']);

// Traer los datos del sitio
$sql = "SELECT * FROM sitio WHERE id = ?";
$stmt = $conn1->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    die("Sitio no encontrado.");
}

$sitio = $result->fetch_assoc();

// Opciones para campos enum
$opciones = [
    "NO" => "No",
    "SI" => "Sí",
    "NO_HAY_INFORMACION" => "No hay información",
    "BAJO_PETICION" => "Bajo petición"
];

// Campos tipo enum
$campos = [
    "rampas", "ascensores", "puertas_automaticas", "escaleras_mecanicas",
    "servicios_adaptados", "sala_lactancia", "cambiador", "parking_adaptado",
    "bancos", "mostrador_adaptado", "sin_barreras_arquitectonicas", "braille",
    "interprete_lengua_signos", "videos_subtitulos", "ayudas_visuales",
    "guias_turisticos_multiidioma", "elementos_audiovisuales_multiidioma",
    "documentacion_multiidioma", "visitas_grupales", "ayuda_movilidad",
    "lenguaje_simple", "acceso_perros_guias", "acceso_perros_asistencia"
];

// Procesar formulario
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
        header("Location: select-sitios.php");
        exit();
    } else {
        echo "Error al actualizar el sitio: " . $stmtUpdate->error;
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Editar Sitio</title>
     <style>
        body {
            font-family: Arial, sans-serif;
            background: #f8fafc;
            margin: 0;
            padding: 20px;
            color: #333;
        }
        h1 {
            text-align: center;
            color: #2c3e50;
        }
        .form-container {
            max-width: 700px;
            margin: 30px auto;
            background: #fff;
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        label {
            display: block;
            margin-top: 15px;
            font-weight: bold;
            color: #555;
        }
        input, select {
            width: 100%;
            padding: 8px;
            margin-top: 6px;
            border: 1px solid #ccc;
            border-radius: 6px;
            font-size: 14px;
        }
        .btn {
            margin-top: 20px;
            padding: 10px 18px;
            background: #2980b9;
            color: #fff;
            border: none;
            border-radius: 8px;
            font-size: 15px;
            cursor: pointer;
            display: inline-block;
        }
        .btn:hover {
            background: #1c5980;
        }
        .btn-cancel {
            background: #e74c3c;
            margin-left: 10px;
        }
        .btn-cancel:hover {
            background: #c0392b;
        }
    </style>
</head>
<body>
<h1>Editar Sitio</h1>
<form method="POST">
    <label>Nombre: <input type="text" name="nombre" value="<?php echo htmlspecialchars($sitio['nombre']); ?>" required></label><br>
    <label>Latitud: <input type="text" name="latitud" value="<?php echo htmlspecialchars($sitio['latitud']); ?>"></label><br>
    <label>Longitud: <input type="text" name="longitud" value="<?php echo htmlspecialchars($sitio['longitud']); ?>"></label><br>
    <label>Dirección: <input type="text" name="direccion" value="<?php echo htmlspecialchars($sitio['direccion']); ?>"></label><br>
    <label>Horario visita: <input type="text" name="horario_visita" value="<?php echo htmlspecialchars($sitio['horario_visita']); ?>"></label><br>
    <label>Teléfono: <input type="text" name="telefono" value="<?php echo htmlspecialchars($sitio['telefono']); ?>"></label><br>
    <label>Enlace web: <input type="url" name="enlace_web" value="<?php echo htmlspecialchars($sitio['enlace_web']); ?>"></label><br><br>

    <?php foreach ($campos as $campo): ?>
        <label><?php echo ucfirst(str_replace("_", " ", $campo)); ?>:
            <select name="<?php echo $campo; ?>">
                <?php foreach ($opciones as $valor => $texto): ?>
                    <option value="<?php echo $valor; ?>" <?php echo ($sitio[$campo] === $valor) ? 'selected' : ''; ?>>
                        <?php echo $texto; ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </label><br>
    <?php endforeach; ?>

    <button type="submit">Guardar Cambios</button>
</form>
</body>
</html>
