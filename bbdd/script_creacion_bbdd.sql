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
    visitable BOOLEAN,
    acceso_perros_guias BOOLEAN,
    servicios BOOLEAN,
    servicios_adaptados BOOLEAN,
    escalones BOOLEAN,
    braille BOOLEAN,
    interprete_lengua_signos BOOLEAN,
    videos_subtitulos BOOLEAN,
    ayudas_visuales BOOLEAN,
    servicios_hombres_cambiador BOOLEAN,
    servicios_mujeres_cambiador BOOLEAN,
    sala_lactancia BOOLEAN,
    guias_turisticos_multiidioma BOOLEAN,
    elementos_audiovisuales_multiidioma BOOLEAN,
    documentacion_multiidioma BOOLEAN,
    visitas_grupales BOOLEAN
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
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255)
);

-- Tabla sitios_ruta
CREATE TABLE sitios_ruta (
    id_ruta INT,
    id_sitio INT,
    orden INT,
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

-- Inserción de datos en sitio
INSERT INTO sitio (
        nombre, latitud, longitud, direccion, horario_visita, telefono, enlace_web,
        rampas, ascensores, puertas_automaticas, escaleras_mecanicas, visitable,
        acceso_perros_guias, servicios, servicios_adaptados, escalones, braille,
        interprete_lengua_signos, videos_subtitulos, ayudas_visuales,
        servicios_hombres_cambiador, servicios_mujeres_cambiador, sala_lactancia,
        guias_turisticos_multiidioma, elementos_audiovisuales_multiidioma,
        documentacion_multiidioma, visitas_grupales
    ) VALUES
('Basilica del Pilar', 676641.359, 4613843.186, NULL, NULL, NULL, NULL, NULL, TRUE, TRUE, FALSE, FALSE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE),
('Catedral del Salvador o La Seo y Museo de Tapices', 676885.553, 4613613.895, NULL, NULL, NULL, NULL, NULL, TRUE, TRUE, FALSE, FALSE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE),
('Puente de piedra', 675119.216, 4613775.429, NULL, NULL, NULL, NULL, NULL, TRUE, TRUE, FALSE, FALSE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE),
('Puerta del Carmen', 675907.557, 4613058.914, NULL, NULL, NULL, NULL, NULL, TRUE, TRUE, FALSE, FALSE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE),
('Monumento a los Sitios', 676594.097, 4612963.79, NULL, NULL, NULL, NULL, NULL, TRUE, TRUE, FALSE, FALSE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE),
('Monumento a Agustina de Aragon', 675773.971, 4613909.76, NULL, NULL, NULL, NULL, NULL, TRUE, TRUE, FALSE, FALSE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE),
('Torreon de la Zuda', 676383.363, 4613919.495, NULL, NULL, NULL, NULL, NULL, TRUE, TRUE, FALSE, FALSE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE),
('Murallas romanas', 676374.405, 4613870.392, NULL, NULL, NULL, NULL, NULL, TRUE, TRUE, FALSE, FALSE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE),
('Mercado Central', 676280.622, 4613760.544, NULL, NULL, NULL, NULL, NULL, TRUE, TRUE, FALSE, FALSE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE),
('Museo de Zaragoza: Secciones de Antiguedad y Bellas Artes', 676655.284, 4612891.748, NULL, NULL, NULL, NULL, NULL, TRUE, TRUE, FALSE, FALSE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE),
('Museo Goya - Coleccion Ibercaja', 676656.444, 4613612.917, NULL, NULL, NULL, NULL, NULL, TRUE, TRUE, FALSE, FALSE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE),
('Parque Grande Jose Antonio Labordeta', 675325.621, 4611191.907, NULL, NULL, NULL, NULL, NULL, TRUE, TRUE, FALSE, FALSE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE),
('Monumento a Goya', 676772.054, 4613722.752, NULL, NULL, NULL, NULL, NULL, TRUE, TRUE, FALSE, FALSE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE),
('Escultura El Alma del Ebro', 674331.942, 4615143.408, NULL, NULL, NULL, NULL, NULL, TRUE, TRUE, FALSE, FALSE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE),
('Estatua del Emperador Augusto', 676335.746, 4613833.112, NULL, NULL, NULL, NULL, NULL, TRUE, TRUE, FALSE, FALSE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE),
('Palacio de los Condes de Morata o Luna', 676219.034, 4613530.502, NULL, NULL, NULL, NULL, NULL, TRUE, TRUE, FALSE, FALSE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE),
('Museo Provincial de Zaragoza: Seccion de Etnologi­a y Ceramica.', 675064.152, 4611561.368, NULL, NULL, NULL, NULL, NULL, TRUE, TRUE, FALSE, FALSE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE),
('Palacio de los Condes de Sastago', 676356.294, 4613383.558, NULL, NULL, NULL, NULL, NULL, TRUE, TRUE, FALSE, FALSE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE),
('Casa de los Sitios', 677161.977, 4613254.312, NULL, NULL, NULL, NULL, NULL, TRUE, TRUE, FALSE, FALSE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE);

-- Inserción de datos en imagen_sitio
INSERT INTO imagen_sitio (id, nombre, url, copy, id_sitio) VALUES
(1, 'Basílica del Pilar', 'images/images_sitios/1_Pilar.jpg', '“Zaragoza” por Gregorio Puga Bailón, CC BY 2.0', 1),
(2, 'Palacio de la Aljafería', 'images/images_sitios/2_aljaferia.jpg', '"Aljafería Palace, Zaragoza” por Aleksandr Zykov, CC BY-SA 2.0', 1),
(3, 'Catedral del Salvador o de La Seo', 'images/images_sitios/3_laSeo.jpg', '“La Seo” por Xiquinho Silva, CC BY 2.0', 2),
(4, 'Museo de Zaragoza', 'images/images_sitios/4_museoZaragoza.jpg', '“Museo de Zaragoza” por santiago lopez-pastor, CC BY-ND 2.0', 10),
(5, 'Museo Goya', 'images/images_sitios/5_MuseoGoya.jpg', '“Casa_de_los_Pardo-Museo_Camon_Aznar”  de Escarlati (Multi-license with GFDL and Creative Commons CC-BY 2.5)', 11),
(6, 'Parque Grande', 'images/images_sitios/7_parqueGrande.jpg', 'Por User:Archivaldo - Foto propia, Dominio público, https://commons.wikimedia.org/w/index.php?curid=2525910', 12),
(7, 'Monumento Goya', 'images/images_sitios/8_monumentoGoya.jpg', '“The monument of Francisco de Goya in Zaragoza, Spain” ?????? ?????????, CC BY 3.0', 13),
(8, 'Escultura "Alma del Ebro"', 'images/images_sitios/9_esculturaAlmaDelEbro.jpg', '“Alma del Ebro” por Juanedc.com, CC BY 2.0', 14),
(9, 'Murallas', 'images/images_sitios/10_murallas.jpg', '"Murallas romanas de Zaragoza" Escarlati , CC BY 3.0', 8),
(10, 'Puente de Piedra', 'images/images_sitios/11_puentePiedra.jpg', '“Puente de Piedra” por Rab Lawrence, CC BY 2.0', 3),
(11, 'Monumento a los Sitios', 'images/images_sitios/12_monumentoSitios.jpg', 'FRANCIS RAHER, CC BY 2.0,"Monumento a Los Sitios-Zaragoza"', 5),
(12, 'Monumento a Agustina', 'images/images_sitios/13_monumentoAgustina.jpg', 'FRANCIS RAHER, CC BY 2.0, https://commons.wikimedia.org/w/index.php?curid=44296527', 6),
(13, 'Estatua Emperador Augusto', 'images/images_sitios/14_EstatuaEmperadorAugusto.jpg', 'Estatua de César Augusto en Zaragoza, Ajzh2074, CC BY 4.0', 15),
(14, 'Torreón de La Zuda', 'images/images_sitios/15_TorreonLaZuda.jpg', '“Torreón de la Zuda (Zaragoza)” por santiago lopez-pastor, CC BY-ND 2.0', 7),
(15, 'Mercado Central', 'images/images_sitios/16_MercadoCentral.jpg', '', 9),
(16, 'Palacio Condes de Morata', 'images/images_sitios/17_PalacioCondesMorata.jpg', '“Palacio de los Condes de Morata (1)” por santiago lopez-pastor, CC BY-ND 2.0', 16),
(17, 'Museo Provincial de Etnografía', 'images/images_sitios/18_museoProvincialEtnografia.jpg', 'Willtron CC BY-SA 3.0', 17),
(18, 'Palacio de los Condes de Sástago', 'images/images_sitios/19_palacioCondesSastago.jpg', 'Por ecelan - Self-published work by ecelan, CC BY 2.5, https://commons.wikimedia.org/w/index.php?curid=1093755', 18),
(19, 'Puerta del Carmen', 'images/images_sitios/20_Puerta_del_Carmen.jpg', 'Por Escarlati - Trabajo propio, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=1077770', 4),
(20, 'Casa de los Sitios', 'images/images_sitios/21_casaDeLosSitios.jpg', 'Por Ajzh2074 - Trabajo propio, CC BY-SA 3.0 es, https://commons.wikimedia.org/w/index.php?curid=21385817', 19);

-- Insert data into ruta
INSERT INTO ruta (nombre) VALUES
('Ruta Histórica'),
('Ruta Cultural'),
('Ruta Accesible');

-- Insert data into sitios_ruta
INSERT INTO sitios_ruta (id_ruta, id_sitio, orden) VALUES
(1, 1, 1),
(1, 2, 2),
(1, 3, 3),
(2, 10, 1),
(2, 11, 2),
(2, 12, 3),
(3, 4, 1),
(3, 5, 2);

-- Insert data into caracteristica
INSERT INTO caracteristica (nombre) VALUES
('Accesibilidad'),
('Patrimonio'),
('Naturaleza'),
('Arte'),
('Historia');

-- Insert data into caracteristicas_ruta
INSERT INTO caracteristicas_ruta (id_ruta, id_caracteristica) VALUES
(1, 2),
(1, 5),
(2, 4),
(2, 2),
(3, 1),
(3, 3);