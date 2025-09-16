<?php
include 'db.php';
session_start();
if (!isset($_SESSION['user'])) { header("Location: login.php"); exit(); }

$id_ruta = intval($_POST['id_ruta']);
$id_sitio = intval($_POST['id_sitio']);
$orden = intval($_POST['orden']);

$stmt = $conn1->prepare("INSERT INTO sitios_ruta (id_ruta, id_sitio, orden) VALUES (?, ?, ?)");
$stmt->bind_param("iii", $id_ruta, $id_sitio, $orden);
$stmt->execute();

header("Location: edit-ruta.php?id=$id_ruta");
exit();
