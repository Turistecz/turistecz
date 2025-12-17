<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

include '../db.php';

function obtenerTema($conn1) {
    $sql = "SELECT valor FROM configuracioncolor WHERE clave = 'tema_activo'";
    $result = $conn1->query($sql);

    $tema = [
        'name' => 'default',
        'color_primary' => '#184591',
        'color_secondary' => '#2A8BEA',
        'color_accent' => '#42D5A5',
        'gradient_primary_start' => '#1f57b9',
        'gradient_primary_end' => '#8adff5',
        'gradient_home_start' => '#8ee3f7',
        'gradient_home_end' => '#478ed1',
        'bg_primary' => '#ffffff',
        'bg_secondary' => '#f0f0f0',
        'text_primary' => '#03080a',
        'text_light' => '#ffffff'
    ];

    if ($result && $row = $result->fetch_assoc()) {
        $stored = json_decode($row['valor'], true); // decodificar JSON
        if ($stored) {
            $tema = array_merge($tema, $stored);
        }
    }

    return $tema; // 👈 ya devuelve objeto, no string
}

echo json_encode([
    'status' => 'success',
    'data' => obtenerTema($conn1)
]);
