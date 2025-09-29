package org.turistecz.turisteczbackend.repository;

//import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.turistecz.turisteczbackend.model.Filtro;

public interface FiltroRepository extends JpaRepository<Filtro, Integer> {
    
    // @Query("SELECT f.filtro_id FROM Filtros_user f WHERE f.usuario.id = :usuarioId")
    // Filtro findFiltroByUsuarioId(int usuarioId);
}