package org.turistecz.turisteczbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.turistecz.turisteczbackend.model.RutaUsuario;

public interface RutaUsuarioRepository extends JpaRepository<RutaUsuario, Integer> {

    @Query("SELECT ru FROM RutaUsuario ru WHERE ru.usuario.id = :id")
    List<RutaUsuario> encontrarRutasUsuario(@Param("id") Integer id);

}
