# Turistecz 
                     
Este proyecto ha sido creado con [Angular CLI](https://github.com/angular/angular-cli) version 19.2.11.

## Descripcion:

Aplicación web destinada al turismo inclusivo en Zaragoza. 
Indica y clasifica características de monumentos y servicios en función de las necesidades de los usuarios. 
Además, propone recorridos culturales adaptados. 
El framework utilizado es Angular.


## Comandos de acceso y actualización:

## Clonar el repositorio:

```bash
git clone https://github.com/Turistecz/turistecz.git 
```

## Instalación del node modules:

```bash
npm install
```

Para comprobar la instalación:

```bash
ng serve
```

Cuando el servidor esté en funcionamiento, puedes acceder al navegador a través `http://localhost:4200/`. La aplicación se actualizará automáticamente en el servidor cuando el código se modifique.


## Ramas

### Para comprobar la rama actual:

``` bash
git branch
```

### Para crear una nueva rama y acceder a ella:

``` bash
git checkout -b "nombreDeLaRama"
```

## Commit

### Preparar ficheros:

``` bash
git add .
```

### Hacer commit:

``` bash
git commit -m "tituloDelCommit"
```

## Descarga de rama main antes de 'push':

``` bash
git pull origin main
```

## Subir la rama actualizada:

``` bash
git push origin "nombreDeLaRama"
```

## Último paso:

Enviar solicitud (pull request) en GitHub.


# 📌 Backend Turistecz

API REST desarrollada con **Spring Boot**, **JPA** y **MySQL**, que gestiona las funcionalidades del backend de la aplicación.  

---

## 🚀 Tecnologías utilizadas
- **Java 17+**
- **Spring Boot**
- **Maven**
- **MySQL**
- **JPA**

---

## ⚙️ Requisitos previos
Antes de comenzar, asegúrate de tener instalado:

- [Java JDK 17+](https://adoptium.net/)
- [MySQL Connector](https://dev.mysql.com/downloads/mysql/) 
- [MySQL Server](https://dev.mysql.com/downloads/mysql/) 
- [MySQL Workbench](https://dev.mysql.com/downloads/mysql/) 

## ⚙️ Extensiones en VSCode
Antes de comenzar, asegúrate de tener instalado las siguientes extensiones:

- [SpringBootJava]
- [SPringBootTools]
- [SPringBootDashboard]
- [SPringBootInitializrJavaSupport]

---

## 🛠️ Instalación y configuración


1. **Configurar la base de datos**
   - Crear la base de datos en MySQL (según el modelo diseñado en MySQL Workbench).
   - Configurar usuario en MySQLServer con las creedenciales que están en `src/main/resources/application.properties`:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/nombre_bd
     spring.datasource.username=usuario
     spring.datasource.password=contraseña
     spring.jpa.hibernate.ddl-auto=update
     spring.jpa.show-sql=true
     spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
     ```
     -Revisar que realmente estamos accediendo a la base de datos. 

2. **Compilar y ejecutar el backend**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
     ```bash
  también se puede arrancar desde TuristeczBackendApplication.java
   ```


3. **Acceder a la aplicación**
   - Por defecto se ejecuta en: `http://localhost:8080`

---

## 📂 Estructura del proyecto
```
aplicacion_backend
 └── turisteczbackend
     ├── src/main/java
     │   ├── controller   # Controladores REST
     │   ├── service      # Lógica de negocio
     │   ├── repository   # Acceso a datos (JPA)
     │   └── model        # Entidades JPA
     └── resources
               └── application.properties

---


## Local OSRM Server

Pasos para instalar Docker y poder ejecutar en local el OSRM Server.

### Instalar Docker
1. Ir a "activar o desactivar las características de Windows" en el buscador de Windows.
2. Activar las opciones "Plataforma de máquina virtual", "Plataforma de hipervisor de Windows", "Subsistema de Windows para Linux", "Espacio aislado de Windows" e "Hyper-V".
3. Abrir una terminal y escribir:
``` bash
wsl --install
```
4. Crear un usuario y contraseña (importante acordarse de la contraseña).
5. La terminal entrará automáticamente a Linux y, ahí, escribir el siguiente comando para actualizarlo:
``` bash
sudo apt update && sudo apt upgrade
```
6. Escribir "y" para decir que sí al mensaje que salga.
7. Cuando termine salir de Linux escribiendo "exit" y, en la terminal de Windows, escribir:
``` bash
wsl --set-default-version 2
```
8. Descargar docker: https://docs.docker.com/desktop/setup/install/windows-install/
9. Instalar, marcar las dos opciones si no lo están por defecto.
10. Abrir Docker cuando termine de instalar y crearse una cuenta.

En caso de duda consultar el siguiente video: https://www.youtube.com/watch?v=4mfbrKyqsdE

### Crear Server OSRM
1. Descargar el mapa Aragon.osm.pbf en https://download.geofabrik.de/europe/spain.html
2. Crear una carpeta llamada data (donde se quiera, pero tenerla localizada) y meter el archivo dentro
3. Abrir Docker, ir a Ajustes, Resources, File sharing e introducir la dirección de la carpeta data
4. Abrir una terminal, navegar a la carpeta data y abrir Linux
5. Introducir los siguientes comandos en order para generar los datos de la ruta a pie:
``` bash
docker run -t -v "${PWD}:/data" ghcr.io/project-osrm/osrm-backend osrm-extract -p /opt/foot.lua /data/aragon-latest.osm.pbf || echo "osrm-extract failed"
```
``` bash
docker run -t -v "${PWD}:/data" ghcr.io/project-osrm/osrm-backend osrm-partition /data/aragon-latest.osm.pbf || echo "osrm-partition failed"
```
``` bash
docker run -t -v "${PWD}:/data" ghcr.io/project-osrm/osrm-backend osrm-customize /data/aragon-latest.osm.pbf || echo "osrm-customize failed"
```
En caso de duda consultar:
- El GitHub de OSRM: https://github.com/Project-OSRM/osrm-backend?tab=readme-ov-file#request-against-the-demo-server
- Este artículo: https://medium.com/@imadsaddik/1-osrm-course-installation-process-9cfeebdeb930

### Iniciar server
Si se continua del paso anterior:
1. Introducir el siguiente comando en la terminal: 
``` bash
sudo docker run -t -i -p 5000:5000 -v "${PWD}:/data" ghcr.io/project-osrm/osrm-backend osrm-routed --algorithm mld /data/aragon-latest.osrm
```
2. Deberá haber aparecido un container en la aplicación de Docker y en la terminal la última linea deberá poner "running and waiting for requests".

Si se quiere iniciar otro día, con todo instalado:
1. Abrir la aplicación de Docker.
2. Abrir una terminal, navegar hasta la carpeta data y abrir Linux.
3. Esperar a que se abra la aplicación de Docker.
4. Introducir el siguiente comando en la terminal: 
``` bash
sudo docker run -t -i -p 5000:5000 -v "${PWD}:/data" ghcr.io/project-osrm/osrm-backend osrm-routed --algorithm mld /data/aragon-latest.osrm
```
5. Deberá haber aparecido un container en la aplicación de Docker y en la terminal la última linea deberá poner "running and waiting for requests".
6. En el caso de que de error, comprobar si la aplicación de Docker tiene alguna actualización, cerrar la terminal y repetir los pasos.

Si se quiere cerrar/cancelar el server utilizar ctrl+C en la terminal o parar/eliminar el contenedor en Docker.

### Comandos Linux
- Para acceder a Linux abrir una terminal y escribir:
``` bash
wsl
```
- Para salir de Linux escribir en la terminal donde se encuentra abierto:
``` bash
exit
```

# MailHog

Para poder recibir correos tanto de verificacion, como de recuperación de contraseña, tendremos qe descargar MalHog, un servicio que permite obtener 
correos unicamente en local, para testear las funciones de la aplicacion antes de lanzarla al publico.

1. En el siguiente enlace, buscamos y descargamos el fichero acorde con nuestro sistema operativo.
   https://github.com/mailhog/MailHog/releases

2. Se nos descargara un archivo .exe, que al ser un programa autoejecutable, simlemente lo abriremos. Nos aparecera la consola de comandos. 
   !!Importante no cerrarla, MailHog solo funciona si la consola esta abierta!!.

3. Por ultimo escribimos en el navegador 'localhost:8025', que es el puerto que utiliza. Y probamos el correcto funcionamiento de las funciones del
   usuario.



Funcionamiento del cambio de colores y temas desde el  panel de administración.

# 🚀 Turistecz - Panel de Administración & Sistema de Temas Dinámicos

Este proyecto permite gestionar rutas turísticas y sitios culturales de Zaragoza mediante un panel de administración, y ofrece un sistema avanzado de **temas dinámicos** que permite cambiar los colores de la app (web y móvil) desde una interfaz web, ideal para eventos especiales como Halloween, Navidad o campañas promocionales.

---

## 🗂️ Estructura del Proyecto
turistecz/
├── adminturistecz/ # Panel de administración (PHP)
│ ├── db.php # Conexión a la base de datos
│ ├── select-sitios.php # Listado de sitios con paginación
│ ├── insert-sitios.php # Formulario para añadir nuevos sitios
│ ├── insert-ruta.php # Crear nuevas rutas seleccionando sitios
│ ├── select-rutas.php # Listado de rutas con detalles desplegables
│ ├── configurar-tema.php # Configurar el tema visual de la app
│ └── api/
│ └── tema.php # API REST para obtener el tema activo
│
└── src/ # App Angular (frontend público)
├── styles.css # Variables CSS globales
└── services/tema.service.ts # Servicio que aplica el tema dinámicamente

---

## 💾 Base de Datos: `turistecz`

### Tablas principales

| Tabla | Descripción |
|------|-------------|
| `sitio` | Información detallada de cada sitio turístico (accesibilidad, contacto, ubicación...) |
| `ruta` | Rutas temáticas (Mudéjar, Romana, Familiar, etc.) |
| `sitios_ruta` | Relación muchos a muchos entre rutas y sitios |
| `configuracioncolor` | Almacena el tema activo como JSON |

---

### 🎨 Tabla: `configuracioncolor`

Almacena el tema actual de la app. Solo se usa la clave `tema_activo`.

| campo | valor |
|------|-------|
| `clave` | `tema_activo` |
| `valor` | `{ "name": "default", "color_primary": "#184591", ... }` (JSON válido) |

> ⚠️ El `valor` debe ser un **objeto JSON válido**, no un string escapado (`"{...}"`).  
> ✅ Así se puede consumir directamente desde la app.

---

## 🔧 Panel de Administración (PHP)

Interfaz web para gestionar contenidos y temas.

### Funcionalidades principales:

- ✅ Listado de sitios con **paginación (20 por página)** y filtro de búsqueda implícito
- ✅ Detalles ocultos por sitio (accesibilidad, servicios, etc.)
- ✅ Crear y editar rutas seleccionando sitios existentes
- ✅ Sistema de temas: cambiar colores globales desde un formulario

### Archivos clave:
- `select-sitios.php`: muestra todos los sitios con paginación y mensaje de rango ("Mostrando 1-20 de 57")
- `insert-ruta.php`: permite crear rutas arrastrando sitios y definiendo orden y descripción
- `configurar-tema.php`: editor visual de temas con previsualización

---

## 🌐 API REST: `/api/tema.php`

Endpoint que devuelve el tema activo en formato JSON.

### URL
profile
Qwen3-235B-A22B-2507
2:49 pm
¡Claro! Aquí tienes un archivo README.md completo, profesional y bien estructurado, que incluye todo lo que hemos hecho juntos: desde la base de datos hasta el sistema de temas dinámicos, pasando por el panel de administración y la integración con Angular.

Puedes copiarlo directamente y subirlo a tu repositorio en GitHub para que tu equipo entienda claramente cómo funciona el sistema.

markdown


1
2
3
4
5
6
7
8
⌄
# 🚀 Turistecz - Panel de Administración & Sistema de Temas Dinámicos

Este proyecto permite gestionar rutas turísticas y sitios culturales de Zaragoza mediante un panel de administración, y ofrece un sistema avanzado de **temas dinámicos** que permite cambiar los colores de la app (web y móvil) desde una interfaz web, ideal para eventos especiales como Halloween, Navidad o campañas promocionales.

---

## 🗂️ Estructura del Proyecto

turistecz/
├── adminturistecz/ # Panel de administración (PHP)
│ ├── db.php # Conexión a la base de datos
│ ├── select-sitios.php # Listado de sitios con paginación
│ ├── insert-sitios.php # Formulario para añadir nuevos sitios
│ ├── insert-ruta.php # Crear nuevas rutas seleccionando sitios
│ ├── select-rutas.php # Listado de rutas con detalles desplegables
│ ├── configurar-tema.php # Configurar el tema visual de la app
│ └── api/
│ └── tema.php # API REST para obtener el tema activo
│
└── src/ # App Angular (frontend público)
├── styles.css # Variables CSS globales
└── services/tema.service.ts # Servicio que aplica el tema dinámicamente

## 💾 Base de Datos: `turistecz`

### Tablas principales

| Tabla | Descripción |
|------|-------------|
| `sitio` | Información detallada de cada sitio turístico (accesibilidad, contacto, ubicación...) |
| `ruta` | Rutas temáticas (Mudéjar, Romana, Familiar, etc.) |
| `sitios_ruta` | Relación muchos a muchos entre rutas y sitios |
| `configuracioncolor` | Almacena el tema activo como JSON |

---

### 🎨 Tabla: `configuracioncolor`

Almacena el tema actual de la app. Solo se usa la clave `tema_activo`.

| campo | valor |
|------|-------|
| `clave` | `tema_activo` |
| `valor` | `{ "name": "default", "color_primary": "#184591", ... }` (JSON válido) |

> ⚠️ El `valor` debe ser un **objeto JSON válido**, no un string escapado (`"{...}"`).  
> ✅ Así se puede consumir directamente desde la app.

---

## 🔧 Panel de Administración (PHP)

Interfaz web para gestionar contenidos y temas.

### Funcionalidades principales:

- ✅ Listado de sitios con **paginación (20 por página)** y filtro de búsqueda implícito
- ✅ Detalles ocultos por sitio (accesibilidad, servicios, etc.)
- ✅ Crear y editar rutas seleccionando sitios existentes
- ✅ Sistema de temas: cambiar colores globales desde un formulario

### Archivos clave:
- `select-sitios.php`: muestra todos los sitios con paginación y mensaje de rango ("Mostrando 1-20 de 57")
- `insert-ruta.php`: permite crear rutas arrastrando sitios y definiendo orden y descripción
- `configurar-tema.php`: editor visual de temas con previsualización

---

## 🌐 API REST: `/api/tema.php`

Endpoint que devuelve el tema activo en formato JSON.

### URL
http://localhost/api/tema.php


### Respuesta ejemplo
```json
{
  "status": "success",
  "data": {
    "name": "halloween",
    "color_primary": "#e74c3c",
    "color_secondary": "#8e44ad",
    "color_accent": "#42D5A5",
    "gradient_primary_start": "#d35400",
    "gradient_primary_end": "#e67e22",
    "bg_primary": "#000000",
    "bg_secondary": "#1a1a1a",
    "text_primary": "#ffffff",
    "text_light": "#ffffff"
  }
}
 Este endpoint es llamado por la app Angular al iniciar.

📱 App Angular: Aplicación del Tema

La app pública consume el tema desde PHP y lo aplica dinámicamente usando variables CSS.

✅ TemaService (tema.service.ts)

Se inyecta en AppComponent.

Llama a api/tema.php al cargar.

document.documentElement.style.setProperty('--color-primary', 'rgba(231, 76, 60, 1)');


 Flujo de Cambio de Tema

El administrador entra a configurar-tema.php.

Edita los colores y guarda.

El nuevo tema se guarda como JSON en configuracioncolor.valor.

La app Angular, al recargar, llama a api/tema.php.

Recibe el JSON y aplica las variables CSS.

Todos los elementos que usen var(--...) actualizan su estilo automáticamente.

Buenas Prácticas Implementadas

✅ Variables CSS

Temas dinámicos sin recargar componentes
✅ JSON en BD

Fácil de mantener y extender

✅ Paginación

Mejora rendimiento y UX

✅ Sin colores fijos

Total consistencia visual

✅ Previsualización en panel

Confianza al cambiar el tema

Cómo crear un nuevo tema?

Accede a configurar-tema.php desde el panel.

Cambia los colores según el evento (ej: naranja/negro para Halloween).

Guarda los cambios.

En la app → recarga → ¡el tema cambia!
