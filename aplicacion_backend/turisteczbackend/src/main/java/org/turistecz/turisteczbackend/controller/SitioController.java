package org.turistecz.turisteczbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.turistecz.turisteczbackend.model.Sitio;
import org.turistecz.turisteczbackend.service.SitioService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SitioController {

	@Autowired	   
    private SitioService sitioService;
    
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/sitios")
    public List<Sitio> listar() {
        return sitioService.buscarTodosSitios();
    }
    
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/sitiosComoEste")
    public List<Sitio> listarComoNombre(@RequestParam String nombre) {
        return sitioService.buscarTodosSitiosDeNombreParecido(nombre);
    }
    
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