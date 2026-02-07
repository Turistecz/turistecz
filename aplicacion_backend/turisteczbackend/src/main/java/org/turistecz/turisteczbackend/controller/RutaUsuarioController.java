package org.turistecz.turisteczbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.turistecz.turisteczbackend.dto.EditarRutaUsuarioDto;
import org.turistecz.turisteczbackend.dto.RutaUsuarioDto;
import org.turistecz.turisteczbackend.model.RutaUsuario;
import org.turistecz.turisteczbackend.service.RutaUsuarioService;

@RestController
@RequestMapping("/auth")
public class RutaUsuarioController {

    @Autowired	   
    private RutaUsuarioService rutaUsuarioService;

    @PostMapping("/nuevaRutaUsuario")
    public RutaUsuario nuevaRutaUsuario(@RequestBody RutaUsuarioDto dto) {
        return rutaUsuarioService.crearRutaUsuario(dto.getId_usuario(), dto.getTitulo_ruta(), dto.getDescripcion_ruta());
    }

    @GetMapping("/rutasUsuario")
    public List<RutaUsuario> listarRutas(@RequestParam Integer id_usuario) {
        return rutaUsuarioService.mostrarRutasUsuario(id_usuario);
    }

    @PutMapping("/editarTituloRutaUsuario")
    public RutaUsuario editarTituloRuta(@RequestBody EditarRutaUsuarioDto dto){
        return rutaUsuarioService.modificarTituloRuta(dto.id, dto.titulo_ruta);
    }

    @PutMapping("/editarDescripcionRutaUsuario")
    public RutaUsuario editarDescripcionRuta(@RequestBody EditarRutaUsuarioDto dto){
        return rutaUsuarioService.modificarDescripcionRuta(dto.id, dto.descripcion_ruta);
    }

    @DeleteMapping("/eliminarRutaUsuario")
    public RutaUsuario eliminarRutaUsuario(@RequestParam Integer id_ruta){
        return rutaUsuarioService.borrarRuta(id_ruta);
    }

}
