package org.turistecz.turisteczbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.turistecz.turisteczbackend.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    
    
}
