package org.turistecz.turisteczbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.turistecz.turisteczbackend.model.Filtro;

public interface FiltroRepository extends JpaRepository<Filtro, Integer> {
    
}