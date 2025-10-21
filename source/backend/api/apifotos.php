<?php
    require_once("../connection/conexion.php");
    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'GET':
            if (isset($_GET['id_clase'])) {
                $stmt = $conexion->prepare("SELECT * FROM fotos WHERE id_clase = :id_clase");
                $stmt->bindParam(':id_clase', $_GET['id_clase']);
            } else {
                $stmt = $conexion->prepare("SELECT * FROM fotos");
            }
            $stmt->execute();
            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
            break;

        case 'POST':
            if (!empty($_FILES['foto']['name']) && isset($_POST['id_clase'])) {
                $id_clase = $_POST['id_clase'];
                $nombre_archivo = time() . "_" . basename($_FILES['foto']['name']);
                $ruta_destino = "../uploads/" . $nombre_archivo;

                if (move_uploaded_file($_FILES['foto']['tmp_name'], $ruta_destino)) {
                    $sql = "INSERT INTO fotos (id_clase, url_foto) VALUES (:id_clase, :url_foto)";
                    $stmt = $conexion->prepare($sql);
                    $stmt->bindParam(':id_clase', $id_clase);
                    $stmt->bindParam(':url_foto', $ruta_destino);
                    $stmt->execute();

                    echo json_encode(["mensaje" => "Foto subida correctamente", "url" => $ruta_destino]);
                } else {
                    echo json_encode(["error" => "Error al subir la foto"]);
                }
            } else {
                echo json_encode(["error" => "Datos incompletos"]);
            }
            break;

        case 'DELETE':
            if (isset($_GET['id'])) {
                $stmt = $conexion->prepare("SELECT url_foto FROM fotos WHERE id_foto = :id");
                $stmt->bindParam(':id', $_GET['id']);
                $stmt->execute();
                $foto = $stmt->fetch(PDO::FETCH_ASSOC);
                if ($foto) {
                    @unlink($foto['url_foto']);
                    $stmt = $conexion->prepare("DELETE FROM fotos WHERE id_foto = :id");
                    $stmt->bindParam(':id', $_GET['id']);
                    $stmt->execute();
                    echo json_encode(["mensaje" => "Foto eliminada correctamente"]);
                } else {
                    echo json_encode(["error" => "Foto no encontrada"]);
                }
            }
            break;

        default:
            echo json_encode(["error" => "Método no permitido"]);
            break;
    }
?>