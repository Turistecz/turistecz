package org.turistecz.turisteczbackend.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.turistecz.turisteczbackend.model.Imagen_sitio;
import org.turistecz.turisteczbackend.service.Imagen_sitioService;
import org.turistecz.turisteczbackend.service.UsuariosService;

import java.util.List;
@RestController
@RequestMapping("/login")
public class UsuariosController {
    @Autowired
    private UsuariosService usuariosService;
  
}
