<?php
include 'db.php'; 
session_start();

if (!isset($_SESSION['user'])) {
    header("Location: login.php");
    exit();
}


$sql_sitios = "SELECT id, nombre FROM sitio ORDER BY nombre";
$result_sitios = $conn1->query($sql_sitios);

if (!$result_sitios) {
    die("Error al obtener sitios: " . $conn1->error);
}

$sitios = [];
while ($row = $result_sitios->fetch_assoc()) {
    $sitios[] = $row;
}


$success = $error = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {

        $nombre = htmlspecialchars(trim($_POST['nombre']));
        $descripcion = htmlspecialchars(trim($_POST['descripcion']));
        $duracion = htmlspecialchars(trim($_POST['duracion']));
        $subtitulo = htmlspecialchars(trim($_POST['subtitulo']));
        $imagen_destacada = trim($_POST['imagen_destacada']);

        if (empty($nombre)) {
            throw new Exception("El nombre de la ruta es obligatorio.");
        }

        $sql_ruta = "INSERT INTO ruta (nombre, descripcion, duracion, imagen_destacada, subtitulo) VALUES (?, ?, ?, ?, ?)";
        $stmt_ruta = $conn1->prepare($sql_ruta);
        $stmt_ruta->bind_param("sssss", $nombre, $descripcion, $duracion, $imagen_destacada, $subtitulo);

        if (!$stmt_ruta->execute()) {
            throw new Exception("Error al crear la ruta: " . $stmt_ruta->error);
        }

        $id_ruta = $conn1->insert_id;

        if (isset($_POST['sitios']) && is_array($_POST['sitios'])) {
            $sql_sitio_ruta = "INSERT INTO sitios_ruta (id_ruta, id_sitio, orden, texto) VALUES (?, ?, ?, ?)";
            $stmt_sr = $conn1->prepare($sql_sitio_ruta);

            foreach ($_POST['sitios'] as $index => $data) {
                $id_sitio = intval($data['id']);
                $orden = intval($data['orden']);
                $texto = htmlspecialchars(trim($data['texto']));

                if ($id_sitio > 0 && $orden > 0) {
                    $stmt_sr->bind_param("iiis", $id_ruta, $id_sitio, $orden, $texto);
                    if (!$stmt_sr->execute()) {
                        throw new Exception("Error al añadir sitio a la ruta: " . $stmt_sr->error);
                    }
                }
            }
        }

        $_SESSION['msg'] = "Ruta creada correctamente.";
        header("Location: select-sitios.php"); 
        exit();

    } catch (Exception $e) {
        $error = $e->getMessage();
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crear Nueva Ruta</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body {
            background: #f8fafc;
            color: #333;
        }
        .form-container {
            max-width: 900px;
            margin: 30px auto;
            background: #fff;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .sitio-item {
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 15px;
            background: #f9f9f9;
            position: relative;
        }
        .remove-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            background: #e74c3c;
            color: white;
            border: none;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            font-size: 14px;
            cursor: pointer;
        }
        .add-sitio-btn {
            background: #27ae60;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
        }
        .add-sitio-btn:hover {
            background: #218838;
        }
        .navbar {
            background: #31927aff;
        }
    </style>
</head>
<body>
    
        <nav class="navbar navbar-expand-lg mb-4">
            <div class="container">
                <a class="navbar-brand" href="select-sitios.php"><i class="fas fa-arrow-left"></i> Volver</a>
                <span class="text-white px-3 py-2 rounded">Crear Ruta</span>
            
        </nav>

        <div class="form-container">
            <h2 class="mb-4 text-center"><i class="fas fa-route"></i> Crear Nueva Ruta</h2>

            <?php if (!empty($error)): ?>
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <i class="fas fa-exclamation-triangle"></i> <?= htmlspecialchars($error) ?>
                </div>
            <?php endif; ?>

            <form method="POST" id="form-ruta">
               
                <div class="mb-3">
                    <label class="form-label">Nombre *</label>
                    <input type="text" name="nombre" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Descripción</label>
                    <textarea name="descripcion" class="form-control" rows="3"></textarea>
                </div>
                <div class="mb-3">
                    <label class="form-label">Duración</label>
                    <input type="text" name="duracion" class="form-control" placeholder="Ej: 2 horas">
                </div>
                <div class="mb-3">
                    <label class="form-label">Subtítulo</label>
                    <input type="text" name="subtitulo" class="form-control">
                </div>
                <div class="mb-3">
                    <label class="form-label">Imagen destacada (URL)</label>
                    <input type="url" name="imagen_destacada" class="form-control" placeholder="https://...">
                </div>

                <hr>

                
                <h5><i class="fas fa-map-marker-alt"></i> Sitios incluidos</h5>
                <p class="text-muted">Agrega los sitios que formarán parte de esta ruta.</p>

                <div id="sitios-container">
                   
                </div>

                <button type="button" class="add-sitio-btn mb-4" onclick="agregarSitio()">
                    <i class="fas fa-plus"></i> Agregar sitio
                </button>

                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <a href="select-sitios.php" class="btn btn-danger">Cancelar</a>
                    <button type="submit" class="btn btn-success">Guardar Ruta</button>
                </div>
            </form>
        </div>
    </div>
                    
    <script>
        let sitioIndex = 0;
        const sitiosData = <?= json_encode($sitios) ?>;

        function agregarSitio() {
            const container = document.getElementById('sitios-container');

            const div = document.createElement('div');
            div.className = 'sitio-item';
            div.innerHTML = `
                <button type="button" class="remove-btn" onclick="this.parentElement.remove()">×</button>
                <div class="row g-3">
                    <div class="col-md-5">
                        <label class="form-label">Sitio *</label>
                        <select name="sitios[${sitioIndex}][id]" class="form-select" required>
                            <option value="">Selecciona un sitio</option>
                            ${sitiosData.map(s => `<option value="${s.id}">${s.nombre}</option>`).join('')}
                        </select>
                    </div>
                    <div class="col-md-3">
                        <label class="form-label">Orden</label>
                        <input type="number" name="sitios[${sitioIndex}][orden]" class="form-control" value="${sitioIndex + 1}" min="1">
                    </div>
                    <div class="col-md-12 mt-2">
                        <label class="form-label">Texto descriptivo</label>
                        <textarea name="sitios[${sitioIndex}][texto]" class="form-control" rows="2"></textarea>
                    </div>
                </div>
            `;
            container.appendChild(div);
            sitioIndex++;
        }

   
        document.addEventListener('DOMContentLoaded', () => {
            agregarSitio();
        });
    </script>
</body>
</html>