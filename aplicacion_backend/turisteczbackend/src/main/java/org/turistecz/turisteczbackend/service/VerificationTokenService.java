package org.turistecz.turisteczbackend.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.turistecz.turisteczbackend.model.Usuario;
import org.turistecz.turisteczbackend.model.VerificationToken;
import org.turistecz.turisteczbackend.repository.VerificationTokenRepository;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class VerificationTokenService {

    private final VerificationTokenRepository tokenRepository;

    public VerificationTokenService(VerificationTokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    public VerificationToken crearToken(Usuario usuario) {
        VerificationToken token = new VerificationToken();
        token.setToken(UUID.randomUUID().toString());
        token.setUsuario(usuario);
        token.setExpiration(LocalDateTime.now().plusHours(48));
        return tokenRepository.save(token);
    }

     public Optional<VerificationToken> validateToken(String tokenStr) {
        return tokenRepository.findByToken(tokenStr)
                .filter(t -> t.getExpiration() != null && t.getExpiration().isAfter(LocalDateTime.now()));
    }

    // Borrar token
    @Transactional
    public void deleteToken(VerificationToken token) {
        tokenRepository.delete(token);
    }
}
