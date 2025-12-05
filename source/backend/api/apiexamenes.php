<?php
require_once("../connection/conexion.php");
header("Content-Type: application/json; charset=UTF-8");

$method = $_SERVER['REQUEST_METHOD'];
$accion = $_GET['accion'] ?? 'listar';

switch($accion){
    case 'listar':
        $stmt = $conexion->prepare("SELECT * FROM examenes ORDER BY fecha ASC");
        $stmt->execute();
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;

    case 'insertar':
        $data = json_decode(file_get_contents("php://input"), true);
        $stmt = $conexion->prepare("INSERT INTO examenes (fecha, descripcion) VALUES (:fecha, :descripcion)");
        $stmt->bindParam(':fecha', $data['fecha']);
        $stmt->bindParam(':descripcion', $data['descripcion']);
        $stmt->execute();
        echo json_encode(["mensaje" => "Examen añadido correctamente"]);
        break;

    default:
        echo json_encode(["error" => "Acción no permitida"]);
        break;
}
?>
