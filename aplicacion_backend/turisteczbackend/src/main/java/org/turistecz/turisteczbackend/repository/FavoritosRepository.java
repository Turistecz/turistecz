package org.turistecz.turisteczbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.turistecz.turisteczbackend.dto.FavoriteDto;
import org.turistecz.turisteczbackend.model.Favoritos;

import java.util.List;

public interface FavoritosRepository extends JpaRepository <Favoritos, Integer>{
     List<Favoritos> findByUsuario_Id(int usuarioId);
}
