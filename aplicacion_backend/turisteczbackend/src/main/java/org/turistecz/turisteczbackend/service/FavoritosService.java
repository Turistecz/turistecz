package org.turistecz.turisteczbackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import org.turistecz.turisteczbackend.model.Favoritos;
import org.turistecz.turisteczbackend.model.Sitio;
import org.turistecz.turisteczbackend.repository.FavoritosRepository;

@Service
public class FavoritosService {

    @Autowired
    private FavoritosRepository repositorioFavoritos;

    // Comprobar si un sitio es favorito de un usuario
    public boolean comprobarFavorito(int idusuario, int idsitio) {
        Favoritos f = repositorioFavoritos.comprobarFavorito(idusuario, idsitio);
        return f != null;
    }

    // Añadir un favorito
    public Favoritos addFavoritos(Favoritos favorito) {
        return repositorioFavoritos.save(favorito);
    }

    // Eliminar un favorito
    public void removeFavorito(int usuarioId, int sitioId) {
        repositorioFavoritos.deleteByUsuarioAndSitio(usuarioId, sitioId);
    }

    // Traer los sitios favoritos de un usuario
    public List<Sitio> getFavoritosbyUsuario(int usuarioId) {
        List<Favoritos> favoritos = repositorioFavoritos.findByUsuario_Id(usuarioId);

        // Mapear directamente a los objetos Sitio
        return favoritos.stream()
                .map(Favoritos::getSitio)
                .toList();
    }
}
