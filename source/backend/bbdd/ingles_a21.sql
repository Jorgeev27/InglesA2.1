-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 29-11-2025 a las 21:04:46
-- Versión del servidor: 8.4.3
-- Versión de PHP: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ingles_a21`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clases`
--

CREATE TABLE `clases` (
  `id_clase` int NOT NULL,
  `semana` int NOT NULL,
  `dia` enum('martes','jueves') COLLATE utf8mb4_spanish_ci NOT NULL,
  `fecha` date NOT NULL,
  `descripcion` text COLLATE utf8mb4_spanish_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `clases`
--

INSERT INTO `clases` (`id_clase`, `semana`, `dia`, `fecha`, `descripcion`) VALUES
(1, 1, 'martes', '2025-09-23', 'Presentaciones iniciales.'),
(2, 1, 'jueves', '2025-09-25', 'Repaso del martes + canción \"Imagin\" de John Lennon.'),
(3, 47, 'martes', '2025-11-18', 'Pág.28 (2b-Paragraph Pág. 29, 2c), Pág.29 (3a, 3c), Writing'),
(4, 46, 'jueves', '2025-11-13', 'Clases online (Pág.29)');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clases_detalle`
--

CREATE TABLE `clases_detalle` (
  `id_clase` int NOT NULL,
  `semana` int NOT NULL,
  `dia` enum('martes','jueves') COLLATE utf8mb4_spanish_ci NOT NULL,
  `fecha` date NOT NULL,
  `descripcion` text COLLATE utf8mb4_spanish_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `clases_detalle`
--

INSERT INTO `clases_detalle` (`id_clase`, `semana`, `dia`, `fecha`, `descripcion`) VALUES
(1, 48, 'jueves', '2025-11-27', 'Unidad 2: Revisión (Págs. 32-37).');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `examenes`
--

CREATE TABLE `examenes` (
  `id_examen` int NOT NULL,
  `fecha` date NOT NULL,
  `descripcion` text COLLATE utf8mb4_spanish_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fotos`
--

CREATE TABLE `fotos` (
  `id_foto` int NOT NULL,
  `id_clase` int NOT NULL,
  `url_foto` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clases`
--
ALTER TABLE `clases`
  ADD PRIMARY KEY (`id_clase`);

--
-- Indices de la tabla `clases_detalle`
--
ALTER TABLE `clases_detalle`
  ADD PRIMARY KEY (`id_clase`);

--
-- Indices de la tabla `examenes`
--
ALTER TABLE `examenes`
  ADD PRIMARY KEY (`id_examen`);

--
-- Indices de la tabla `fotos`
--
ALTER TABLE `fotos`
  ADD PRIMARY KEY (`id_foto`),
  ADD KEY `id_clase` (`id_clase`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clases`
--
ALTER TABLE `clases`
  MODIFY `id_clase` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `clases_detalle`
--
ALTER TABLE `clases_detalle`
  MODIFY `id_clase` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `examenes`
--
ALTER TABLE `examenes`
  MODIFY `id_examen` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fotos`
--
ALTER TABLE `fotos`
  MODIFY `id_foto` int NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `fotos`
--
ALTER TABLE `fotos`
  ADD CONSTRAINT `fotos_ibfk_1` FOREIGN KEY (`id_clase`) REFERENCES `clases` (`id_clase`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
