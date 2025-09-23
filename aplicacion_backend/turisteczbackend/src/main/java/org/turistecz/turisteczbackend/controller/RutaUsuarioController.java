package org.turistecz.turisteczbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.turistecz.turisteczbackend.model.RutaUsuario;
import org.turistecz.turisteczbackend.service.RutaUsuarioService;

@RestController
@RequestMapping("/ru")
public class RutaUsuarioController {

    @Autowired	   
    private RutaUsuarioService rutaUsuarioService;

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/rutasUsuario")
    public List<RutaUsuario> listarRutas() {
        return rutaUsuarioService.mostrarRutas();
    }

}
