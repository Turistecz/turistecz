package org.turistecz.turisteczbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.turistecz.turisteczbackend.service.SitiosRutaUsuarioService;

@RestController
@RequestMapping("/ru")
public class SitiosRutaUsuarioController {
    
    @Autowired
    private SitiosRutaUsuarioService sitioRutaUsuarioService;

    
}
