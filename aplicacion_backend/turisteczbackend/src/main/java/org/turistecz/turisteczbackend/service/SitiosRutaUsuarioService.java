package org.turistecz.turisteczbackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.turistecz.turisteczbackend.model.SitiosRutaUsuario;
import org.turistecz.turisteczbackend.repository.SitiosRutaUsuarioRepository;

@Service
public class SitiosRutaUsuarioService {
    
    @Autowired
    private SitiosRutaUsuarioRepository sitioRutaUsuarioRepository;
    
    public SitiosRutaUsuario almacenarSitioRutaUsuario(int id_sitio_fav) {
        SitiosRutaUsuario sitio = new SitiosRutaUsuario();
        // sitio.setId_ruta(id_ruta);
        sitio.setId_sitio_fav(id_sitio_fav);
        return sitioRutaUsuarioRepository.save(sitio);
    }
}
