package org.turistecz.turisteczbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.turistecz.turisteczbackend.model.Sitio;
import org.turistecz.turisteczbackend.service.SitioService;

import java.util.List;

//En Spring, las clases de tipo "Controller" son las encargadas de publicar los endpoints
//de nuestra API, para que los puedan llamar y usar desde el frontend. Con la anotacion 
//@RequestMapping le decimos que todos los endpoints van a colgar de "/api", con lo que 
//la URL de llamada sera "http://localhost:8080/api/LoQueSea"
@RestController
@RequestMapping("/api")
public class SitioController {

    //Esta es la clase de tipo Service asociada que vamos a usar. Podria haber varias
	//de estas. Con la anotacion @Autowired se inyectan las dependencias necesarias para 
	//que este campo funcione, como constructores o getters/setters
	@Autowired	   
    private SitioService sitioService;
    
    //Este es uno de los endpoints publicados por este Controller. Se encontraria en la URL
    //"http://localhost:8080/api/sitios", y al ser accedido llamaria al metodo 
    //"buscarTodosSitios" del correspondiente Service y devolveria su resultado.
    //Con la anotacion "@CrossOrigin" le estamos diciendo que acepte las peticiones que le 
    //vengan desde ahi (es la direccion donde esta publicado el frontend)
    //Como estamos usando la anotacion "@GetMapping", las peticiones que vengan al endpoint 
    //tendran que ser de tipo GET.
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/sitios")
    public List<Sitio> listar() {
        return sitioService.buscarTodosSitios();
    }
    
    //Este es uno de los endpoints publicados por este Controller. Se encontraria en la URL
    //"http://localhost:8080/api/sitiosDeNombreIgual", y al ser accedido llamaria al metodo 
    //"buscarTodosSitiosDeNombreIgual" del correspondiente Service y devolveria su resultado.
    //En el caso de este endpoint, queremos que devuelva la lista de sitios cuyo nombre sea 
    //igual a algo, le tenemos que pasar esa informacion (ese "algo"). Es lo que se dice 
    //con la anotacion "@RequestParam", le indicamos que tiene que venir en la url un 
    //parametro llamado "nombre" con la informacion correspondiente. Asi que en este caso, 
    //al llamar al endpoint habria que escribir algo como lo siguiente:
    //"http://localhost:8080/api/sitiosDeNombreIgual?nombre=Murallas+romanas" (esto 
    //devolveria todos los sitios cuyo nombre fuera exactamente "Murallas romanas"). 
    //En las URL's el espacio se escribe con un "+"
    //Con la anotacion "@CrossOrigin" le estamos diciendo que acepte las peticiones que le 
    //vengan desde ahi (es la direccion donde esta publicado el frontend).
    //Como estamos usando la anotacion "@GetMapping", las peticiones que vengan al endpoint 
    //tendran que ser de tipo GET.
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/sitiosDeNombreIgual")
    public List<Sitio> listarSitiosDeNombreIgual(@RequestParam String nombre) {
        return sitioService.buscarTodosSitiosDeNombreIgual(nombre);
    }

    //Este es uno de los endpoints publicados por este Controller. Se encontraria en la URL
    //"http://localhost:8080/api/sitiosDeNombreParecido", y al ser accedido llamaria al metodo 
    //"buscarTodosSitiosDeNombreParecido" del correspondiente Service y devolveria su resultado.
    //En el caso de este endpoint, queremos que devuelva la lista de sitios cuyo nombre sea 
    //parecido a algo, le tenemos que pasar esa informacion (ese "algo"). Es lo que se dice 
    //con la anotacion "@RequestParam", le indicamos que tiene que venir en la url un 
    //parametro llamado "nombre" con la informacion correspondiente. Asi que en este caso, 
    //al llamar al endpoint habria que escribir algo como lo siguiente:
    //"http://localhost:8080/api/sitiosDeNombreParecido?nombre=Palacio" (esto 
    //devolveria todos los sitios cuyo nombre contuviera el String Palacio"). 
    //En las URL's el espacio se escribe con un "+"
    //Con la anotacion "@CrossOrigin" le estamos diciendo que acepte las peticiones que le 
    //vengan desde ahi (es la direccion donde esta publicado el frontend).
    //Como estamos usando la anotacion "@GetMapping", las peticiones que vengan al endpoint 
    //tendran que ser de tipo GET.
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/sitiosDeNombreParecido")
    public List<Sitio> listarSitiosDeNombreParecido(@RequestParam String nombre) {
        return sitioService.buscarTodosSitiosDeNombreParecido(nombre);
    }
    
    //Este es uno de los endpoints publicados por este Controller. Se encontraria en la URL
    //"http://localhost:8080/api/sitios/crear", y al ser accedido llamaria al metodo 
    //"insertarSitio" del correspondiente Service y devolveria un mensaje.
    //En el caso de este endpoint, queremos que inserte un nuevo Sitio en la BBDD, con lo 
    //que le tendremos que pasar la informacion necesaria para que pueda insertar dicho 
    //sitio (al menos el nombre, ya que el ID lo puede generar automaticamente la BBDD).
    //Es lo que se dice con la anotacion "@RequestParam", le indicamos que tiene que venir
    // en la url un parametro llamado "nombre" con la informacion correspondiente. Asi que 
    //en este caso, al llamar al endpoint habria que escribir algo como lo siguiente:
    //"http://localhost:8080/api/sitios/crear?nombre=Averly" (esto insertaria un nuevo 
    //sitio en la tabla cuyo nombre seria "Averly").
    //Con la anotacion "@CrossOrigin" le estamos diciendo que acepte las peticiones que le 
    //vengan desde ahi (es la direccion donde esta publicado el frontend).
    //Como estamos usando la anotacion "@PostMapping", las peticiones que vengan al endpoint 
    //tendran que ser de tipo POST.
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/sitios/crear")
    public String crearSitio(@RequestParam String nombre) {
    	Sitio s = new Sitio();
    	s.setNombre(nombre);
        //Esto solo es lo basico, haria falta poner mas cosas 
        //dentro del objeto Sitio para rellenar el resto de campos
        Sitio insertado = sitioService.insertarSitio(s);
        return "Ha sido creado el sitio " + insertado.getNombre() + " con id = " + insertado.getId();
    }
    
}