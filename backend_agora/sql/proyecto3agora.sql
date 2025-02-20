-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 05-02-2025 a las 08:55:30
-- Versión del servidor: 8.0.40
-- Versión de PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyecto3agora`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `COMENTARIO`
--

CREATE TABLE `comentario` (
  `id_comentario` int NOT NULL,
  `texto` varchar(300) NOT NULL,
  `fecha_creacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `id_publicacion` int NOT NULL,
  `nombre_usuario` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'puede ser nulo (anonimo)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `COMENTARIO`
--

INSERT INTO `comentario` (`id_comentario`, `texto`, `fecha_creacion`, `id_publicacion`, `nombre_usuario`) VALUES
(1, '¡Muy interesante! La IA está cambiando todo.', '2025-01-28 18:10:00', 1, 'Ana'),
(2, 'No estoy de acuerdo, los humanos siempre serán necesarios.', '2025-01-28 18:15:00', 1, 'Carlos'),
(3, '¿Qué piensan sobre el impacto en la educación?', '2025-01-29 09:30:00', 1, 'Maria'),
(4, 'El futuro es incierto, pero emocionante.', '2025-01-29 10:00:00', 2, 'Pedro'),
(5, 'La tecnología avanza muy rápido.', '2025-01-30 14:20:00', 2, 'Laura'),
(6, 'Los programadores van a desaparecer, ya que la IA va a sustituirlos en la mayoría de las empresas dejando pocos puestos.', '2025-01-31 19:36:47', 1, 'Pepe'),
(7, 'anda q noooooo eeee o no sabeeeeasdasdasdasd', '2025-02-04 09:28:07', 2, ''),
(8, 'Prueba', '2025-02-04 17:59:51', 1, ''),
(9, 'asdasdasd', '2025-02-04 18:05:03', 2, 'asdasdasd'),
(10, 'Prueba comentario 2', '2025-02-05 08:20:22', 1, 'Pepe'),
(11, 'Prueba comentario 3 anonimo', '2025-02-05 08:20:35', 2, ''),
(12, 'La IA también tiene sus riesgos.', '2025-02-05 10:00:00', 1, 'Sofia'),
(13, 'Me encanta cómo la tecnología mejora nuestras vidas.', '2025-02-05 11:00:00', 2, 'Javier'),
(14, '¿Qué pasará con los trabajos manuales?', '2025-02-05 12:00:00', 1, 'Lucia'),
(15, 'El futuro es ahora.', '2025-02-05 13:00:00', 2, 'Miguel');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `PUBLICACION`
--

CREATE TABLE `publicacion` (
  `id_publicacion` int NOT NULL,
  `titulo` varchar(150) NOT NULL,
  `texto` text NOT NULL,
  `fecha_creacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `nombre_usuario` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'puede ser nulo (anonimo)',
  `tema` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `PUBLICACION`
--

INSERT INTO `publicacion` (`id_publicacion`, `titulo`, `texto`, `fecha_creacion`, `nombre_usuario`, `tema`) VALUES
(1, 'El futuro con la Inteligencia Artificial', 'La inteligencia artificial (IA) está transformando el mundo a un ritmo sin precedentes.\nDesde asistentes virtuales hasta sistemas de conducción autónoma, su impacto se extiende a casi todos los aspectos de la vida.\nPero, ¿cómo será el futuro con la IA?\n\nEn el ámbito laboral, la IA automatizará tareas repetitivas y optimizará la toma de decisiones, permitiendo a los humanos enfocarse en actividades creativas y estratégicas.\nSin embargo, esto también plantea desafíos, como la necesidad de nuevas habilidades y la adaptación del mercado laboral.\n\nEn la salud, los algoritmos de IA podrán diagnosticar enfermedades con mayor precisión que los médicos, personalizar tratamientos y acelerar la investigación de nuevos medicamentos.\nEsto podría traducirse en una esperanza de vida más larga y una mejor calidad de vida para muchas personas.\n\nEl transporte también cambiará radicalmente.\nLos vehículos autónomos reducirán accidentes y optimizarán el tráfico, mientras que la logística inteligente hará que las entregas sean más rápidas y eficientes.\n\nSin embargo, el avance de la IA también plantea dilemas éticos.\n¿Cómo se regulan los sistemas de IA para evitar sesgos y decisiones injustas?\n¿Hasta qué punto debería la IA reemplazar a los humanos en ciertos trabajos?\n\nA pesar de estos desafíos, el futuro con la IA promete ser emocionante.\nSi se usa de manera responsable, esta tecnología puede mejorar nuestras vidas y resolver problemas globales.\nLa clave estará en encontrar el equilibrio entre el avance tecnológico y los valores humanos.', '2025-01-28 18:09:46', 'Luis', 'Actualidad'),
(2, '¿Qué nos espera el mañana?', 'El futuro siempre ha sido un misterio para la humanidad. Nos preguntamos qué avances tecnológicos transformarán nuestras vidas, cómo evolucionarán nuestras sociedades y qué desafíos enfrentaremos. En un mundo en constante cambio, donde la inteligencia artificial, la automatización y la exploración espacial avanzan a pasos agigantados, es imposible no reflexionar sobre lo que nos depara el mañana.\n\nLas oportunidades parecen infinitas: nuevas formas de energía sostenible, avances en la medicina que podrían erradicar enfermedades y una interconectividad global aún mayor. Sin embargo, también enfrentamos incertidumbres, como el impacto del cambio climático, la seguridad en la era digital y los cambios en el mercado laboral debido a la automatización.\n\nEl mañana dependerá de las decisiones que tomemos hoy. Si actuamos con responsabilidad, aprovechamos la tecnología para el bienestar común y fomentamos la cooperación, el futuro puede ser prometedor. La clave está en la adaptación, la innovación y, sobre todo, en nuestra capacidad de imaginar y construir un mundo mejor.', '2025-01-28 18:53:58', 'Luisito', 'Tecnología'),
(3, 'El impacto de la IA en la educación', 'La inteligencia artificial está revolucionando la educación. Desde plataformas de aprendizaje personalizado hasta sistemas de evaluación automatizada, la IA está cambiando cómo aprendemos y enseñamos.', '2025-01-29 09:00:00', 'Ana', 'Educación'),
(4, 'El futuro del trabajo', 'Con la automatización y la IA, el mercado laboral está experimentando cambios drásticos. ¿Cómo nos adaptaremos a estos cambios?', '2025-01-30 10:00:00', 'Carlos', 'Trabajo'),
(5, 'La ética en la IA', 'La inteligencia artificial plantea importantes cuestiones éticas. ¿Cómo garantizamos que la IA se use de manera justa y responsable?', '2025-01-31 11:00:00', 'Maria', 'Ética'),
(6, 'El futuro de la medicina', 'La IA está transformando la medicina, desde diagnósticos más precisos hasta tratamientos personalizados.', '2025-02-01 12:00:00', 'Pedro', 'Salud'),
(7, 'Prueba', 'Pruebaasdasdasda', '2025-02-04 13:37:35', 'Prueba', 'Actualidad'),
(8, 'El futuro de la energía', 'Las energías renovables y la IA están cambiando cómo producimos y consumimos energía.', '2025-02-02 14:00:00', 'Laura', 'Energía'),
(9, 'El futuro del transporte', 'Los vehículos autónomos y la logística inteligente están revolucionando el transporte.', '2025-02-03 15:00:00', 'Javier', 'Transporte'),
(10, 'El futuro de la comunicación', 'La IA está cambiando cómo nos comunicamos, desde asistentes virtuales hasta traducción automática.', '2025-02-04 16:00:00', 'Sofia', 'Comunicación');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `COMENTARIO`
--
ALTER TABLE `comentario`
  ADD PRIMARY KEY (`id_comentario`),
  ADD KEY `id_publicacion` (`id_publicacion`);

--
-- Indices de la tabla `PUBLICACION`
--
ALTER TABLE `publicacion`
  ADD PRIMARY KEY (`id_publicacion`),
  ADD UNIQUE KEY `titulo` (`titulo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `COMENTARIO`
--
ALTER TABLE `comentario`
  MODIFY `id_comentario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `PUBLICACION`
--
ALTER TABLE `publicacion`
  MODIFY `id_publicacion` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `COMENTARIO`
--
ALTER TABLE `comentario`
  ADD CONSTRAINT `comentario_ibfk_1` FOREIGN KEY (`id_publicacion`) REFERENCES `publicacion` (`id_publicacion`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
