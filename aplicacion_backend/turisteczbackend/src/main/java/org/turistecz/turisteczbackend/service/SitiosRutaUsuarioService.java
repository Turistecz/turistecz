package org.turistecz.turisteczbackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.turistecz.turisteczbackend.model.Favoritos;
import org.turistecz.turisteczbackend.model.RutaUsuario;
import org.turistecz.turisteczbackend.model.Sitio;
import org.turistecz.turisteczbackend.model.SitiosRutaUsuario;
import org.turistecz.turisteczbackend.repository.FavoritosRepository;
import org.turistecz.turisteczbackend.repository.RutaUsuarioRepository;
import org.turistecz.turisteczbackend.repository.SitioRepository;
import org.turistecz.turisteczbackend.repository.SitiosRutaUsuarioRepository;

@Service
public class SitiosRutaUsuarioService {
    
    @Autowired
    private SitiosRutaUsuarioRepository sitioRutaUsuarioRepository;

    @Autowired 
    private RutaUsuarioRepository rutaUsuarioRepository;

    @Autowired
    private FavoritosRepository favoritosRepository;

    @Autowired
    private SitioRepository sitioRepository;
    
    public SitiosRutaUsuario almacenarSitioRutaUsuario(Integer id_ruta, Integer id_sitio_favorito, Integer orden) {

        RutaUsuario ruta = rutaUsuarioRepository.findById(id_ruta)
            .orElseThrow(() -> new RuntimeException("RutaUsuario no encontrada"));

        Sitio sitio = sitioRepository.findById(id_sitio_favorito)
            .orElseThrow(() -> new RuntimeException("Sitio no encontrado"));

        Favoritos favorito = favoritosRepository.findBySitio(sitio)
            .orElseThrow(() -> new RuntimeException("Favorito no encontrado"));

        SitiosRutaUsuario sitioRU = new SitiosRutaUsuario();
        sitioRU.setRutaUsuario(ruta);
        sitioRU.setFavoritos(favorito);
        sitioRU.setOrden(orden);
        return sitioRutaUsuarioRepository.save(sitioRU);
    }

    public SitiosRutaUsuario borrarSitios(Integer id){
        SitiosRutaUsuario sitioExistente = sitioRutaUsuarioRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Sitio Ruta no encontrado"));
        sitioRutaUsuarioRepository.delete(sitioExistente);
        return sitioExistente;
    }
}
