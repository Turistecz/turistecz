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

    // ─── CREAR TOKEN ───────────────────────────────
    public VerificationToken crearToken(Usuario usuario, VerificationToken.TipoToken tipo, int horasExpiracion) {
        // Eliminar tokens anteriores del mismo tipo
        tokenRepository.deleteAllByUsuarioAndTipo(usuario, tipo);

        VerificationToken token = new VerificationToken();
        token.setToken(UUID.randomUUID().toString());
        token.setUsuario(usuario);
        token.setTipo(tipo);
        token.setExpiration(LocalDateTime.now().plusHours(horasExpiracion));

        return tokenRepository.save(token);
    }

    // ─── VERIFICAR TOKEN ACTIVACION ───────────────
    public boolean verificarTokenActivacion(String tokenStr) {
        Optional<VerificationToken> optional = tokenRepository.findByToken(tokenStr);

        if (optional.isEmpty()) return false;

        VerificationToken token = optional.get();

        if (token.getExpiration().isBefore(LocalDateTime.now()) || token.getTipo() != VerificationToken.TipoToken.ACTIVACION) {
            tokenRepository.delete(token);
            return false;
        }

        Usuario usuario = token.getUsuario();
        usuario.setActivo(true);
        tokenRepository.delete(token);  // eliminamos token tras activación
        return true;
    }

    // ─── VERIFICAR TOKEN RECUPERACION ─────────────
    public Usuario verificarTokenRecuperacion(String tokenStr) {
        Optional<VerificationToken> optional = tokenRepository.findByToken(tokenStr);

        if (optional.isEmpty()) return null;

        VerificationToken token = optional.get();

        if (token.getExpiration().isBefore(LocalDateTime.now()) || token.getTipo() != VerificationToken.TipoToken.RECUPERACION) {
            tokenRepository.delete(token);
            return null;
        }

        return token.getUsuario();
    }

    // ─── ELIMINAR TOKEN ───────────────────────────
    @Transactional
    public void deleteToken(VerificationToken token) {
        tokenRepository.delete(token);
    }

    @Transactional
    public void deleteAllByUsuarioAndTipo(Usuario usuario, VerificationToken.TipoToken tipo) {
        tokenRepository.deleteAllByUsuarioAndTipo(usuario, tipo);
    }
}
