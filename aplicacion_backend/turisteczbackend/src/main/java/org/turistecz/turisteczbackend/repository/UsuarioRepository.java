package org.turistecz.turisteczbackend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.turistecz.turisteczbackend.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {  // ✅ Integer en vez de Long
    Optional<Usuario> findByEmail(String email);
    boolean existsByEmail(String email);
}
