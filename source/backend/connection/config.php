<?php
    declare(strict_types=1);

    $servidor = $_SERVER['HTTP_HOST'];
    $path_actual = $_SERVER['PHP_SELF'];
    $host = "localhost";
    $dbname = "ingles_a21";
    $username = "root";
    $password = "root";
    $driver = "mysql";

    if (!defined('__CONFIG__')) {
        define('__CONFIG__', true);
        define('ROOT_PATH', $servidor);
        define('ROOT', __DIR__);
        define('RUTA_ACTUAL', $path_actual);
        define("HOST", $host);
        define("DB", $dbname);
        define("USUARIO", $username);
        define("CLAVE", $password);
        define("DRIVER", $driver);
    }
?>
