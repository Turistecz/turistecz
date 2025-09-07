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


