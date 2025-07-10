package org.turistecz.turisteczbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.turistecz.turisteczbackend.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

     @Query("SELECT u.nombre FROM Usuario u WHERE u.id = :id")
     String encontrarNombrePorId(@Param("id") String id);

	
    
}
