<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type");

    $host = "localhost";
    $user = "root";
    $password = "root";
    $dbname = "ingles_a21";

    try {
        $conexion = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $password);
        $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch(PDOException $e) {
        echo json_encode(["error" => "Error de conexión: " . $e->getMessage()]);
        exit;
    }
?>