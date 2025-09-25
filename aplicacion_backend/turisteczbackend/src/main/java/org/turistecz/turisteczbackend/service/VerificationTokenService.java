package org.turistecz.turisteczbackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.turistecz.turisteczbackend.model.Usuario;
import org.turistecz.turisteczbackend.model.VerificationToken;
import org.turistecz.turisteczbackend.repository.VerificationTokenRepository;


import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class VerificationTokenService {

    @Autowired
    private VerificationTokenRepository tokenRepository;

    public VerificationToken crearToken(Usuario usuario, String tipo) {
        VerificationToken token = new VerificationToken();
        token.setToken(UUID.randomUUID().toString());
        token.setUsuario(usuario);
        token.setFechaExpiracion(LocalDateTime.now().plusHours(24)); // ⏰ expira en 24h exactas
        token.setTipo(tipo);

        return tokenRepository.save(token);
    }

    public Optional<VerificationToken> findByTokenAndTipo(String token, String tipo) {
        return tokenRepository.findByTokenAndTipo(token, tipo);
    }

    public Optional<VerificationToken> validateToken(String token, String tipo) {
        Optional<VerificationToken> vToken = findByTokenAndTipo(token, tipo);
        if (vToken.isPresent() && vToken.get().getFechaExpiracion().isAfter(LocalDateTime.now())) {
            return vToken;
        }
        return Optional.empty();
    }

    public void deleteToken(VerificationToken token) {
        tokenRepository.delete(token);
    }
}
