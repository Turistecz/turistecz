package org.turistecz.turisteczbackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.turistecz.turisteczbackend.repository.SitiosRutaUsuarioRepository;

@Service
public class SitiosRutaUsuarioService {
    
    @Autowired
    private SitiosRutaUsuarioRepository sitioRutaUsuarioRepository;
    
}
