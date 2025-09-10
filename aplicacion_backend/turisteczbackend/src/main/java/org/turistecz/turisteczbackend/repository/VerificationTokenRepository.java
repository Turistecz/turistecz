package org.turistecz.turisteczbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.turistecz.turisteczbackend.model.TokenType;
import org.turistecz.turisteczbackend.model.Usuario;
import org.turistecz.turisteczbackend.model.VerificationToken;
import org.turistecz.turisteczbackend.model.VerificationToken.TipoToken;

import java.util.List;
import java.util.Optional;

@Repository
public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Integer> {

    Optional<VerificationToken> findByToken(String token);

    List<VerificationToken> findAllByUsuarioAndTipo(Usuario usuario, TipoToken tipo);

    default void deleteAllByUsuarioAndTipo(Usuario usuario, TipoToken tipo) {
        List<VerificationToken> tokens = findAllByUsuarioAndTipo(usuario, tipo);
        deleteAll(tokens);
    }

    Optional<VerificationToken> findByTokenAndTipo(String token, TokenType tipo);
}
