package org.turistecz.turisteczbackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import org.turistecz.turisteczbackend.dto.FavoriteDto;
import org.turistecz.turisteczbackend.model.Favoritos;
import org.turistecz.turisteczbackend.repository.FavoritosRepository;


@Service
public class FavoritosService {
   
    @Autowired
    FavoritosRepository repositorioFavoritos;

    public boolean comprobarFavorito(int idusuario, int idsitio){
        Favoritos f = repositorioFavoritos.comprobarFavorito(idusuario, idsitio);
        if (f == null){
            return false;
        }else{
            
            return true; 
        }        
    }

    public Favoritos addFavoritos(Favoritos favorito){
        return repositorioFavoritos.save(favorito);
    }
   public void removeFavorito(int usuarioId, int sitioId){
    repositorioFavoritos.deleteByUsuarioAndSitio(usuarioId, sitioId);
}

   public List<FavoriteDto> getFavoritosbyUsuario(int usuarioId){
        List<Favoritos> favoritos = repositorioFavoritos.findByUsuario_Id(usuarioId);

        // convertir a DTOs
        return favoritos.stream()
                .map(f -> new FavoriteDto(f.getUsuario().getId(), f.getSitio().getId()))
                .toList();
    }


}
