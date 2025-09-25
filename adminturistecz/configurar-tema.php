<?php
include 'db.php';
session_start();
if (!isset($_SESSION['user'])) {
    header("Location: login.php");
    exit();
}

$error = $success = '';

// Leer el tema actual desde la base de datos
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
    $stored = json_decode($row['valor'], true);
    if ($stored && isset($stored['name'])) {
        $tema = array_merge($tema, $stored); // Actualiza con lo guardado
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoger todos los colores del formulario
    $nuevo_tema = [
        'name' => $_POST['name'] ?? 'default',
        'color_primary' => $_POST['color_primary'] ?? '#184591',
        'color_secondary' => $_POST['color_secondary'] ?? '#2A8BEA',
        'color_accent' => $_POST['color_accent'] ?? '#42D5A5',
        'gradient_primary_start' => $_POST['gradient_primary_start'] ?? '#1f57b9',
        'gradient_primary_end' => $_POST['gradient_primary_end'] ?? '#8adff5',
        'gradient_home_start' => $_POST['gradient_home_start'] ?? '#8ee3f7',
        'gradient_home_end' => $_POST['gradient_home_end'] ?? '#478ed1',
        'bg_primary' => $_POST['bg_primary'] ?? '#ffffff',
        'bg_secondary' => $_POST['bg_secondary'] ?? '#f0f0f0',
        'text_primary' => $_POST['text_primary'] ?? '#03080a',
        'text_light' => $_POST['text_light'] ?? '#ffffff'
    ];

    // Validar que todos sean colores hex válidos
    foreach ($nuevo_tema as $clave => $valor) {
        if ($clave !== 'name' && !preg_match('/^#([A-Fa-f0-9]{6})$/', $valor)) {
            $error = "El color '$valor' no es válido.";
            break;
        }
    }

    if (!$error) {
        $json_valor = json_encode($nuevo_tema, JSON_UNESCAPED_SLASHES);
        $stmt = $conn1->prepare("UPDATE configuracioncolor SET valor = ? WHERE clave = 'tema_activo'");
        $stmt->bind_param("s", $json_valor);

        if ($stmt->execute()) {
            $success = "Tema actualizado correctamente.";
            $tema = $nuevo_tema; // Actualizar vista
        } else {
            $error = "Error al guardar el tema.";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Configurar Tema - App</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        .color-input-group {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 10px;
        }
        .color-preview {
            width: 40px;
            height: 40px;
            border-radius: 8px;
            border: 1px solid #ddd;
        }
        .preview-box {
            padding: 20px;
            border-radius: 12px;
            margin-top: 20px;
            font-weight: bold;
            text-align: center;
            transition: all 0.3s ease;
        }
    </style>
</head>
<body>
    <div class="container mt-4">
        <h2><i class="fas fa-palette"></i> Configurar Tema de la App</h2>

        <?php if ($error): ?>
            <div class="alert alert-danger"><?= htmlspecialchars($error) ?></div>
        <?php endif; ?>
        <?php if ($success): ?>
            <div class="alert alert-success"><?= htmlspecialchars($success) ?></div>
        <?php endif; ?>

        <form method="POST">
            <!-- Nombre del tema -->
            <div class="mb-3">
                <label class="form-label">Nombre del Tema</label>
                <select name="name" class="form-select" required>
                    <option value="default" <?= $tema['name'] === 'default' ? 'selected' : '' ?>>Default</option>
                    <option value="halloween" <?= $tema['name'] === 'halloween' ? 'selected' : '' ?>>Halloween 🎃</option>
                    <option value="navidad" <?= $tema['name'] === 'navidad' ? 'selected' : '' ?>>Navidad 🎄</option>
                    <option value="primavera" <?= $tema['name'] === 'primavera' ? 'selected' : '' ?>>Primavera 🌸</option>
                </select>
            </div>

            <!-- Colores principales -->
            <div class="row">
                <div class="col-md-6">
                    <h5>Colores Principales</h5>
                    <div class="color-input-group">
                        <label style="width:150px">Color principal</label>
                        <input type="color" name="color_primary" value="<?= htmlspecialchars($tema['color_primary']) ?>" class="form-control form-control-color">
                        <div class="color-preview" style="background:<?= $tema['color_primary'] ?>"></div>
                    </div>
                    <div class="color-input-group">
                        <label style="width:150px">Color secundario</label>
                        <input type="color" name="color_secondary" value="<?= htmlspecialchars($tema['color_secondary']) ?>" class="form-control form-control-color">
                        <div class="color-preview" style="background:<?= $tema['color_secondary'] ?>"></div>
                    </div>
                    <div class="color-input-group">
                        <label style="width:150px">Color acento</label>
                        <input type="color" name="color_accent" value="<?= htmlspecialchars($tema['color_accent']) ?>" class="form-control form-control-color">
                        <div class="color-preview" style="background:<?= $tema['color_accent'] ?>"></div>
                    </div>
                </div>

                <div class="col-md-6">
                    <h5>Fondos y Texto</h5>
                    <div class="color-input-group">
                        <label style="width:150px">Fondo principal</label>
                        <input type="color" name="bg_primary" value="<?= htmlspecialchars($tema['bg_primary']) ?>" class="form-control form-control-color">
                        <div class="color-preview" style="background:<?= $tema['bg_primary'] ?>; border:1px solid #ccc"></div>
                    </div>
                    <div class="color-input-group">
                        <label style="width:150px">Fondo secundario</label>
                        <input type="color" name="bg_secondary" value="<?= htmlspecialchars($tema['bg_secondary']) ?>" class="form-control form-control-color">
                        <div class="color-preview" style="background:<?= $tema['bg_secondary'] ?>; border:1px solid #ccc"></div>
                    </div>
                    <div class="color-input-group">
                        <label style="width:150px">Texto principal</label>
                        <input type="color" name="text_primary" value="<?= htmlspecialchars($tema['text_primary']) ?>" class="form-control form-control-color">
                        <div class="color-preview" style="background:<?= $tema['text_primary'] ?>; border:1px solid #ccc"></div>
                    </div>
                    <div class="color-input-group">
                        <label style="width:150px">Texto claro</label>
                        <input type="color" name="text_light" value="<?= htmlspecialchars($tema['text_light']) ?>" class="form-control form-control-color">
                        <div class="color-preview" style="background:<?= $tema['text_light'] ?>; border:1px solid #ccc"></div>
                    </div>
                </div>
            </div>

            <!-- Degradados -->
            <div class="mt-4">
                <h5>Gradientes</h5>
                <div class="row">
                    <div class="col-md-6">
                        <div class="color-input-group">
                            <label style="width:180px">Inicio gradiente principal</label>
                            <input type="color" name="gradient_primary_start" value="<?= htmlspecialchars($tema['gradient_primary_start']) ?>" class="form-control form-control-color">
                            <div class="color-preview" style="background:<?= $tema['gradient_primary_start'] ?>"></div>
                        </div>
                        <div class="color-input-group">
                            <label style="width:180px">Fin gradiente principal</label>
                            <input type="color" name="gradient_primary_end" value="<?= htmlspecialchars($tema['gradient_primary_end']) ?>" class="form-control form-control-color">
                            <div class="color-preview" style="background:<?= $tema['gradient_primary_end'] ?>"></div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="color-input-group">
                            <label style="width:180px">Inicio gradiente home</label>
                            <input type="color" name="gradient_home_start" value="<?= htmlspecialchars($tema['gradient_home_start']) ?>" class="form-control form-control-color">
                            <div class="color-preview" style="background:<?= $tema['gradient_home_start'] ?>"></div>
                        </div>
                        <div class="color-input-group">
                            <label style="width:180px">Fin gradiente home</label>
                            <input type="color" name="gradient_home_end" value="<?= htmlspecialchars($tema['gradient_home_end']) ?>" class="form-control form-control-color">
                            <div class="color-preview" style="background:<?= $tema['gradient_home_end'] ?>"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Botones -->
            <div class="mt-4 d-grid gap-2 d-md-flex justify-content-md-end">
                <a href="select-sitios.php" class="btn btn-secondary">Volver</a>
                <button type="submit" class="btn btn-primary">Guardar Tema</button>
            </div>
        </form>

        <!-- Previsualización -->
        <div class="mt-4">
            <h6>Previsualización del tema:</h6>
            <div class="preview-box" style="background:linear-gradient(135deg, <?= $tema['gradient_primary_start'] ?>, <?= $tema['gradient_primary_end'] ?>); color:<?= $tema['text_light'] ?>">
                Botón principal • Fondo con gradiente
            </div>
            <div class="preview-box" style="background:<?= $tema['bg_secondary'] ?>; color:<?= $tema['text_primary'] ?>; border:1px solid #ddd">
                Tarjeta • Fondo secundario
            </div>
        </div>
    </div>
</body>
</html>