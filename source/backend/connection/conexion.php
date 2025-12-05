<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type");

    class ConexionBD {

        public static function Conexion() : PDO {
            $host = "localhost";
            $dbname = "ingles_a21";
            $user = "root";
            $password = "root";

            try {
                $conexion = new PDO(
                    "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
                    $user,
                    $password
                );
                $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                return $conexion;
            } catch (PDOException $e) {
                echo json_encode(["error" => "Error de conexión: " . $e->getMessage()]);
                exit;
            }
        }
    }

    // ⭐ CLAVE: crear la variable global EXACTAMENTE igual que antes
    $conexion = ConexionBD::Conexion();
?>
