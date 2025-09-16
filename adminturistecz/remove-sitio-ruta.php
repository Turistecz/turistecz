<?php
include 'db.php';
session_start();
if (!isset($_SESSION['user'])) { header("Location: login.php"); exit(); }

$id = intval($_GET['id']);
$id_ruta = intval($_GET['id_ruta']);

$stmt = $conn1->prepare("DELETE FROM sitios_ruta WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();

header("Location: edit-ruta.php?id=$id_ruta");
exit();
