<?php
include 'db.php';
session_start();

if (!isset($_SESSION['user'])) {
    header("Location: login.php");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id_ruta = intval($_POST['id_ruta']);
    $id_sitio = intval($_POST['id_sitio']);
    $orden = intval($_POST['orden']);

    if ($id_ruta <= 0 || $id_sitio <= 0 || $orden <= 0) {
        die("Datos inválidos.");
    }

    $conn1->begin_transaction();

    try {
        // 1) Comprobar si ya existe ese orden en la misma ruta
        $check = $conn1->prepare("SELECT id FROM sitios_ruta WHERE id_ruta = ? AND orden = ?");
        $check->bind_param("ii", $id_ruta, $orden);
        $check->execute();
        $result = $check->get_result();

        if ($result->num_rows > 0) {
            // Si existe, desplazamos todos los órdenes >= orden en +1
            $shift = $conn1->prepare("UPDATE sitios_ruta 
                                      SET orden = orden + 1 
                                      WHERE id_ruta = ? AND orden >= ?");
            $shift->bind_param("ii", $id_ruta, $orden);
            $shift->execute();
        }

        // 2) Insertar el nuevo sitio en la posición deseada
        $insert = $conn1->prepare("INSERT INTO sitios_ruta (id_ruta, id_sitio, orden) VALUES (?, ?, ?)");
        $insert->bind_param("iii", $id_ruta, $id_sitio, $orden);
        $insert->execute();

        $conn1->commit();

        header("Location: edit-ruta.php?id=$id_ruta&msg=sitio_agregado");
        exit();

    } catch (Exception $e) {
        $conn1->rollback();
        echo "<div class='alert alert-danger text-center'>⚠️ Error al agregar sitio: " . htmlspecialchars($e->getMessage()) . "</div>";
    }
} else {
    die("Método no permitido.");
}
