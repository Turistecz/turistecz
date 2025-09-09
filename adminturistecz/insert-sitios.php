<?php 
include 'db.php';
session_start();
if (!isset($_SESSION['user'])) {
    header("Location: login.php");
    exit();
}  

// Opciones del enum
$opciones = [
    "NO" => "No",
    "SI" => "Sí",
    "NO_HAY_INFORMACION" => "No hay información",
    "BAJO_PETICION" => "Bajo petición"
];
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Agregar Sitio</title>
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
        button {
            margin-top: 20px;
            padding: 10px 18px;
            background: #27ae60;
            color: #fff;
            border: none;
            border-radius: 8px;
            font-size: 15px;
            cursor: pointer;
        }
        button:hover {
            background: #1e8449;
        }
    </style>
</head>
<body>
    <h1>Agregar nuevo sitio</h1>
    <form action="guardar_sitio.php" method="POST">
        <label>Nombre: <input type="text" name="nombre" required></label><br>
        <label>Latitud: <input type="text" name="latitud"></label><br>
        <label>Longitud: <input type="text" name="longitud"></label><br>
        <label>Dirección: <input type="text" name="direccion"></label><br>
        <label>Horario visita: <input type="text" name="horario_visita"></label><br>
        <label>Teléfono: <input type="text" name="telefono"></label><br>
        <label>Enlace web: <input type="url" name="enlace_web"></label><br><br>

        <?php
        // Lista de campos enum
        $campos = [
            "rampas", "ascensores", "puertas_automaticas", "escaleras_mecanicas",
            "servicios_adaptados", "sala_lactancia", "cambiador", "parking_adaptado",
            "bancos", "mostrador_adaptado", "sin_barreras_arquitectonicas", "braille",
            "interprete_lengua_signos", "videos_subtitulos", "ayudas_visuales",
            "guias_turisticos_multiidioma", "elementos_audiovisuales_multiidioma",
            "documentacion_multiidioma", "visitas_grupales", "ayuda_movilidad",
            "lenguaje_simple", "acceso_perros_guias", "acceso_perros_asistencia"
        ];

        foreach ($campos as $campo) {
            echo "<label>" . ucfirst(str_replace("_", " ", $campo)) . ": ";
            echo "<select name='$campo'>";
            foreach ($opciones as $valor => $texto) {
                echo "<option value='$valor'>$texto</option>";
            }
            echo "</select></label><br>";
        }
        ?>

        <br>
        <button type="submit">Guardar sitio</button>
    </form>
</body>
</html>
