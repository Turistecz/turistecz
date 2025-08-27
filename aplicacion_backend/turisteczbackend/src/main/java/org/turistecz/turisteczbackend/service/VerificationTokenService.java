package org.turistecz.turisteczbackend.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.turistecz.turisteczbackend.model.Usuario;
import org.turistecz.turisteczbackend.model.VerificationToken;
import org.turistecz.turisteczbackend.repository.UsuarioRepository;
import org.turistecz.turisteczbackend.repository.VerificationTokenRepository;

@Service
public class VerificationTokenService {

    @Autowired
    private VerificationTokenRepository tokenRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    // 🔹 Crear token genérico
    public VerificationToken crearToken(Usuario usuario, VerificationToken.TipoToken tipo, int horasExpiracion) {
        // Eliminar tokens anteriores del mismo tipo
        tokenRepository.deleteAllByUsuarioAndTipo(usuario, tipo);

        String tokenStr = UUID.randomUUID().toString();
        VerificationToken token = new VerificationToken();
        token.setToken(tokenStr);
        token.setUsuario(usuario);
        token.setTipo(tipo);
        token.setFecha_expiracion(LocalDateTime.now().plusHours(horasExpiracion));

        VerificationToken saved = tokenRepository.save(token);
        System.out.println("Token creado para " + tipo + ": " + saved.getToken() + " (usuario=" + usuario.getEmail() + ")");
        return saved;
    }

    // 🔹 Verificar token de activación
    public boolean verificarTokenActivacion(String token) {
        Optional<VerificationToken> optional = tokenRepository.findByToken(token);

        if (optional.isEmpty()) {
            System.out.println("Token de activación inválido");
            return false;
        }

        VerificationToken vt = optional.get();
        if (vt.getFecha_expiracion().isBefore(LocalDateTime.now())) {
            tokenRepository.delete(vt);
            System.out.println("Token de activación expirado y eliminado");
            return false;
        }

        if (vt.getTipo() != VerificationToken.TipoToken.ACTIVACION) {
            System.out.println("Token no es de activación");
            return false;
        }

        Usuario usuario = vt.getUsuario();
        usuario.setActivo(true);
        usuarioRepository.save(usuario);
        tokenRepository.delete(vt);

        System.out.println("Usuario activado: " + usuario.getEmail());
        return true;
    }

    // 🔹 Verificar token de recuperación
    public Usuario verificarTokenRecuperacion(String token) {
        Optional<VerificationToken> optional = tokenRepository.findByToken(token);

        if (optional.isEmpty()) {
            System.out.println("Token de recuperación inválido");
            return null;
        }

        VerificationToken vt = optional.get();
        if (vt.getFecha_expiracion().isBefore(LocalDateTime.now())) {
            tokenRepository.delete(vt);
            System.out.println("Token de recuperación expirado y eliminado");
            return null;
        }

        if (vt.getTipo() != VerificationToken.TipoToken.RECUPERACION) {
            System.out.println("Token no es de recuperación");
            return null;
        }

        return vt.getUsuario();
    }

    // 🔹 Limpiar tokens expirados (opcional, cron o manual)
    public void limpiarTokensExpirados() {
        tokenRepository.findAll().stream()
                .filter(t -> t.getFecha_expiracion().isBefore(LocalDateTime.now()))
                .forEach(t -> {
                    System.out.println("Eliminando token expirado: " + t.getToken());
                    tokenRepository.delete(t);
                });
    }
}
