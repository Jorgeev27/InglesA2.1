-- Crear la base de datos con collation en español
CREATE DATABASE IF NOT EXISTS ingles_a21
CHARACTER SET utf8mb4
COLLATE utf8mb4_spanish_ci;

USE ingles_a21;

-- ================================================
-- 📘 TABLA: clases
-- ================================================
CREATE TABLE IF NOT EXISTS clases (
    id_clase INT AUTO_INCREMENT PRIMARY KEY,
    semana INT NOT NULL,
    dia ENUM('martes', 'jueves') NOT NULL,
    fecha DATE NOT NULL,
    descripcion TEXT
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_spanish_ci;

-- ================================================
-- 🖼️ TABLA: fotos
-- ================================================
CREATE TABLE IF NOT EXISTS fotos (
    id_foto INT AUTO_INCREMENT PRIMARY KEY,
    id_clase INT NOT NULL,
    url_foto VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_clase) REFERENCES clases(id_clase)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_spanish_ci;

-- ================================================
-- 📅 TABLA: examenes
-- ================================================
CREATE TABLE IF NOT EXISTS examenes (
    id_examen INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    descripcion TEXT
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_spanish_ci;

-- ================================================
-- 🌱 DATOS DE EJEMPLO (opcional)
-- ================================================

INSERT INTO clases (semana, dia, fecha, descripcion)
VALUES 
(1, 'martes', '2025-09-23', 'Presentaciones iniciales.'),
(1, 'jueves', '2025-09-25', 'Repaso del martes + canción "Imagin" de John Lennon.');

INSERT INTO examenes (fecha, descripcion)
VALUES 
('2025-11-05', 'Examen de unidad 1: Present Simple y verb to be.');
