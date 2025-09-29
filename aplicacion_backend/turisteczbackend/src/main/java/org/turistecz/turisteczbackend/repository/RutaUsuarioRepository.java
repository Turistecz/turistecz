package org.turistecz.turisteczbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;
import org.turistecz.turisteczbackend.model.RutaUsuario;

public interface RutaUsuarioRepository extends JpaRepository<RutaUsuario, Integer> {

    // @Query("SELECT ru FROM RutaUsuario ru ORDER BY ru.id DESC LIMIT 1")
    // RutaUsuario buscarUltimaRutaUsuario();

}
