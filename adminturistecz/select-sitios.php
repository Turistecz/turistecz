<?php 
include 'db.php';
session_start();
if (!isset($_SESSION['user'])) {
    header("Location: login.php");
    exit();
}  

$sql = "SELECT * FROM sitio";
$result = $conn1->query($sql); // usamos $conn1

if (!$result) {
    die("Error en la consulta: " . $conn1->error);
}

// Lista de campos que queremos mostrar en la tabla
$campos = [
    "id", "nombre", "latitud", "longitud", "direccion", "horario_visita",
    "telefono", "enlace_web", "rampas", "ascensores", "puertas_automaticas",
    "escaleras_mecanicas", "servicios_adaptados", "sala_lactancia", "cambiador",
    "parking_adaptado", "bancos", "mostrador_adaptado", "sin_barreras_arquitectonicas",
    "braille", "interprete_lengua_signos", "videos_subtitulos", "ayudas_visuales",
    "guias_turisticos_multiidioma", "elementos_audiovisuales_multiidioma",
    "documentacion_multiidioma", "visitas_grupales", "ayuda_movilidad",
    "lenguaje_simple", "acceso_perros_guias", "acceso_perros_asistencia"
];
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Listado de Sitios</title>
    <style>
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
            margin-bottom: 20px;
        }
        .table-container {
            background: #fff;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            overflow-x: auto;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            min-width: 1200px; /* para scroll si hay muchas columnas */
        }
        th, td {
            border-bottom: 1px solid #ddd;
            padding: 10px;
            text-align: left;
            font-size: 14px;
        }
        th {
            background: #2c3e50;
            color: #fff;
            position: sticky;
            top: 0;
        }
        tr:hover {
            background: #f1f5f9;
        }
        a.btn {
            display: inline-block;
            padding: 6px 12px;
            background: #3498db;
            color: #fff;
            text-decoration: none;
            border-radius: 6px;
            font-size: 13px;
        }
        a.btn:hover {
            background: #217dbb;
        }
    </style>
    </style>
</head>
<body>
    <h1>Listado de Sitios</h1>
    <table>
        <thead>
            <tr>
                <?php foreach ($campos as $campo) echo "<th>$campo</th>"; ?>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($result as $row): ?>
            <tr>
                <?php foreach ($campos as $campo) echo "<td>" . htmlspecialchars($row[$campo]) . "</td>"; ?>
                <td>
                    <a href="edit-sitio.php?id=<?php echo $row['id']; ?>">Editar</a>
                </td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</body>
</html>
