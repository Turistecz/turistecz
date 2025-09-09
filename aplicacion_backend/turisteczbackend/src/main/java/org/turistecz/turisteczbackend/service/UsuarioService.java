package org.turistecz.turisteczbackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.turistecz.turisteczbackend.dto.UsuarioDto;
import org.turistecz.turisteczbackend.model.Usuario;
import org.turistecz.turisteczbackend.model.VerificationToken;
import org.turistecz.turisteczbackend.repository.UsuarioRepository;
import com.sendgrid.*;

import java.util.List;
import java.util.Optional;
import java.io.IOException;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private VerificationTokenService verificationTokenService;

    @Autowired
    private SendGrid sendGrid;

    private static final String FROM_EMAIL = "pruebasturistecz@gmail.com";

    // 🔹 Registro de usuario
    public Usuario registrarUsuarioDesdeDto(UsuarioDto dto) {
        Usuario usuario = new Usuario();
        usuario.setNombre(dto.getNombre());
        usuario.setEmail(dto.getEmail());
        usuario.setPassword(passwordEncoder.encode(dto.getContrasena()));
        usuario.setActivo(false);

        
        Usuario saved = usuarioRepository.save(usuario);

        var token = verificationTokenService.crearToken(
                saved,
                VerificationToken.TipoToken.ACTIVACION,
                48 // expira en 48 horas
        );

        String enlace = "http://localhost:4200/verify?token=" + token.getToken();

        enviarCorreoVerificacion(saved.getEmail(), enlace);

        return saved;
    }

    // 🔹 Verificar existencia por email
    public boolean existsByEmail(String email) {
        return usuarioRepository.existsByEmail(email);
    }

    // 🔹 Buscar usuario por email
    public Usuario buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email).orElse(null);
    }

    public Optional<Usuario> findById(Integer id) {
        return usuarioRepository.findById(id);
    }

    // 🔹 Cambiar email
    public void cambiarEmail(Integer id, String nuevoEmail) {
        usuarioRepository.findById(id).ifPresent(usuario -> {
            usuario.setEmail(nuevoEmail);
            usuarioRepository.save(usuario);
        });
    }

    // 🔹 Cambiar contraseña
    public void cambiarContrasena(Integer id, String actual, String nueva) {
        usuarioRepository.findById(id).ifPresent(usuario -> {
            if (passwordEncoder.matches(actual, usuario.getPassword())) {
                usuario.setPassword(passwordEncoder.encode(nueva));
                usuarioRepository.save(usuario);
            } else {
                throw new IllegalArgumentException("Contraseña actual incorrecta");
            }
        });
    }

    // 🔹 Forzar actualización de contraseña (reset password)
    public void actualizarContrasena(Integer id, String nueva) {
        usuarioRepository.findById(id).ifPresent(usuario -> {
            usuario.setPassword(passwordEncoder.encode(nueva));
            usuarioRepository.save(usuario);
        });
    }

    // 🔹 Aquí iría tu lógica real de envío de correos
    public void enviarCorreoRecuperacion(String email, String enlace) {
        System.out.println("Enlace de recuperación enviado a " + email + ": " + enlace);
    }

    public void enviarCorreoVerificacion(String email, String enlace) {
        System.out.println("Enlace de verificación enviado a " + email + ": " + enlace);
    }

    // 🔹 Otros métodos
    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    public void deleteById(Integer id) {
        usuarioRepository.deleteById(id);
    }
}
