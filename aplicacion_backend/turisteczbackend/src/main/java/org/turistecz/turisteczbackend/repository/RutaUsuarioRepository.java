package org.turistecz.turisteczbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.turistecz.turisteczbackend.model.RutaUsuario;

public interface RutaUsuarioRepository extends JpaRepository<RutaUsuario, Integer> {

    // @Query("SELECT ru FROM RutaUsuario ru ORDER BY ru.id DESC LIMIT 1")
    // RutaUsuario buscarUltimaRutaUsuario();

    @Query("SELECT ru FROM RutaUsuario ru WHERE ru.id_usuario = :id_usuario")
    List<RutaUsuario> encontrarRutasUsuario(@Param("id_usuario") Integer id_usuario);
}
