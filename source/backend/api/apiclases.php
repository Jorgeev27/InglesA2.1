<?php
    require_once("../connection/conexion.php");
    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'GET':
            $stmt = $conexion->prepare("SELECT * FROM clases ORDER BY fecha ASC");
            $stmt->execute();
            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
            break;

        case 'POST':
            $data = json_decode(file_get_contents("php://input"), true);
            $sql = "INSERT INTO clases (semana, dia, fecha, descripcion) VALUES (:semana, :dia, :fecha, :descripcion)";
            $stmt = $conexion->prepare($sql);
            $stmt->bindParam(':semana', $data['semana']);
            $stmt->bindParam(':dia', $data['dia']);
            $stmt->bindParam(':fecha', $data['fecha']);
            $stmt->bindParam(':descripcion', $data['descripcion']);
            $stmt->execute();
            echo json_encode(["mensaje" => "Clase añadida correctamente"]);
            break;

        case 'PUT':
            $data = json_decode(file_get_contents("php://input"), true);
            $sql = "UPDATE clases SET semana=:semana, dia=:dia, fecha=:fecha, descripcion=:descripcion WHERE id_clase=:id";
            $stmt = $conexion->prepare($sql);
            $stmt->bindParam(':semana', $data['semana']);
            $stmt->bindParam(':dia', $data['dia']);
            $stmt->bindParam(':fecha', $data['fecha']);
            $stmt->bindParam(':descripcion', $data['descripcion']);
            $stmt->bindParam(':id', $data['id_clase']);
            $stmt->execute();
            echo json_encode(["mensaje" => "Clase actualizada correctamente"]);
            break;

        case 'DELETE':
            if (isset($_GET['id'])) {
                $stmt = $conexion->prepare("DELETE FROM clases WHERE id_clase = :id");
                $stmt->bindParam(':id', $_GET['id']);
                $stmt->execute();
                echo json_encode(["mensaje" => "Clase eliminada correctamente"]);
            }
            break;

        default:
            echo json_encode(["error" => "Método no permitido"]);
            break;
    }
?>