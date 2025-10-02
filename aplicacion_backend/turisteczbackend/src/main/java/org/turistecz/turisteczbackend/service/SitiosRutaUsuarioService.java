package org.turistecz.turisteczbackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.turistecz.turisteczbackend.model.Favoritos;
import org.turistecz.turisteczbackend.model.RutaUsuario;
import org.turistecz.turisteczbackend.model.SitiosRutaUsuario;
import org.turistecz.turisteczbackend.repository.FavoritosRepository;
import org.turistecz.turisteczbackend.repository.RutaUsuarioRepository;
import org.turistecz.turisteczbackend.repository.SitiosRutaUsuarioRepository;

@Service
public class SitiosRutaUsuarioService {
    
    @Autowired
    private SitiosRutaUsuarioRepository sitioRutaUsuarioRepository;

    @Autowired 
    private RutaUsuarioRepository rutaUsuarioRepository;

    @Autowired
    private FavoritosRepository favoritosRepository;
    
    public SitiosRutaUsuario almacenarSitioRutaUsuario(Integer id_ruta, Integer id_favoritos) {

        RutaUsuario ruta = rutaUsuarioRepository.findById(id_ruta)
            .orElseThrow(() -> new RuntimeException("RutaUsuario no encontrada"));

        Favoritos favorito = favoritosRepository.findById(id_favoritos)
            .orElseThrow(() -> new RuntimeException("Favoritos no encontrado"));

        SitiosRutaUsuario sitio = new SitiosRutaUsuario();
        sitio.setRutaUsuario(ruta);
        sitio.setFavoritos(favorito);
        return sitioRutaUsuarioRepository.save(sitio);
        
    }
}
