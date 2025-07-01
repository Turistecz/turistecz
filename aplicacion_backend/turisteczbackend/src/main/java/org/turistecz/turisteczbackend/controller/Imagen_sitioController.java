package org.turistecz.turisteczbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.turistecz.turisteczbackend.model.Imagen_sitio;
import org.turistecz.turisteczbackend.service.Imagen_sitioService;

import java.util.List;

//En Spring, las clases de tipo "Controller" son las encargadas de publicar los endpoints
//de nuestra API, para que los puedan llamar y usar desde el frontend. Con la anotacion 
//@RequestMapping le decimos que todos los endpoints van a colgar de "/api", con lo que 
//la URL de llamada sera "http://localhost:8080/api/LoQueSea"
@RestController
@RequestMapping("/api")
public class Imagen_sitioController {

    //Esta es la clase de tipo Service asociada que vamos a usar. Podria haber varias
	//de estas. Con la anotacion @Autowired se inyectan las dependencias necesarias para 
	//que este campo funcione, como constructores o getters/setters
	@Autowired	   
    private Imagen_sitioService imagen_sitioService;
    
    //Este es uno de los endpoints publicados por este Controller. Se encontraria en la URL
    //"http://localhost:8080/api/imagen_sitios", y al ser accedido llamaria al metodo 
    //"buscarTodosImagen_sitios" del correspondiente Service y devolveria su resultado.
    //Con la anotacion "@CrossOrigin" le estamos diciendo que acepte las peticiones que le 
    //vengan desde ahi (es la direccion donde esta publicado el frontend)
    //Como estamos usando la anotacion "@GetMapping", las peticiones que vengan al endpoint 
    //tendran que ser de tipo GET.
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/imagen_sitios")
    public List<Imagen_sitio> listar() {
        return imagen_sitioService.buscarTodosImagen_sitios();
    }
    
}