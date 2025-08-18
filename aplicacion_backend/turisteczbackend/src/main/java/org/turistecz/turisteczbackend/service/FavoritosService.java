package org.turistecz.turisteczbackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import org.turistecz.turisteczbackend.model.Favoritos;
import org.turistecz.turisteczbackend.repository.FavoritosRepository;


@Service
public class FavoritosService {
   
    @Autowired
    FavoritosRepository repositorioFavoritos;

    public List<Favoritos> marcarComoFavorito() {
        return repositorioFavoritos.findAll();
    }

}
