<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // Cambia * por tu dominio en producción
header("Access-Control-Allow-Methods: GET");

include '../db.php'; // Ajusta la ruta según donde esté

function obtenerTema($conn1) {
    $sql = "SELECT clave, valor FROM configuracioncolor WHERE clave IN ('color_principal', 'tema_activo')";
    $result = $conn1->query($sql);
    
    $tema = [
        'color_principal' => '#31927aff',
        'tema_activo' => 'default'
    ];
    
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $tema[$row['clave']] = $row['valor'];
        }
    }
    
    return $tema;
}

echo json_encode([
    'status' => 'success',
    'data' => obtenerTema($conn1)
]);