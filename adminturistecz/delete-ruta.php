<?php
include 'db.php';
session_start();
if (!isset($_SESSION['user'])) { 
    header("Location: login.php");
    exit();
}

$id = intval($_GET['id'] ?? 0);

if ($id <= 0) {
    header("Location: select-rutas.php?msg=error_id");
    exit();
}

// 1) Comprobar si la ruta existe
$check = $conn1->prepare("SELECT id FROM ruta WHERE id = ?");
$check->bind_param("i", $id);
$check->execute();
$result = $check->get_result();

if ($result->num_rows === 0) {
    // Ruta no encontrada
    header("Location: select-rutas.php?msg=no_encontrada");
    exit();
}

$conn1->begin_transaction();

try {
    // 2) Eliminar sitios asociados a esta ruta
    $delete_sitios = $conn1->prepare("DELETE FROM sitios_ruta WHERE id_ruta = ?");
    $delete_sitios->bind_param("i", $id);
    $delete_sitios->execute();

    // 3) Eliminar la ruta
    $delete_ruta = $conn1->prepare("DELETE FROM ruta WHERE id = ?");
    $delete_ruta->bind_param("i", $id);
    $delete_ruta->execute();

    $conn1->commit();

    header("Location: select-rutas.php?msg=eliminado");
    exit();

} catch (Exception $e) {
    $conn1->rollback();
    header("Location: select-rutas.php?msg=error_borrado");
    exit();
}
