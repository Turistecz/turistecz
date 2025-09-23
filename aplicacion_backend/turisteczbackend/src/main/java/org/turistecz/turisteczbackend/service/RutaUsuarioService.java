package org.turistecz.turisteczbackend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.turistecz.turisteczbackend.model.RutaUsuario;
import org.turistecz.turisteczbackend.repository.RutaUsuarioRepository;

@Service
public class RutaUsuarioService {
    
    @Autowired
    RutaUsuarioRepository repositorioRutaUsuario;

    public List<RutaUsuario> mostrarRutas() {
	    return repositorioRutaUsuario.findAll();
	}

}
