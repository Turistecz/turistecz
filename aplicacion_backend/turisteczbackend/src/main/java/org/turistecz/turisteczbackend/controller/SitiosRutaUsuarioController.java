package org.turistecz.turisteczbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.turistecz.turisteczbackend.dto.SitioRutaUsuarioDto;
import org.turistecz.turisteczbackend.model.SitiosRutaUsuario;
import org.turistecz.turisteczbackend.service.SitiosRutaUsuarioService;

@RestController
@RequestMapping("/auth")
public class SitiosRutaUsuarioController {
    
    @Autowired
    private SitiosRutaUsuarioService sitioRutaUsuarioService;

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/nuevoSitioRutaUsuario")
    public SitiosRutaUsuario nuevoSitioRutaUsuario(@RequestBody SitioRutaUsuarioDto dto) {
        return sitioRutaUsuarioService.almacenarSitioRutaUsuario(dto.getId_ruta(), dto.getId_sitio_favorito(), dto.getOrden());
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/eliminarSitiosRuta")
    public SitiosRutaUsuario eliminarSitiosRuta(@RequestParam Integer id){
        return this.sitioRutaUsuarioService.borrarSitios(id);
    }
}
