package org.turistecz.turisteczbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.turistecz.turisteczbackend.model.Favoritos;

public interface FavoritosRepository extends JpaRepository <Favoritos, Integer>{
    
}
