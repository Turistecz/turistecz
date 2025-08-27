DROP DATABASE IF EXISTS turistecz;
CREATE DATABASE turistecz CHARACTER SET utf8mb4;
USE turistecz;

-- Tabla sitio
CREATE TABLE sitio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    latitud DOUBLE,
	longitud DOUBLE,
    direccion VARCHAR(255),
    horario_visita VARCHAR(255),
    telefono VARCHAR(50),
    enlace_web VARCHAR(255),
    rampas enum ('SI', 'NO', 'NO_HAY_INFORMACION', 'BAJO_PETICION') default 'BAJO_PETICION',
	ascensores enum ('SI', 'NO', 'NO_HAY_INFORMACION', 'BAJO_PETICION') default 'NO_HAY_INFORMACION',
	puertas_automaticas enum ('SI', 'NO', 'NO_HAY_INFORMACION', 'BAJO_PETICION') default 'NO_HAY_INFORMACION',
	escaleras_mecanicas enum ('SI', 'NO', 'NO_HAY_INFORMACION', 'BAJO_PETICION') default 'NO_HAY_INFORMACION',
	servicios_adaptados enum ('SI', 'NO', 'NO_HAY_INFORMACION', 'BAJO_PETICION') default 'NO_HAY_INFORMACION',
	sala_lactancia enum ('SI', 'NO', 'NO_HAY_INFORMACION', 'BAJO_PETICION') default 'NO_HAY_INFORMACION',
	cambiador enum ('SI', 'NO', 'NO_HAY_INFORMACION', 'BAJO_PETICION') default 'NO_HAY_INFORMACION',
	parking_adaptado enum ('SI', 'NO', 'NO_HAY_INFORMACION', 'BAJO_PETICION') default 'NO_HAY_INFORMACION',
	bancos enum ('SI', 'NO', 'NO_HAY_INFORMACION', 'BAJO_PETICION') default 'NO_HAY_INFORMACION',
	mostrador_adaptado enum ('SI', 'NO', 'NO_HAY_INFORMACION', 'BAJO_PETICION') default 'NO_HAY_INFORMACION',
	sin_barreras_arquitectonicas enum ('SI', 'NO', 'NO_HAY_INFORMACION', 'BAJO_PETICION') default 'NO_HAY_INFORMACION',
	braille enum ('SI', 'NO', 'NO_HAY_INFORMACION', 'BAJO_PETICION') default 'NO_HAY_INFORMACION',
	interprete_lengua_signos enum ('SI', 'NO', 'NO_HAY_INFORMACION', 'BAJO_PETICION') default 'NO_HAY_INFORMACION',
	videos_subtitulos enum ('SI', 'NO', 'NO_HAY_INFORMACION', 'BAJO_PETICION') default 'NO_HAY_INFORMACION',
	ayudas_visuales enum ('SI', 'NO', 'NO_HAY_INFORMACION', 'BAJO_PETICION') default 'NO_HAY_INFORMACION',
	guias_turisticos_multiidioma enum ('SI', 'NO', 'NO_HAY_INFORMACION', 'BAJO_PETICION') default 'NO_HAY_INFORMACION',
	elementos_audiovisuales_multiidioma enum ('SI', 'NO', 'NO_HAY_INFORMACION', 'BAJO_PETICION') default 'NO_HAY_INFORMACION',
	documentacion_multiidioma enum ('SI', 'NO', 'NO_HAY_INFORMACION', 'BAJO_PETICION') default 'NO_HAY_INFORMACION',
	visitas_grupales enum ('SI', 'NO', 'NO_HAY_INFORMACION', 'BAJO_PETICION') default 'NO_HAY_INFORMACION',
	ayuda_movilidad enum ('SI', 'NO', 'NO_HAY_INFORMACION', 'BAJO_PETICION') default 'NO_HAY_INFORMACION',
	lenguaje_simple enum ('SI', 'NO', 'NO_HAY_INFORMACION', 'BAJO_PETICION') default 'NO_HAY_INFORMACION',
	acceso_perros_guias enum ('SI', 'NO', 'NO_HAY_INFORMACION', 'BAJO_PETICION') default 'NO_HAY_INFORMACION',
	acceso_perros_asistencia enum ('SI', 'NO', 'NO_HAY_INFORMACION', 'BAJO_PETICION') default 'NO_HAY_INFORMACION'
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
    usuario_id int, 
    FOREIGN KEY(usuario_id) REFERENCES usuario(id),
    fecha_expiracion date
);


CREATE TABLE favoritos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    sitios_id INT NOT NULL,
    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    CONSTRAINT fk_sitio FOREIGN KEY (sitios_id) REFERENCES sitio(id),
    UNIQUE (usuario_id, sitios_id) 
);

-- Inserción de datos en sitio


INSERT INTO sitio (id, nombre, latitud, longitud, direccion, horario_visita,
telefono, enlace_web, rampas, ascensores, puertas_automaticas, escaleras_mecanicas,
servicios_adaptados, sala_lactancia, cambiador, parking_adaptado, bancos, mostrador_adaptado,
sin_barreras_arquitectonicas, braille, interprete_lengua_signos, videos_subtitulos, ayudas_visuales,
guias_turisticos_multiidioma, elementos_audiovisuales_multiidioma, documentacion_multiidioma, 
visitas_grupales, ayuda_movilidad, lenguaje_simple, acceso_perros_guias, acceso_perros_asistencia)

VALUES 
(1, 'Basílica de Nuestra Señora del Pilar', 676641.359, 4613843.186,'Plaza del Pilar, s/n, Casco Antiguo, 50003 Zaragoza',	
NULL, NULL,	NULL, 'NO_HAY_INFORMACION',	'NO_HAY_INFORMACION', 
'SI','NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'SI', 
'SI','SI', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 
'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION',	'NO_HAY_INFORMACION', 'SI', 'SI', 
'SI', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 
'NO_HAY_INFORMACION'),

(2, 'Palacio de la Aljafería', 675130.806,	4613775.045,NULL, 
NULL, NULL, NULL,'NO_HAY_INFORMACION', 'SI',
'SI', 'NO', 'NO', 'NO_HAY_INFORMACION', 'SI', 
'SI', 'SI','NO', 'NO','NO', 
'NO_HAY_INFORMACION', 'NO','NO', 'SI', 'SI', 
'SI', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 
'NO_HAY_INFORMACION'),

(3, 'Catedral del Salvador o La Seo y Museo de Tapices', 676885.553, 4613613.895,NULL, 
NULL, NULL, NULL, 'NO_HAY_INFORMACION', 'SI', 
'SI', 'NO', 'NO', 'NO_HAY_INFORMACION', 'SI', 
'SI', 'SI', 'NO', 'NO', 'NO', 
'NO_HAY_INFORMACION', 'NO', 'NO', 'SI', 'SI', 
'SI', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 
'NO_HAY_INFORMACION'),

(4, 'Puente de Piedra', 676905.595, 4613895.914, NULL,
NULL,NULL,NULL,'NO_HAY_INFORMACION','SI',
'SI','NO','NO','NO_HAY_INFORMACION','SI',
'SI','SI','NO','NO','NO',
'NO_HAY_INFORMACION','NO','NO','SI','SI',
'SI','NO_HAY_INFORMACION','NO_HAY_INFORMACION',	'NO_HAY_INFORMACION','NO_HAY_INFORMACION',
'NO_HAY_INFORMACION'),

(5, 'Puerta del Carmen', 675907.557, 4613058.914, NULL, 
NULL ,NULL, NULL,'NO_HAY_INFORMACION', 'SI', 
'SI', 'NO', 'NO', 'NO_HAY_INFORMACION', 'SI', 
'SI', 'SI', 'NO', 'NO', 'NO',
'NO_HAY_INFORMACION', 'NO', 'NO', 'SI', 'SI', 
'SI', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 
'NO_HAY_INFORMACION'),

(6, 'Monumento a los Sitios',676594.097, 4612963.79, NULL, 
NULL,NULL, NULL,'NO_HAY_INFORMACION', 'SI',	
'SI', 'NO', 'NO', 'NO_HAY_INFORMACION', 'SI', 
'SI', 'SI', 'NO', 'NO', 'NO', 
'NO_HAY_INFORMACION', 'NO','NO', 'SI', 'SI', 
'SI', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 
'NO_HAY_INFORMACION'),

(7, 'Monumento a Agustina Zaragoza y a las Heroínas', 675773.971, 4613909.76, NULL, 
NULL, NULL, NULL, 'NO_HAY_INFORMACION', 'SI',
'SI', 'NO', 'NO','NO_HAY_INFORMACION', 'SI',
'SI', 'SI',	'NO','NO', 'NO',
'NO_HAY_INFORMACION', 'NO', 'NO', 'SI', 'SI', 
'SI','NO_HAY_INFORMACION', 'NO_HAY_INFORMACION',	'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 
'NO_HAY_INFORMACION'),

(8, 'Torreon de la Zuda', 676383.363, 4613919.495, 'Torre de la Zuda, Glorieta Pío XII, 1, Casco Antiguo, 50003 Zaragoza', 
NULL, NULL, NULL,'SI', 'NO',
'NO', 'NO', 'NO', 'NO', 'NO', 
'NO', 'SI', 'NO', 'SI', 'SI', 
'NO', 'NO', 'SI', 'SI', 'SI', 
'SI','SI', 'NO','SI', 'SI',
'SI'),

(9, 'Murallas Romanas', 676374.405, 4613870.392, NULL, 
NULL, NULL, NULL, 'NO_HAY_INFORMACION', 'SI',
'SI', 'NO', 'NO','NO_HAY_INFORMACION', 'SI', 
'SI', 'SI',	'NO','NO', 'NO', 
'NO_HAY_INFORMACION','NO', 'NO', 'SI','SI', 
'SI', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 
'NO_HAY_INFORMACION'),

(10, 'Mercado Central',	676280.622,	4613760.544,
'Av. de César Augusto, 50003 Zaragoza', 'Lunes a Viernes 9:00-14:00h. 17:30-20:00h. Sábados 9:00-14:30h.​', 
'976281998', 'https://www.mercadocentralzaragoza.com/', 'SI', 'SI', 'SI', 'NO', 'SI', 'NO', 'SI','NO', 'SI','NO',	
'SI', 'NO', 'NO', 'NO', 'NO', 'SI',	'NO', 'NO', 'BAJO_PETICION','SI','SI', 'SI','NO'),

(11, 'Museo de Zaragoza: Secciones de Antigüedad y Bellas Artes', 676655.284, 4612891.748,
NULL, NULL, NULL, NULL, 'NO_HAY_INFORMACION', 'SI', 'SI', 'NO', 'NO','NO_HAY_INFORMACION', 'SI','SI', 'NO', 'NO', 'NO',
'NO_HAY_INFORMACION', 'NO', 'NO','SI', 'SI','SI', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 
'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION'),

(12, 'Museo Goya - Colección Ibercaja', 676656.444, 4613612.917,	
NULL, NULL, NULL, NULL, 'NO_HAY_INFORMACION', 'SI', 'SI', 'NO', 'NO', 'NO_HAY_INFORMACION', 'SI','SI', 'SI','NO', 'NO', 
'NO', 'NO_HAY_INFORMACION', 'NO', 'NO', 'SI', 'NO', 'SI', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION',	
'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION'), 

(13, 'Parque Grande José Antonio Labordeta', 675325.621, 4611191.907,	
NULL, NULL, NULL, NULL, 'NO_HAY_INFORMACION', 'SI', 'SI', 'NO', 'NO', 'NO_HAY_INFORMACION', 'SI', 'SI', 'SI', 'NO', 'NO',
'NO', 'NO_HAY_INFORMACION', 'NO', 'NO', 'SI', 'SI', 'SI', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 
'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION'),

(14, 'Monumento a Goya', 676772.054, 4613722.752,
NULL, NULL, NULL, NULL, 'NO_HAY_INFORMACION', 'SI', 'SI', 'NO', 'NO', 'NO_HAY_INFORMACION', 'SI', 'SI', 'SI', 'NO', 'NO', 'NO', 
'NO_HAY_INFORMACION', 'NO', 'NO', 'SI', 'SI', 'SI', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION'),

(15, 'Escultura El Alma del Ebro', 674331.942, 4615143.408,	
NULL, NULL, NULL, NULL, 'NO_HAY_INFORMACION', 'SI', 'SI', 'NO', 'NO','NO_HAY_INFORMACION', 'SI', 'SI', 'SI','NO', 'NO', 'NO',
'NO_HAY_INFORMACION', 'NO', 'NO','SI', 'SI','SI', 'NO_HAY_INFORMACION','NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION'),

(16, 'Estatua del Emperador Augusto', 676335.746, 4613833.112,	
NULL, NULL, NULL, NULL, 'NO_HAY_INFORMACION', 'SI', 'SI', 'NO', 'NO','NO_HAY_INFORMACION', 'SI','SI', 'SI', 'NO', 'NO', 'NO', 
'NO_HAY_INFORMACION', 'NO', 'NO', 'SI', 'SI', 'SI', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION'),

(17, 'Palacio de los Condes de Morata o Luna', 676219.034, 4613530.502,
NULL, NULL, NULL, NULL, 'NO_HAY_INFORMACION', 'SI', 'SI','NO', 'NO', 'NO_HAY_INFORMACION', 'SI', 'SI', 'SI', 'NO', 'NO', 'NO',	
'NO_HAY_INFORMACION', 'SI', 'NO', 'SI', 'SI', 'SI', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION'),

(18, 'Palacio de los Condes de Sástago', 676356.294, 4613383.558,	
NULL, NULL, NULL, NULL, 'NO_HAY_INFORMACION', 'SI', 'SI', 'NO', 'NO','NO_HAY_INFORMACION', 'SI', 'SI', 'SI', 'NO', 'NO', 'NO', 
'NO_HAY_INFORMACION', 'NO', 'NO', 'SI', 'SI', 'SI', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION'),

(19,'Casa de los Sitios', 677161.977, 4613254.312,	
NULL, NULL, NULL, NULL, 'NO_HAY_INFORMACION', 'SI', 'SI', 'NO', 'NO', 'NO_HAY_INFORMACION', 'SI', 'SI', 'SI', 'NO', 'NO', 'NO', 
'NO_HAY_INFORMACION', 'NO', 'NO', 'SI', 'SI', 'SI', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION'),

(20, 'Museo del Foro de Caesaraugusta', 676831.309, 4613671.440,	
'Pl. de la Seo, 2, Casco Antiguo, 50001 Zaragoza', NULL, NULL, NULL, 'SI', 'SI', 'NO', 'NO', 'SI', 
'NO', 'NO', 'NO', 'SI', 'NO', 'SI', 'NO', 'NO', 'SI', 
'SI', 'BAJO_PETICION', 'SI', 'SI', 'BAJO_PETICION', 'NO', 
'NO', 'SI', 'SI'),

(21, 'Museo del Teatro de Caesaraugusta', 676745.991, 4613373.705, 
'C. de San Jorge, 12, Casco Antiguo, 50001 Zaragoza', NULL, NULL, NULL, 'SI', 'SI', 'SI', 'NO', 'SI', 'NO', 'SI', 'NO', 'SI', 
'SI', 'SI', 'NO', 'NO', 'SI', 'SI', 'BAJO_PETICION', 'SI', 'SI', 'BAJO_PETICION', 'NO', 'NO', 'SI', 
'SI'),

(22, 'Palacio de los Condes de Argillo. Museo Pablo Gargallo', 676309.190, 4613618.596, 
NULL, NULL, NULL, NULL, 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 
'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'SI', 'SI', 'SI', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 
'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 
'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION'),

(23, 'Alma Mater Museum', 676899.107, 4613712.996, 
NULL, NULL, NULL, NULL, 'SI', 'SI', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'SI', 'SI', 
'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 
'NO_HAY_INFORMACION', 'SI', 'SI', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'SI', 'NO_HAY_INFORMACION'),

(24, 'La Lonja', 676473.690, 4613864.834, 
NULL, NULL, NULL, NULL, 'SI', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 
'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 
'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 
'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'SI', 'NO_HAY_INFORMACION'),

(25, 'CaixaForum Zaragoza', 675356.535, 4613317.394, 
NULL, NULL, NULL, NULL, 'NO_HAY_INFORMACION', 'SI', 'SI', 'SI', 'SI', 'SI', 'SI', 'SI', 'SI', 'NO_HAY_INFORMACION', 
'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'SI', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'SI', 'SI', 
'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'SI', 'SI'),

(26, 'Patio de la Infanta', 676178.426, 4612781.704, 
NULL, NULL, NULL, NULL, 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 
'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'SI', 'NO_HAY_INFORMACION', 
'NO_HAY_INFORMACION','NO_HAY_INFORMACION','NO_HAY_INFORMACION','NO_HAY_INFORMACION','NO_HAY_INFORMACION','NO_HAY_INFORMACION', 
'NO_HAY_INFORMACION','NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'SI', 'NO_HAY_INFORMACION'),

(27, 'Centro de Historias de Zaragoza. Antiguo Convento de San Agustín', 677328.313, 4613192.872, 
NULL, NULL, NULL, NULL, 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 
'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION','NO_HAY_INFORMACION', 'NO_HAY_INFORMACION','NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 
'NO_HAY_INFORMACION','NO_HAY_INFORMACION','NO_HAY_INFORMACION','NO_HAY_INFORMACION','NO_HAY_INFORMACION','NO_HAY_INFORMACION', 
'NO_HAY_INFORMACION','NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION'),

(28, 'Iglesia de San Pablo', 676025.981, 4613754.514, 
' C. de San Pablo, 42, Casco Antiguo, 50003 Zaragoza', NULL, NULL, NULL, 'BAJO_PETICIÓN', 'NO', 'NO', 'NO', 'NO', 
'NO', 'NO', 'NO', 'SI', 'SI', 'NO', 'NO', 
'NO','NO','NO','SI','SI','SI','SI',
'NO','NO', 'SI', 'SI'),

(29, 'Iglesia Parroquial de Santa Maria Magdalena', 605468.942, 4639913.157, 
NULL, NULL, NULL, NULL, 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION','NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 
'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION','NO_HAY_INFORMACION', 'NO_HAY_INFORMACION','NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 
'NO_HAY_INFORMACION','NO_HAY_INFORMACION','NO_HAY_INFORMACION','NO_HAY_INFORMACION','NO_HAY_INFORMACION','NO_HAY_INFORMACION', 
'NO_HAY_INFORMACION','NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION'),

(30, 'Acuario de Zaragoza', 674937.596, 4615178.821, 
NULL, NULL, NULL, NULL, 'SI','SI','NO_HAY_INFORMACION', 'NO_HAY_INFORMACION','SI','SI','SI','SI','NO_HAY_INFORMACION','NO_HAY_INFORMACION',
'NO_HAY_INFORMACION','SI','NO_HAY_INFORMACION','NO_HAY_INFORMACION','NO_HAY_INFORMACION','NO_HAY_INFORMACION','NO_HAY_INFORMACION',
'NO_HAY_INFORMACION','SI','NO_HAY_INFORMACION','NO_HAY_INFORMACION','NO_HAY_INFORMACION','NO_HAY_INFORMACION'),

(31, 'Antiguo Convento de la Victoria. Museo del Fuego y de los Bomberos', 675987.540, 4613460.272, 
NULL, NULL, NULL, NULL, 'SI','SI','NO_HAY_INFORMACION','NO_HAY_INFORMACION','SI','SI','SI','NO_HAY_INFORMACION','NO_HAY_INFORMACION','NO_HAY_INFORMACION',
'NO_HAY_INFORMACION','NO_HAY_INFORMACION','NO_HAY_INFORMACION','NO_HAY_INFORMACION','NO_HAY_INFORMACION','NO_HAY_INFORMACION','NO_HAY_INFORMACION',
'SI','NO_HAY_INFORMACION','NO_HAY_INFORMACION','NO_HAY_INFORMACION','NO_HAY_INFORMACION','SI'),

(32, 'Parque Metropolitano del Agua Luis Buñuel', 674469.478, 4615526.593, 
NULL, NULL, NULL, NULL, 'SI', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION',
'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION',
'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'SI', 'NO_HAY_INFORMACION'),

(33, 'Museo de Ciencias Naturales de la Universidad de Zaragoza',675984.774, 4612798.395,
NULL, NULL, NULL, NULL, 'SI', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION',
'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'SI',
'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'SI', 'SI', 'SI', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION',
'NO_HAY_INFORMACION', 'SI', 'NO_HAY_INFORMACION'),

(34, 'Museo de las Termas Públicas de Caesaraugusta',676769.806,4613469.059,
NULL,NULL,NULL,NULL,'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION','NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION',
'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION','NO_HAY_INFORMACION', 'NO_HAY_INFORMACION','NO_HAY_INFORMACION', 'NO_HAY_INFORMACION',
'NO_HAY_INFORMACION','NO_HAY_INFORMACION','NO_HAY_INFORMACION','NO_HAY_INFORMACION','NO_HAY_INFORMACION','NO_HAY_INFORMACION',
'NO_HAY_INFORMACION','NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION'),

(35, 'Museo del Puerto Fluvial de Caesaraugusta',676951.659,4613680.185,
'Pl. de San Bruno, 8, Casco Antiguo, 50001 Zaragoza',NULL,NULL,NULL,'NO', 'NO','NO', 'NO', 'NO',
'NO', 'NO', 'NO','SI', 'NO','NO', 'SI',
'NO','SI','SI','BAJO_PETICION','SI','SI',
'BAJO_PETICION','NO', 'NO', 'SI', 'SI'),

(36, 'Canal Imperial de Aragón',676165.758,4611216.248,
NULL,NULL,NULL,NULL,'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION','NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION',
'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION','NO_HAY_INFORMACION', 'NO_HAY_INFORMACION','NO_HAY_INFORMACION', 'NO_HAY_INFORMACION',
'NO_HAY_INFORMACION','NO_HAY_INFORMACION','NO_HAY_INFORMACION','NO_HAY_INFORMACION','NO_HAY_INFORMACION','NO_HAY_INFORMACION',
'NO_HAY_INFORMACION','NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION', 'NO_HAY_INFORMACION');


-- Inserción de datos en imagen_sitio
INSERT INTO imagen_sitio (id, nombre, url, copy, id_sitio) VALUES
(1, 'Basílica del Pilar', 'images/images_sitios/1_Pilar.jpg', '“Zaragoza” por Gregorio Puga Bailón, CC BY 2.0', 1),
(2, 'Palacio de la Aljafería', 'images/images_sitios/2_aljaferia.jpg', '"Aljafería Palace, Zaragoza” por Aleksandr Zykov, CC BY-SA 2.0', 2),
(3, 'Catedral del Salvador o de La Seo', 'images/images_sitios/3_laSeo.jpg', '“La Seo” por Xiquinho Silva, CC BY 2.0', 3),
(4, 'Puente de Piedra', 'images/images_sitios/4_puentePiedra.jpg', '“Puente de Piedra” por Rab Lawrence, CC BY 2.0', 4),
(5, 'Puerta del Carmen', 'images/images_sitios/5_Puerta_del_Carmen.jpg', 'Por Escarlati - Trabajo propio, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=1077770', 5),
(6, 'Monumento a los Sitios', 'images/images_sitios/6_monumentoSitios.jpg', 'FRANCIS RAHER, CC BY 2.0,"Monumento a Los Sitios-Zaragoza"', 6),
(7, 'Monumento a Agustina', 'images/images_sitios/7_monumentoAgustina.jpg', 'FRANCIS RAHER, CC BY 2.0, https://commons.wikimedia.org/w/index.php?curid=44296527', 7),
(8, 'Torreón de La Zuda', 'images/images_sitios/8_TorreonLaZuda.jpg', '“Torreón de la Zuda (Zaragoza)” por santiago lopez-pastor, CC BY-ND 2.0', 8),
(9, 'Murallas', 'images/images_sitios/9_murallas.jpg', '"Murallas romanas de Zaragoza" Escarlati , CC BY 3.0', 9),
(10, 'Mercado Central', 'images/images_sitios/10_MercadoCentral.jpg', '', 10),
(11, 'Museo de Zaragoza', 'images/images_sitios/11_museoZaragoza.jpg', '“Museo de Zaragoza” por santiago lopez-pastor, CC BY-ND 2.0', 11),
(12, 'Museo Goya', 'images/images_sitios/12_museo_goya.jpg', '“Casa_de_los_Pardo-Museo_Camon_Aznar”  de Escarlati (Multi-license with GFDL and Creative Commons CC-BY 2.5)', 12),
(13, 'Parque Grande', 'images/images_sitios/13_parqueGrande.jpg', 'Por User:Archivaldo - Foto propia, Dominio público, https://commons.wikimedia.org/w/index.php?curid=2525910', 13),
(14, 'Monumento Goya', 'images/images_sitios/14_monumentoGoya.jpg', '“The monument of Francisco de Goya in Zaragoza, Spain” ?????? ?????????, CC BY 3.0', 14),
(15, 'Escultura "Alma del Ebro"', 'images/images_sitios/15_esculturaAlmaDelEbro.jpg', '“Alma del Ebro” por Juanedc.com, CC BY 2.0', 15),
(16, 'Estatua Emperador Augusto', 'images/images_sitios/16_EstatuaEmperadorAugusto.jpg', 'Estatua de César Augusto en Zaragoza, Ajzh2074, CC BY 4.0', 16),
(17, 'Palacio Condes de Morata', 'images/images_sitios/17_PalacioCondesMorata.jpg', '“Palacio de los Condes de Morata (1)” por santiago lopez-pastor, CC BY-ND 2.0', 17),
(18, 'Palacio de los Condes de Sástago', 'images/images_sitios/19_palacioCondesSastago.jpg', 'Por ecelan - Self-published work by ecelan, CC BY 2.5, https://commons.wikimedia.org/w/index.php?curid=1093755', 18),
(19, 'Casa de los Sitios', 'images/images_sitios/20_casaDeLosSitios.jpg', 'Por Ajzh2074 - Trabajo propio, CC BY-SA 3.0 es, https://commons.wikimedia.org/w/index.php?curid=21385817', 19),
(20, 'Museo del Foro de Caesaraugusta', 'images/images_sitios/21_foro_romano.jpeg', NULL, 20),
(21, 'Museo del Teatro de Caesaraugusta','images/images_sitios/22_museo_teatro_romano.jpg', NULL, 21),
(22, 'Palacio de los Condes de Argillo. Museo Pablo Gargallo', 'images/images_sitios/23_museo_pablo_gargallo.jpg', NULL, 22),
(23, 'Alma Mater Museum', 'images/images_sitios/24_alma_mater.jpg', NULL, 23),
(24, 'La Lonja', 'images/images_sitios/25_Lonja.jpg', NULL, 24),
(25, 'CaixaForum Zaragoza', 'images/images_sitios/26_caixaforum.jpg', NULL, 25),
(26, 'Patio de la Infanta', 'images/images_sitios/27_patio_infanta.jpg', NULL, 26),
(27, 'Centro de Historias de Zaragoza. Antiguo Convento de San Agustín', 'images/images_sitios/28_museo_historias.jpg', NULL, 27),
(28, 'Iglesia de San Pablo', 'images/images_sitios/29_sanpablo.jpg', NULL, 28),
(29, 'Iglesia Parroquial de Santa Maria Magdalena', 'images/images_sitios/30_iglesia_madalena.jpg', NULL, 29),
(30, 'Acuario de Zaragoza', 'images/images_sitios/31_acuario.jpg', NULL, 30),
(31, 'Antiguo Convento de la Victoria. Museo del Fuego y de los Bomberos','images/images_sitios/32_museo_fuego.jpg', NULL, 31),
(32, 'Parque Metropolitano del Agua Luis Buñuel', 'images/images_sitios/33_parque_agua.jpg', NULL, 32),
(33, 'Museo de Ciencias Naturales de la Universidad de Zaragoza', 'images/images_sitios/34_paraninfo_museo_ciencias.jpg', NULL, 33),
(34, 'Museo de las Termas Públicas de Caesaraugusta', 'images/images_sitios/35_termas_romanas.jpg', NULL, 34),
(35, 'Museo del Puerto Fluvial de Caesaraugusta', 'images/images_sitios/36_puerto_fluvial.jpg', NULL, 35),
(36, 'Canal Imperial de Aragón', 'images/images_sitios/37_canal_imperial.jpg', NULL, 36);
-- -- Insert data into ruta

INSERT INTO ruta (nombre, descripcion, duracion, imagen_destacada, subtitulo) VALUES 
("Ruta Mudéjar","La mejor arquitectura de Zaragoza","2 horas", 'images/rutas/portada_ruta_mudejar.jpg',"subtitulo"),
("Ruta Romana","La mejor romana de Zaragoza","2 horas","images/rutas/portada_ruta_romana.jpg","subtitulo"),
("Ruta Histórica","La mejor historia de Zaragoza","2 horas","images/rutas/portada_ruta_historica.jpg","subtitulo"),
("Ruta al Aire Libre","Los mejores parques de Zaragoza","3 horas","images/rutas/portada_ruta_verde.jpg","subtitulo"),
("Ruta Familiar","La mejor arquitectura de Zaragoza","2 horas","images/rutas/portada_ruta_familiar.jpg","subtitulo");


-- -- Insert data into sitios_ruta
INSERT INTO sitios_ruta (id_ruta, id_sitio, orden, texto) VALUES 
-- RUTA MUDEJAR
(1,28,1,"LA MEJOR IGLESIA"),
(1,2,2,"LA MEJOR IGLESIA"),
(1,3,3,"LA MEJOR IGLESIA"),
(1,29,4,"LA MEJOR IGLESIA"),

-- RUTA ROMANA
(2,21,1,"LA MEJOR ruta romana"),
(2,20,2,"LA ruta romana"),
(2,9,3,"LA MEJOR muralla"),
(2,34,4,"LA MEJOR muralla"),
(2,35,5,"LA MEJOR muralla"),

-- RUTA HISTÓRICA
(3,1,1,"LA MEJOR  HISTORIA"),
(3,3,2,"LA MEJOR HISTORIA"),
(3,4,3,"LA MEJOR HISTORIA"),
(3,10,4,"LA MEJOR HISTORIA"),
(3,24,5,"LA MEJOR HISTORIA"),

-- RUTA AL AIRE LIBRE
(4,13,1,"el mejor aire"),
(4,32,2,"el mejor aire"),
(4,36,3,"el mejor aire"),


-- RUTA FAMILIAR
(5,30,1,"LA MEJOR FAMILIA"),
(5,13,2,"LA MEJOR FAMILIA"),
(5,31,4,"LA MEJOR FAMILIA"), 
(5,33,5,"LA MEJOR FAMILIA");


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