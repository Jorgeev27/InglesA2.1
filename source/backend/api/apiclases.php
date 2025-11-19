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
        $data = json_decode(file_get_contents("php://input"));

        $fecha = $data->fecha;
        $descripcion = $data->descripcion;

        // validar martes o jueves
        $diaIngles = strtolower(date("l", strtotime($fecha)));
        $convertir = [
            "tuesday" => "martes",
            "thursday" => "jueves"
        ];

        if (!isset($convertir[$diaIngles])) {
            echo json_encode(["error" => "Solo se permiten clases martes o jueves"]);
            exit;
        }

        $dia = $convertir[$diaIngles];
        $semana = date("W", strtotime($fecha));

        $sql = "INSERT INTO clases (semana, dia, fecha, descripcion)
                VALUES (:semana, :dia, :fecha, :descripcion)";
        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(':semana', $semana);
        $stmt->bindParam(':dia', $dia);
        $stmt->bindParam(':fecha', $fecha);
        $stmt->bindParam(':descripcion', $descripcion);
        $stmt->execute();

        echo json_encode(["success" => true]);
        break;

    default:
        echo json_encode(["error" => "Método no permitido"]);
        break;
}
