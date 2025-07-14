package org.turistecz.turisteczbackend.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.turistecz.turisteczbackend.model.Sitios_Ruta;

import org.turistecz.turisteczbackend.service.Sitios_RutaService;



//En Spring, las clases de tipo "Controller" son las encargadas de publicar los endpoints
//de nuestra API, para que los puedan llamar y usar desde el frontend. Con la anotacion 
//@RequestMapping le decimos que todos los endpoints van a colgar de "/api", con lo que 
//la URL de llamada sera "http://localhost:8080/api/LoQueSea"
@RestController
@RequestMapping("/api")
public class Sitios_RutaController {

    @Autowired	   
    private Sitios_RutaService sitios_rutaService;



    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/sitiosrutaPorId")
    public Sitios_Ruta mostrarSitiosRutaPorID(@RequestParam Integer id_sitio, @RequestParam Integer id_ruta ) {
        return sitios_rutaService.buscarNombrePorId(id_sitio, id_ruta);
    }
    
}
