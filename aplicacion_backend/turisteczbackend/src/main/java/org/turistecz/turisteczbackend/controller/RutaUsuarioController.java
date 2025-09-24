package org.turistecz.turisteczbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.turistecz.turisteczbackend.dto.RutaUsuarioDto;
import org.turistecz.turisteczbackend.model.RutaUsuario;
import org.turistecz.turisteczbackend.service.RutaUsuarioService;

@RestController
@RequestMapping("/auth")
public class RutaUsuarioController {

    @Autowired	   
    private RutaUsuarioService rutaUsuarioService;

    // @CrossOrigin(origins = "http://localhost:4200")
    // @GetMapping("/rutasUsuario")
    // public List<RutaUsuario> listarRutas() {
    //     return rutaUsuarioService.mostrarRutas();
    // }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/tituloRutaUsuario")
    public RutaUsuario nuevoTituloRutaUsuario(@RequestBody RutaUsuarioDto dto) {
        System.out.println("llega a postmaping" + dto.getTitulo_ruta());
        return rutaUsuarioService.crearTituloRutaUsuario(dto.getTitulo_ruta());
    }

}
