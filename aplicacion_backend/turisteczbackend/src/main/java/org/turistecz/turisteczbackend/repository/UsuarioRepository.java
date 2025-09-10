package org.turistecz.turisteczbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.turistecz.turisteczbackend.model.Usuario;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {  // 🔹 cambiado Long → Integer
    Optional<Usuario> findByEmail(String email);
     boolean existsByEmail(String email);
}
