<?php
include 'db.php';
session_start();
if (!isset($_SESSION['user'])) { 
    header("Location: login.php");
    exit();
}

$id = intval($_GET['id']);
$id_ruta = intval($_GET['id_ruta']);

// --- 1) Obtenemos el orden del registro a borrar ---
$stmt_orden = $conn1->prepare("SELECT orden FROM sitios_ruta WHERE id = ? AND id_ruta = ?");
$stmt_orden->bind_param("ii", $id, $id_ruta);
$stmt_orden->execute();
$result = $stmt_orden->get_result();
$row = $result->fetch_assoc();

if (!$row) {
    die("Registro no encontrado");
}

$orden_eliminado = $row['orden'];

// --- 2) Eliminamos el registro ---
$delete = $conn1->prepare("DELETE FROM sitios_ruta WHERE id = ?");
$delete->bind_param("i", $id);
$delete->execute();

// --- 3) Reordenamos los registros que están después del eliminado ---
$update = $conn1->prepare("
    UPDATE sitios_ruta 
    SET orden = orden - 1 
    WHERE id_ruta = ? AND orden > ?
");
$update->bind_param("ii", $id_ruta, $orden_eliminado);
$update->execute();

header("Location: edit-ruta.php?id=$id_ruta&msg=sitio_eliminado");
exit();
