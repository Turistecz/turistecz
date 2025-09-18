package org.turistecz.turisteczbackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.turistecz.turisteczbackend.dto.UsuarioDto;
import org.turistecz.turisteczbackend.model.Usuario;
import org.turistecz.turisteczbackend.model.VerificationToken;
import org.turistecz.turisteczbackend.repository.UsuarioRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @Autowired
    private VerificationTokenService verificationTokenService;

    // 🔹 Registrar usuario
    public Usuario registrarUsuarioDesdeDto(UsuarioDto dto) {
        Usuario usuario = new Usuario();
        usuario.setEmail(dto.getEmail());
        usuario.setContrasena(passwordEncoder.encode(dto.getContrasena()));
        usuario.setNombre(dto.getNombre());
        usuario.setActivo(false);

        Usuario guardado = usuarioRepository.save(usuario);

        // Generar token de activación
        VerificationToken token = verificationTokenService.crearToken(guardado, "ACTIVACION");
        String enlace = "http://localhost:8080/auth/verify?token=" + token.getToken();

        emailService.enviarCorreo(
                guardado.getEmail(),
                "Activa tu cuenta",
                "Haz clic en el siguiente enlace para activar tu cuenta:\n" + enlace
        );

        return guardado;
    }

    // 🔹 Guardar usuario
    public Usuario save(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    // 🔹 Buscar por email
    public Usuario buscarPorEmail(String email) {
        Optional<Usuario> usuario = usuarioRepository.findByEmail(email);
        return usuario.orElse(null);
    }

    // 🔹 Verificar si existe email
    public boolean existsByEmail(String email) {
        return usuarioRepository.findByEmail(email).isPresent();
    }

    // 🔹 Cambiar email
    public void cambiarEmail(Integer id, String nuevoEmail) {
        usuarioRepository.findById(id).ifPresent(usuario -> {
            usuario.setEmail(nuevoEmail);
            usuarioRepository.save(usuario);
        });
    }

    // 🔹 Cambiar contraseña (con validación de la actual)
    public void cambiarContrasena(Integer id, String actual, String nueva) {
        usuarioRepository.findById(id).ifPresent(usuario -> {
            if (passwordEncoder.matches(actual, usuario.getContrasena())) {
                usuario.setContrasena(passwordEncoder.encode(nueva));
                usuarioRepository.save(usuario);
            } else {
                throw new IllegalArgumentException("Contraseña actual incorrecta");
            }
        });
    }

    // 🔹 Actualizar contraseña directamente (para reset con token)
    public void actualizarContrasena(Integer id, String nueva) {
        usuarioRepository.findById(id).ifPresent(usuario -> {
            usuario.setContrasena(passwordEncoder.encode(nueva));
            usuarioRepository.save(usuario);
        });
    }

    // 🔹 Enviar correo de recuperación
    public void enviarCorreoRecuperacion(String email, String enlace) {
        emailService.enviarCorreo(
                email,
                "Recuperación de contraseña",
                "Haz clic en el siguiente enlace para restablecer tu contraseña:\n" + enlace
        );
    }

    // 🔹 Obtener todos los usuarios
    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    // 🔹 Buscar por ID
    public Optional<Usuario> findById(Integer id) {
        return usuarioRepository.findById(id);
    }

    // 🔹 Eliminar usuario por ID
    public void deleteById(Integer id) {
        usuarioRepository.deleteById(id);
    }
}
