DROP DATABASE IF EXISTS turistecz;
CREATE DATABASE turistecz;
USE turistecz;

-- Tabla sitio
CREATE TABLE sitio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    direccion VARCHAR(255),
    longitud DOUBLE,
    latitud DOUBLE,
    horario_visita VARCHAR(255),
    telefono VARCHAR(50),
    enlace_web VARCHAR(255),
    rampas BOOLEAN,
    ascensores BOOLEAN,
    puertas_automaticas BOOLEAN,
    escaleras_mecanicas BOOLEAN,
    acceso_perros_guias BOOLEAN,  
    acceso_perros_asistencia BOOLEAN, -- ESTO ES NUEVO
	servicios BOOLEAN,
	servicios_adaptados BOOLEAN,
    braille BOOLEAN,
    interprete_lengua_signos BOOLEAN,
    videos_subtitulos BOOLEAN,
	ayudas_visuales BOOLEAN,
	cambiador BOOLEAN, -- ESTO ES NUEVO.
    sala_lactancia BOOLEAN,
    guias_turisticos_multiidioma BOOLEAN,
    elementos_audiovisuales_multiidioma BOOLEAN,
    documentacion_multiidioma BOOLEAN,
    visitas_grupales BOOLEAN,
    parking_adaptado BOOLEAN,
	bancos BOOLEAN,
	mostrador_adaptado BOOLEAN,
	ayuda_movilidad BOOLEAN,
    lenguaje_simple BOOLEAN, -- Hay sitios que prestar  Sillas de ruedas o bastones. 
	sin_barreras_arquitectonicas BOOLEAN
);

-- Tabla imagen_sitio
CREATE TABLE imagen_sitio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(255),
    nombre VARCHAR(255),
    copy VARCHAR(255),
    id_sitio INT,
    FOREIGN KEY (id_sitio) REFERENCES sitio(id)
);

-- Tabla ruta
CREATE TABLE ruta (
  id int NOT NULL AUTO_INCREMENT,
  nombre varchar(255),
  descripcion varchar(255),
  duracion varchar(255),
  imagen_destacada varchar(255), 
  subtitulo varchar(255),
  PRIMARY KEY (id)
) ;

-- Tabla sitios_ruta
CREATE TABLE sitios_ruta (
    id_ruta INT,
    id_sitio INT,
    orden INT,
    texto VARCHAR(255),
    PRIMARY KEY (id_ruta, id_sitio),
    FOREIGN KEY (id_ruta) REFERENCES ruta(id),
    FOREIGN KEY (id_sitio) REFERENCES sitio(id)
);

-- Tabla caracteristica
CREATE TABLE caracteristica (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255)
);

-- Tabla caracteristicas_ruta
CREATE TABLE caracteristicas_ruta (
    id_ruta INT,
    id_caracteristica INT,
    PRIMARY KEY (id_ruta, id_caracteristica),
    FOREIGN KEY (id_ruta) REFERENCES ruta(id),
    FOREIGN KEY (id_caracteristica) REFERENCES caracteristica(id)
);

-- tabla usuario
CREATE TABLE usuario(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    apellido VARCHAR(255),
    email VARCHAR(255),
    contrasena VARCHAR(255),
    activo BOOLEAN,
    fecha_creacion DATE
);

CREATE TABLE verification_token(
    id int AUTO_INCREMENT PRIMARY KEY,
    token varchar(255),
    usuario_id int FOREIGN KEY,
    fecha_expiracion date
);




-- Inserción de datos en sitio
--

INSERT INTO sitio (id, nombre, latitud,	longitud, direccion, horario_visita,
telefono, enlace_web, rampas, ascensores, puertas_automaticas, escaleras_mecanicas,
acceso_perros_guias, acceso_perros_asistencia, servicios, servicios_adaptados, 
braille, interprete_lengua_signos, videos_subtitulos, ayudas_visuales, cambiador, 
sala_lactancia,guias_turisticos_multiidioma,elementos_audiovisuales_multiidioma, 
documentacion_multiidioma, visitas_grupales, parking_adaptado, bancos, mostrador_adaptado,	
ayuda_movilidad, lenguaje_simple, sin_barreras_arquitectonicas)
VALUES 
(1, 'Basílica de Nuestra Señora del Pilar', 676641.359, 4613843.186,'Plaza del Pilar, s/n, Casco Antiguo, 50003 Zaragoza',	
NULL, NULL,	NULL, NULL,	TRUE, TRUE,	FALSE, FALSE, NULL, TRUE, TRUE,	TRUE, FALSE, FALSE, FALSE, NULL, FALSE,	
FALSE, TRUE, TRUE, TRUE, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'Palacio de la Aljafería', 675130.806,	4613775.045,	
NULL, NULL,	NULL, NULL,	NULL, TRUE,	TRUE, FALSE, FALSE,	NULL, TRUE, TRUE, TRUE,	FALSE, FALSE,
FALSE, NULL, FALSE,	FALSE, TRUE, TRUE, TRUE, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'Catedral del Salvador o La Seo y Museo de Tapices', 676885.553, 4613613.895,
NULL, NULL, NULL, NULL, NULL, TRUE, TRUE, FALSE, FALSE, NULL, TRUE, TRUE, TRUE, FALSE, FALSE, FALSE, NULL,
FALSE, FALSE, TRUE, TRUE, TRUE, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'Puente de Piedra', 676905.595, 4613895.914,
NULL,NULL,NULL,NULL,NULL,TRUE,TRUE,FALSE,FALSE,NULL,TRUE,TRUE,TRUE,FALSE,FALSE,FALSE,NULL,FALSE,FALSE,TRUE,TRUE,
TRUE,NULL,NULL,	NULL,NULL,NULL,NULL),
(5, 'Puerta del Carmen', 675907.557, 4613058.914,
NULL, NULL ,NULL, NULL,	NULL, TRUE, TRUE, FALSE, FALSE,	NULL, TRUE, TRUE, TRUE, FALSE, FALSE, FALSE,NULL, FALSE,
FALSE, TRUE, TRUE, TRUE, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 'Monumento a los Sitios',	676594.097, 4612963.79,
NULL, NULL,	NULL, NULL,	NULL, TRUE,	TRUE, FALSE, FALSE,	NULL, TRUE,	TRUE, TRUE,	FALSE, FALSE, FALSE, NULL, FALSE,
FALSE, TRUE, TRUE, TRUE, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 'Monumento a Agustina Zaragoza y a las Heroínas',	675773.971,	4613909.76,
NULL, NULL,	NULL, NULL, NULL, TRUE,	TRUE, FALSE, FALSE,	NULL, TRUE,	TRUE, TRUE,	FALSE,	
FALSE, FALSE, NULL, FALSE, FALSE, TRUE, TRUE, TRUE,	NULL, NULL,	NULL, NULL,	NULL, NULL),
(8, 'Torreon de la Zuda',	676383.363, 4613919.495,	
NULL, NULL, NULL, NULL,	NULL, TRUE,	TRUE, FALSE, FALSE,	NULL, TRUE, TRUE, TRUE, FALSE,
FALSE, FALSE, NULL, FALSE, FALSE, TRUE, TRUE, TRUE,	NULL, NULL,	NULL, NULL,	NULL, NULL),
(9, 'Murallas Romanas', 676374.405, 4613870.392,	
NULL, NULL, NULL, NULL, NULL, TRUE,	TRUE, FALSE, FALSE,	NULL, TRUE, TRUE, TRUE,	FALSE,
FALSE, FALSE, NULL,	FALSE, FALSE, TRUE,	TRUE, TRUE, NULL, NULL, NULL, NULL, NULL, NULL),
(10, 'Mercado Central',	676280.622,	4613760.544	,
NULL, NULL,	NULL, NULL,	NULL, TRUE, TRUE, FALSE, FALSE, NULL, TRUE,	TRUE, TRUE,	FALSE,	
FALSE, FALSE, NULL, FALSE, FALSE, TRUE,	TRUE, TRUE, NULL, NULL,	NULL, NULL,	NULL, NULL),
(11, 'Museo de Zaragoza: Secciones de Antigüedad y Bellas Artes', 676655.284, 4612891.748,
NULL, NULL, NULL, NULL,	NULL, TRUE,	TRUE, FALSE, FALSE,	NULL, TRUE,	TRUE, TRUE, FALSE, FALSE, FALSE,
NULL, FALSE, FALSE,	TRUE, TRUE,	TRUE, NULL, NULL, NULL,	NULL, NULL,	NULL),
(12, 'Museo Goya - Colección Ibercaja',	676656.444,	4613612.917,	
NULL, NULL,	NULL, NULL, NULL, TRUE, TRUE, FALSE, FALSE, NULL, TRUE,	TRUE, TRUE,	FALSE, FALSE, 
FALSE, NULL, FALSE, FALSE,	TRUE, TRUE, TRUE, NULL,	NULL, NULL,	NULL, NULL, NULL),
(13, 'Parque Grande José Antonio Labordeta', 675325.621, 4611191.907,	
NULL, NULL, NULL, NULL, NULL, TRUE,	TRUE, FALSE, FALSE, NULL, TRUE, TRUE, TRUE,	FALSE, FALSE,
FALSE, NULL, FALSE, FALSE, TRUE, TRUE, TRUE, NULL, NULL, NULL, NULL, NULL, NULL),
(14, 'Monumento a Goya', 676772.054, 4613722.752,
NULL, NULL,	NULL, NULL, NULL, TRUE, TRUE, FALSE, FALSE, NULL, TRUE, TRUE, TRUE, FALSE, FALSE, FALSE, NULL,
FALSE, FALSE, TRUE, TRUE, TRUE,	NULL, NULL,	NULL, NULL,	NULL, NULL),
(15, 'Escultura El Alma del Ebro',	674331.942, 4615143.408,	
NULL, NULL,	NULL, NULL, NULL, TRUE,	TRUE, FALSE, FALSE,	NULL, TRUE, TRUE, TRUE,	FALSE, FALSE, FALSE,
NULL, FALSE, FALSE,	TRUE, TRUE,	TRUE, NULL,	NULL, NULL, NULL, NULL, NULL),
(16, 'Estatua del Emperador Augusto', 676335.746, 4613833.112,	
NULL, NULL,	NULL, NULL, NULL, TRUE,	TRUE, FALSE, FALSE,	NULL, TRUE,	TRUE, TRUE, FALSE, FALSE, FALSE, NULL,
FALSE,	FALSE,	TRUE, TRUE, TRUE, NULL,	NULL, NULL, NULL, NULL,	NULL),
(17, 'Palacio de los Condes de Morata o Luna', 676219.034, 4613530.502	,
NULL, NULL, NULL, NULL,	NULL, TRUE, TRUE,FALSE, FALSE, NULL, TRUE, TRUE, TRUE, FALSE, FALSE, FALSE,	NULL,	
FALSE, FALSE, TRUE, TRUE, TRUE,	NULL, NULL,	NULL, NULL, NULL, NULL),
(18,'Museo Provincial de Zaragoza: Sección de Etnología y Cerámica', 675064.152, 4611561.368,
NULL, NULL,	NULL, NULL,	NULL, TRUE, TRUE, FALSE, FALSE,	NULL, TRUE,	TRUE, TRUE, FALSE, FALSE, 
FALSE, NULL, FALSE, FALSE, TRUE, TRUE, TRUE, NULL, NULL, NULL, NULL, NULL, NULL),
(19, 'Palacio de los Condes de Sástago', 676356.294, 4613383.558,	
NULL, NULL,	NULL, NULL, NULL, TRUE, TRUE, FALSE, FALSE,	NULL, TRUE,	TRUE, TRUE, FALSE, FALSE, FALSE, NULL,
FALSE, FALSE, TRUE,	TRUE, TRUE,	NULL, NULL, NULL, NULL,	NULL, NULL),
(20,'Casa de los Sitios', 677161.977, 4613254.312,	
NULL, NULL,	NULL, NULL,	NULL, TRUE,	TRUE, FALSE, FALSE, NULL, TRUE, TRUE, TRUE,	FALSE, FALSE, FALSE, NULL, 
FALSE, FALSE, TRUE,	TRUE, TRUE,	NULL, NULL, NULL, NULL,	NULL, NULL),
(21, 'Museo del Foro de Caesaraugusta', 676831.309, 4613671.440,	
NULL, NULL,	NULL, NULL,	TRUE, TRUE, NULL, NULL, NULL, NULL, TRUE, TRUE,	TRUE, TRUE,	TRUE,
TRUE, NULL,	NULL, NULL,	NULL, NULL, NULL, TRUE,	TRUE, TRUE, NULL, NULL, NULL),
(22, 'Museo del Teatro de Caesaraugusta', 676745.991, 4613373.705,	
NULL, NULL, NULL, NULL, TRUE, TRUE, NULL, NULL,	NULL, NULL, TRUE, TRUE,	TRUE, TRUE, TRUE, TRUE,	TRUE,
NULL, NULL,	TRUE, TRUE, NULL, TRUE,	TRUE, TRUE, NULL, NULL,	NULL),
(23, 'Palacio de los Condes de Argillo. Museo Pablo Gargallo', 676309.190, 4613618.596,
NULL, NULL,	NULL, NULL,	NULL, NULL,	NULL, NULL, NULL, NULL,	NULL, NULL, TRUE, TRUE, TRUE, NULL,	NULL,	
NULL, NULL,	NULL, NULL, NULL, NULL,	NULL, NULL, NULL, NULL,	NULL),
(24, 'Alma Mater Museum', 676899.107, 4613712.996,	
NULL, NULL,	NULL, NULL,	TRUE, TRUE,	NULL, NULL, NULL, NULL, TRUE, TRUE,	NULL, NULL,
NULL, NULL, NULL, NULL,	NULL, TRUE, TRUE, NULL, NULL, NULL,	NULL, TRUE, NULL, TRUE),
(25,'La Lonja', 676473.690, 4613864.834,
NULL, NULL, NULL, NULL, TRUE, NULL, NULL,NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
NULL, NULL,	NULL, NULL,	NULL, NULL,	NULL, NULL,	NULL, NULL, TRUE, NULL,	TRUE),
(26, 'CaixaForum Zaragoza',	675356.535, 4613317.394,	
NULL, NULL,	NULL, NULL,	NULL, TRUE,	TRUE, TRUE, TRUE, TRUE,	TRUE, TRUE,	TRUE, NULL,	
NULL, NULL,	NULL, TRUE, NULL, NULL,	TRUE, TRUE, NULL, NULL, NULL, TRUE,	TRUE, TRUE),
(27, 'Patio de la Infanta', 676178.426, 4612781.704,	
NULL, NULL,	NULL, NULL, NULL, NULL,	NULL, NULL,	NULL, NULL, NULL, NULL,	NULL, NULL,	TRUE,
NULL,NULL,NULL,NULL,NULL,NULL,NULL, NULL, NULL, NULL, TRUE, NULL, TRUE),
(28, 'Centro de Historias de Zaragoza. Antiguo Convento de San Agustín'	,677328.313	,4613192.872,	
NULL,NULL,NULL,NULL,NULL,TRUE,NULL,NULL,TRUE,NULL,TRUE,	TRUE,NULL,NULL,	NULL,	
NULL,NULL,NULL,NULL,NULL,NULL,NULL,TRUE,NULL,NULL,NULL,NULL,TRUE),
(29, 'Iglesia de San Pablo',676025.981	,4613754.514,	
NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,	
NULL,NULL,NULL,	NULL,NULL,TRUE,	NULL,NULL,NULL,	NULL,NULL,NULL,NULL),
(30, 'Iglesia Parroquial de Santa Maria Magdalena',605468.942	,4639913.157,	
NULL,NULL,NULL,	NULL,NULL,NULL,	NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,	
NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(31, 'Acuario de Zaragoza',	674937.596,	4615178.821,	
NULL,NULL,NULL,NULL,TRUE,TRUE,NULL,	NULL,TRUE,TRUE,TRUE,TRUE,NULL,	NULL,	NULL,	
TRUE,NULL,NULL,NULL,NULL,NULL,NULL,TRUE,NULL,NULL,NULL,NULL,NULL),
-- (32, 'Parque de Atracciones', 674929.317,	4609976.512,	
-- NULL,NULL,NULL,NULL,TRUE,NULL,NULL,NULL,NULL,NULL,TRUE,TRUE,NULL,NULL,NULL,
-- NULL,NULL,NULL,NULL,NULL,NULL,NULL,TRUE,NULL,NULL,NULL,NULL,NULL),
(32, 'Antiguo Convento de la Victoria. Museo del Fuego y de los Bomberos',675987.540, 4613460.272	,
NULL,NULL,NULL,NULL,TRUE,TRUE,NULL,NULL,TRUE,TRUE,TRUE,NULL,NULL,NULL,NULL,	
NULL,NULL,NULL,NULL,NULL,NULL,TRUE,NULL,NULL,NULL,NULL,TRUE, TRUE),
(33, 'Parque Metropolitano del Agua Luis Buñuel',674469.478, 4615526.593	,
NULL,NULL,NULL,NULL,TRUE,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL, NULL, NULL,	
NULL,NULL,NULL,NULL,NULL,NULL,TRUE,NULL,NULL,NULL,NULL,TRUE),
(34, 'Museo de Ciencias Naturales de la Universidad de Zaragoza',675984.774, 4612798.395	,
NULL, NULL, NULL, NULL, TRUE, NULL ,NULL ,NULL, NULL, NULL, NULL, NULL, NULL, NULL, TRUE,	
NULL, NULL, NULL, NULL,TRUE,TRUE, TRUE, NULL, NULL, NULL, TRUE, NULL, NULL),
(35, 'Museo de las Termas Públicas de Caesaraugusta',676769.806,4613469.059,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,
NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(36, 'Museo del Puerto Fluvial de Caesaraugusta',676951.659,4613680.185,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,	NULL,	NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,
NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(37, 'Canal Imperial de Aragón',676165.758,4611216.248,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,	NULL,	NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,
NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);

-- Inserción de datos en imagen_sitio
INSERT INTO imagen_sitio (id, nombre, url, copy, id_sitio) VALUES
(1, 'Basílica del Pilar', 'images/images_sitios/1_Pilar.jpg', '“Zaragoza” por Gregorio Puga Bailón, CC BY 2.0', 1),
(2, 'Palacio de la Aljafería', 'images/images_sitios/2_aljaferia.jpg', '"Aljafería Palace, Zaragoza” por Aleksandr Zykov, CC BY-SA 2.0', 2),
(3, 'Catedral del Salvador o de La Seo', 'images/images_sitios/3_laSeo.jpg', '“La Seo” por Xiquinho Silva, CC BY 2.0', 3),
(4, 'Puente de Piedra', 'images/images_sitios/11_puentePiedra.jpg', '“Puente de Piedra” por Rab Lawrence, CC BY 2.0', 4),
(5, 'Puerta del Carmen', 'images/images_sitios/20_Puerta_del_Carmen.jpg', 'Por Escarlati - Trabajo propio, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=1077770', 5),
(6, 'Monumento a los Sitios', 'images/images_sitios/12_monumentoSitios.jpg', 'FRANCIS RAHER, CC BY 2.0,"Monumento a Los Sitios-Zaragoza"', 6),
(7, 'Monumento a Agustina', 'images/images_sitios/13_monumentoAgustina.jpg', 'FRANCIS RAHER, CC BY 2.0, https://commons.wikimedia.org/w/index.php?curid=44296527', 7),
(8, 'Torreón de La Zuda', 'images/images_sitios/15_TorreonLaZuda.jpg', '“Torreón de la Zuda (Zaragoza)” por santiago lopez-pastor, CC BY-ND 2.0', 8),
(9, 'Murallas', 'images/images_sitios/10_murallas.jpg', '"Murallas romanas de Zaragoza" Escarlati , CC BY 3.0', 9),
(10, 'Mercado Central', 'images/images_sitios/16_MercadoCentral.jpg', '', 10),
(11, 'Museo de Zaragoza', 'images/images_sitios/4_museoZaragoza.jpg', '“Museo de Zaragoza” por santiago lopez-pastor, CC BY-ND 2.0', 11),
(12, 'Museo Goya', 'images/images_sitios/5_MuseoGoya.jpg', '“Casa_de_los_Pardo-Museo_Camon_Aznar”  de Escarlati (Multi-license with GFDL and Creative Commons CC-BY 2.5)', 12),
(13, 'Parque Grande', 'images/images_sitios/7_parqueGrande.jpg', 'Por User:Archivaldo - Foto propia, Dominio público, https://commons.wikimedia.org/w/index.php?curid=2525910', 13),
(14, 'Monumento Goya', 'images/images_sitios/8_monumentoGoya.jpg', '“The monument of Francisco de Goya in Zaragoza, Spain” ?????? ?????????, CC BY 3.0', 14),
(15, 'Escultura "Alma del Ebro"', 'images/images_sitios/9_esculturaAlmaDelEbro.jpg', '“Alma del Ebro” por Juanedc.com, CC BY 2.0', 15),
(16, 'Estatua Emperador Augusto', 'images/images_sitios/14_EstatuaEmperadorAugusto.jpg', 'Estatua de César Augusto en Zaragoza, Ajzh2074, CC BY 4.0', 16),
(17, 'Palacio Condes de Morata', 'images/images_sitios/17_PalacioCondesMorata.jpg', '“Palacio de los Condes de Morata (1)” por santiago lopez-pastor, CC BY-ND 2.0', 17),
(18, 'Museo Provincial de Etnografía', 'images/images_sitios/18_museoProvincialEtnografia.jpg', 'Willtron CC BY-SA 3.0', 18),
(19, 'Palacio de los Condes de Sástago', 'images/images_sitios/19_palacioCondesSastago.jpg', 'Por ecelan - Self-published work by ecelan, CC BY 2.5, https://commons.wikimedia.org/w/index.php?curid=1093755', 19),
(20, 'Casa de los Sitios', 'images/images_sitios/21_casaDeLosSitios.jpg', 'Por Ajzh2074 - Trabajo propio, CC BY-SA 3.0 es, https://commons.wikimedia.org/w/index.php?curid=21385817', 20),
(21, 'Museo del Foro de Caesaraugusta', NULL, NULL, 21),
(22, 'Museo del Teatro de Caesaraugusta', NULL, NULL, 22),
(23, 'Palacio de los Condes de Argillo. Museo Pablo Gargallo', NULL, NULL, 23),
(24, 'Alma Mater Museum', NULL, NULL, 24),
(25, 'La Lonja', NULL, NULL, 25),
(26, 'CaixaForum Zaragoza', NULL, NULL, 26),
(27, 'Patio de la Infanta', NULL, NULL, 27),
(28, 'Centro de Historias de Zaragoza. Antiguo Convento de San Agustín', NULL, NULL, 28),
(29, 'Iglesia de San Pablo', NULL, NULL, 29),
(30, 'Iglesia Parroquial de Santa Maria Magdalena', NULL, NULL, 30),
(31, 'Acuario de Zaragoza', NULL, NULL, 31),
-- (32, 'Parque de Atracciones', NULL, NULL, 32),
(32, 'Antiguo Convento de la Victoria. Museo del Fuego y de los Bomberos', NULL, NULL, 32),
(33, 'Parque Metropolitano del Agua Luis Buñuel', NULL, NULL, 33),
(34, 'Museo de Ciencias Naturales de la Universidad de Zaragoza', NULL, NULL, 34),
(35, 'Museo de las Termas Públicas de Caesaraugusta', NULL, NULL, 35),
(36, 'Museo del Puerto Fluvial de Caesaraugusta', NULL, NULL, 36),
(37, 'Canal Imperial de Aragón', NULL, NULL, 37);

-- -- Insert data into ruta
INSERT INTO ruta (nombre, descripcion, duracion, imagen_destacada, subtitulo) VALUES 
("Ruta Mudéjar","La mejor arquitectura de Zaragoza","2 horas","imagen1","subtitulo"),
("Ruta Romana","La mejor romana de Zaragoza","2 horas","imagen2","subtitulo"),
("Ruta Histórica","La mejor historia de Zaragoza","2 horas","imagen3","subtitulo"),
("Ruta al Aire Libre","Los mejores parques de Zaragoza","3 horas","imagen4","subtitulo"),
("Ruta Familiar","La mejor arquitectura de Zaragoza","2 horas","imagen5","subtitulo");


-- -- Insert data into sitios_ruta
INSERT INTO sitios_ruta (id_ruta, id_sitio, orden, texto) VALUES 
-- RUTA MUDEJAR
(1,29,1,"LA MEJOR IGLESIA"),
(1,2,2,"LA MEJOR IGLESIA"),
(1,20,3,"LA MEJOR IGLESIA"),
(1,30,4,"LA MEJOR IGLESIA"),
-- RUTA ROMANA
(2,22,1,"LA MEJOR ruta romana"),
(2,21,2,"LA ruta romana"),
(2,8,3,"LA MEJOR muralla"),
(2,35,4,"LA MEJOR muralla"),
(2,36,5,"LA MEJOR muralla"),

-- RUTA HISTÓRICA
(3,1,1,"LA MEJOR  HISTORIA"),
(3,2,2,"LA MEJOR HISTORIA"),
(3,3,3,"LA MEJOR HISTORIA"),
(3,9,4,"LA MEJOR HISTORIA"),
(3,25,5,"LA MEJOR HISTORIA"),

-- RUTA AL AIRE LIBRE
(4,12,1,"el mejor aire"),
(4,33,2,"el mejor aire"),
(4,37,3,"el mejor aire"),


-- RUTA FAMILIAR

(5,31,1,"LA MEJOR FAMILIA"),
(5,12,2,"LA MEJOR FAMILIA"),
(5,30,3,"LA MEJOR FAMILIA"),
(5,32,4,"LA MEJOR FAMILIA"),
(5,34,5,"LA MEJOR FAMILIA");


INSERT INTO usuario (nombre, apellido, email, contrasena, activo, fecha_creacion) VALUES 
('Alvaro', 'Samcho', 'asfswgew@gmail.com', 'contrasena', true, CURRENT_DATE),
('Alvaro', 'sdgsdgsd', 'sdhshshs@gmail.com', 'contrasenaa', true, current_date),
('Alvaro', 'gsdgdsgsgds', 'hrhsrhsrd@gmail.com', 'contraseena', true, current_date);


-- Insert data into caracteristica
INSERT INTO caracteristica (nombre) VALUES
('Accesibilidad'),
('Patrimonio'),
('Naturaleza'),
('Arte'),
('Historia');

-- -- Insert data into caracteristicas_ruta
 INSERT INTO caracteristicas_ruta (id_ruta, id_caracteristica) VALUES
(1, 2),
(1, 5),
(2, 4),
(2, 2),
(3, 1),
(3, 3);