package org.turistecz.turisteczbackend.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.turistecz.turisteczbackend.model.SitiosRuta;
import org.turistecz.turisteczbackend.service.SitiosRutaService;



//En Spring, las clases de tipo "Controller" son las encargadas de publicar los endpoints
//de nuestra API, para que los puedan llamar y usar desde el frontend. Con la anotacion 
//@RequestMapping le decimos que todos los endpoints van a colgar de "/api", con lo que 
//la URL de llamada sera "http://localhost:8080/api/LoQueSea"
@RestController
@RequestMapping("/api")
public class Sitios_RutaController {
    
    @Autowired	   
    private SitiosRutaService sitios_rutaService;

    // @CrossOrigin(origins = "http://localhost:4200")
    // @GetMapping("/sitiosrutaPorId")
    // public Sitios_Ruta mostrarSitiosRutaPorID(@RequestParam Integer id_sitio, @RequestParam Integer id_ruta ) {
    //     return sitios_rutaService.buscarNombrePorId(id_sitio, id_ruta);
    

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/textoRutaPorId")
    public List<SitiosRuta> mostrarTextoRutaPorID(@RequestParam Integer id_ruta) {
        return sitios_rutaService.buscarTextoRutaPorId(id_ruta);
    }

    
    // @CrossOrigin(origins = "http://localhost:4200")
    // @GetMapping("/textoRutaPorId")
    // public Sitios_Ruta mostrarTextoRutaPorID(@RequestParam String id_ruta ) {
    //     return sitios_rutaService.buscarTextoRutaPorId(id_ruta);
    // }

    // @CrossOrigin(origins = "http://localhost:4200")
    // @GetMapping("/textoRutaPorId")
    // public Sitios_Ruta mostrarTextoRutaPorID(@RequestParam Integer id_ruta ) {
    //     return sitios_rutaService.buscarTextoRutaPorId(id_ruta);
    // }
}
