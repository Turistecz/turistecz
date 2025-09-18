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

    // 🔹 Crear token con tipo (ACTIVACION o RECOVERY)
    public VerificationToken crearToken(Usuario usuario, String tipo) {
        VerificationToken token = new VerificationToken();
        token.setToken(UUID.randomUUID().toString());
        token.setUsuario(usuario);
        token.setFechaExpiracion(LocalDateTime.now().plusHours(1)); // expira en 1h
        token.setTipo(tipo);

        return tokenRepository.save(token);
    }

    // 🔹 Buscar token por valor y tipo
    public Optional<VerificationToken> findByTokenAndTipo(String token, String tipo) {
        return tokenRepository.findByTokenAndTipo(token, tipo);
    }

    // 🔹 Validar token
    public Optional<VerificationToken> validateToken(String token, String tipo) {
        Optional<VerificationToken> vToken = findByTokenAndTipo(token, tipo);
        if (vToken.isPresent() && vToken.get().getFechaExpiracion().isAfter(LocalDateTime.now())) {
            return vToken;
        }
        return Optional.empty();
    }

    // 🔹 Eliminar token después de usarlo
    public void deleteToken(VerificationToken token) {
        tokenRepository.delete(token);
    }
}
