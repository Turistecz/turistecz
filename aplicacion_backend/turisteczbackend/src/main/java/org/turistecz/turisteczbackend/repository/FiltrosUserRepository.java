package org.turistecz.turisteczbackend.repository;

//import java.util.List;
//import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.turistecz.turisteczbackend.model.Filtro;
import org.turistecz.turisteczbackend.model.Filtros_user;

public interface FiltrosUserRepository extends JpaRepository<Filtros_user, Integer> {

    boolean existsByUsuarioIdAndFiltroId(int usuarioId, int filtroId);

    Optional<Filtros_user> findByUsuarioIdAndFiltroId(int usuarioId, int filtroId);

    void deleteByUsuarioIdAndFiltroId(int usuarioId, int filtroId);

    @Query("SELECT f.filtro FROM Filtros_user f WHERE f.usuario.id = :usuarioId")
    Filtro findFiltroByUsuarioId(int usuarioId);
    
}
