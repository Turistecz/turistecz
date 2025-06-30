package org.turistecz.turisteczbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.turistecz.turisteczbackend.model.Imagen_sitio;
import org.turistecz.turisteczbackend.service.Imagen_sitioService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class Imagen_sitioController {

	@Autowired	   
    private Imagen_sitioService imagen_sitioService;
    
    @GetMapping("/imagen_sitios")
    public List<Imagen_sitio> listar() {
        return imagen_sitioService.buscarTodosImagen_sitios();
    }
    
}