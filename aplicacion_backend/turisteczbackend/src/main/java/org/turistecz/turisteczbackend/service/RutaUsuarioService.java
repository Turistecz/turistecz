package org.turistecz.turisteczbackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.turistecz.turisteczbackend.model.RutaUsuario;
import org.turistecz.turisteczbackend.repository.RutaUsuarioRepository;

@Service
public class RutaUsuarioService {
    
    @Autowired
    RutaUsuarioRepository repositorioRutaUsuario;

    // public List<RutaUsuario> mostrarRutas() {
	//     return repositorioRutaUsuario.findAll();
	// }

    public RutaUsuario crearTituloRutaUsuario(String titulo) {
        RutaUsuario ruta = new RutaUsuario();
        ruta.setTitulo_ruta(titulo);
        return repositorioRutaUsuario.save(ruta);
    }

}
