<?php
    require_once("../connection/conexion.php");
    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'GET':
            $stmt = $conexion->prepare("SELECT * FROM examenes ORDER BY fecha ASC");
            $stmt->execute();
            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
            break;

        case 'POST':
            $data = json_decode(file_get_contents("php://input"), true);
            $sql = "INSERT INTO examenes (fecha, descripcion) VALUES (:fecha, :descripcion)";
            $stmt = $conexion->prepare($sql);
            $stmt->bindParam(':fecha', $data['fecha']);
            $stmt->bindParam(':descripcion', $data['descripcion']);
            $stmt->execute();
            echo json_encode(["mensaje" => "Examen añadido correctamente"]);
            break;

        case 'PUT':
            $data = json_decode(file_get_contents("php://input"), true);
            $sql = "UPDATE examenes SET fecha=:fecha, descripcion=:descripcion WHERE id_examen=:id";
            $stmt = $conexion->prepare($sql);
            $stmt->bindParam(':fecha', $data['fecha']);
            $stmt->bindParam(':descripcion', $data['descripcion']);
            $stmt->bindParam(':id', $data['id_examen']);
            $stmt->execute();
            echo json_encode(["mensaje" => "Examen actualizado correctamente"]);
            break;

        case 'DELETE':
            if (isset($_GET['id'])) {
                $stmt = $conexion->prepare("DELETE FROM examenes WHERE id_examen = :id");
                $stmt->bindParam(':id', $_GET['id']);
                $stmt->execute();
                echo json_encode(["mensaje" => "Examen eliminado correctamente"]);
            }
            break;

        default:
            echo json_encode(["error" => "Método no permitido"]);
            break;
    }
?>