package org.turistecz.turisteczbackend.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.turistecz.turisteczbackend.model.Usuario;
import org.turistecz.turisteczbackend.model.VerificationToken;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Integer> {

    Optional<VerificationToken> findByToken(String token);

    // 🔹 Método necesario para eliminar tokens anteriores del mismo tipo
    void deleteAllByUsuarioAndTipo(Usuario usuario, VerificationToken.TipoToken tipo);
}
