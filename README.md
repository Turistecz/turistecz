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
wsl --install -d Ubuntu
```
4. Crear un usuario y contraseña (importante acordarse de la contraseña).
5. La terminal entrará automáticamente a Linux (Ubuntu) y, ahí, escribir el siguiente comando para actualizarlo:
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
4. Abrir una terminal, navegar a la carpeta data y abrir Linux.
4.1 Puedes poner en la terminal de windows ubuntu y ya estaría usando linux ó puedes abrir la terminal de ubuntu (importante que es estés dentro de la carpeta data)
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
2. Abrir una terminal, navegar hasta la carpeta data y abrir Linux (puedes poner en la terminal de windows ubuntu y ya estaría usando linux ó puedes abrir la terminal de ubuntu).
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