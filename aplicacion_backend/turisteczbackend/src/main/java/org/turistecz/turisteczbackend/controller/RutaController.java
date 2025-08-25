package org.turistecz.turisteczbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.turistecz.turisteczbackend.model.Ruta;
import org.turistecz.turisteczbackend.service.RutaService;


import java.util.List;

//En Spring, las clases de tipo "Controller" son las encargadas de publicar los endpoints
//de nuestra API, para que los puedan llamar y usar desde el frontend. Con la anotacion 
//@RequestMapping le decimos que todos los endpoints van a colgar de "/api", con lo que 
//la URL de llamada sera "http://localhost:8080/api/LoQueSea"
@RestController
@RequestMapping("/api")
public class RutaController {

    @Autowired	   
    private RutaService rutaService;


    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/rutas")
    public List<Ruta> listarRutas() {
        return rutaService.buscarTodasRutas();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/rutasParecidas")
    public List<Ruta> listarRutasParecidas(@RequestParam String nombre) {
        return rutaService.buscarRutasParecidas(nombre);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/rutaPorID")
    public Ruta mostrarRutaPorID(@RequestParam String id) {
        return rutaService.buscarNombrePorId(id);
    }






    
}
