package org.turistecz.turisteczbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.turistecz.turisteczbackend.dto.RutaUsuarioDto;
import org.turistecz.turisteczbackend.model.RutaUsuario;
import org.turistecz.turisteczbackend.service.RutaUsuarioService;

@RestController
@RequestMapping("/auth")
public class RutaUsuarioController {

    @Autowired	   
    private RutaUsuarioService rutaUsuarioService;

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/nuevaRutaUsuario")
    public RutaUsuario nuevaRutaUsuario(@RequestBody RutaUsuarioDto dto) {
        return rutaUsuarioService.crearRutaUsuario(dto.getId_usuario(), dto.getTitulo_ruta(), dto.getDescripcion_ruta());
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/rutasUsuario")
    public List<RutaUsuario> listarRutas(@RequestParam Integer id_usuario) {
        return rutaUsuarioService.mostrarRutasUsuario(id_usuario);
    }

    // @CrossOrigin(origins = "http://localhost:4200")
    // @GetMapping("/ultimaRutaUsuario")
    // public RutaUsuario ultimaRutaUsuario(){
    //     return rutaUsuarioService.mostrarUltimaRutaUsuario();
    // }

}
