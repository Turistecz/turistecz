package org.turistecz.turisteczbackend.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import org.turistecz.turisteczbackend.dto.UsuarioDto;
import org.turistecz.turisteczbackend.model.Usuario;
import org.turistecz.turisteczbackend.model.VerificationToken;
import org.turistecz.turisteczbackend.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class UsuarioService {

    private final UsuarioRepository repositorioUsuario;
    private final PasswordEncoder passwordEncoder;
    private final VerificationTokenService verificationService;
    private final emailService emailService;

    public UsuarioService(UsuarioRepository repositorioUsuario,
                          PasswordEncoder passwordEncoder,
                          VerificationTokenService verificationService,
                          emailService emailService) {
        this.repositorioUsuario = repositorioUsuario;
        this.passwordEncoder = passwordEncoder;
        this.verificationService = verificationService;
        this.emailService = emailService;
    }

    public List<Usuario> buscarTodosUsuarios() {
        return repositorioUsuario.findAll();
    }

    public String encontrarNombrePorId(String id) {
        return repositorioUsuario.encontrarNombrePorId(id);
    }

    // 🔹 Validar login verificando activo y contraseña
    public Usuario validarCredenciales(String email, String contrasenaRaw) {
        Usuario usuario = repositorioUsuario.findByEmail(email);
        if (usuario == null) {
            throw new RuntimeException("Usuario no encontrado");
        }

        if (!usuario.getActivo()) {
            throw new RuntimeException("Usuario no verificado. Revisa tu email.");
        }

        if (!passwordEncoder.matches(contrasenaRaw, usuario.getContrasena())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        return usuario;
    }

    // 🔹 Registro de usuario
    public void registrarUsuario(Usuario usuario) {
        // Encriptar contraseña
        usuario.setContrasena(passwordEncoder.encode(usuario.getContrasena()));

        // Usuario inactivo hasta verificar email
        usuario.setActivo(false);
        usuario.setFecha_creacion(LocalDate.now());

        // Guardar usuario
        Usuario nuevoUsuario = repositorioUsuario.save(usuario);

        // Crear token de verificación
        VerificationToken token = verificationService.crearTokenParaUsuario(nuevoUsuario);

        // Enviar email con enlace de verificación
        String linkVerificacion = "http://localhost:8080/auth/verify?token=" + token.getToken();
        String cuerpo = "Hola " + usuario.getNombre() + ",\n\nGracias por registrarte en Turistecz. Por favor verifica tu cuenta haciendo clic en el siguiente enlace:\n\n"
                      + linkVerificacion + "\n\nEste enlace expirará en 24 horas.";

        emailService.enviarEmail(usuario.getEmail(), "Verificación de cuenta", cuerpo);
    }

    // 🔹 Registrar usuario desde DTO
    public void registrarUsuarioDesdeDto(UsuarioDto usuarioDto) {
        Usuario usuario = new Usuario();
        usuario.setNombre(usuarioDto.getNombre());
        usuario.setApellido(usuarioDto.getApellido());
        usuario.setEmail(usuarioDto.getEmail());
        usuario.setContrasena(usuarioDto.getContrasena());

        registrarUsuario(usuario);
    }

    public boolean existsByEmail(String email) {
        return repositorioUsuario.findByEmail(email) != null;
    }

    public Usuario buscarPorEmail(String email) {
        Usuario usuario = repositorioUsuario.findByEmail(email);
        if (usuario == null) {
            throw new RuntimeException("Usuario no encontrado");
        }
        return usuario;
    }

    public void cambiarEmail(Integer userId, String nuevoEmail) {
        Usuario usuario = repositorioUsuario.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (existsByEmail(nuevoEmail)) {
            throw new RuntimeException("El email ya está registrado");
        }

        usuario.setEmail(nuevoEmail);
        repositorioUsuario.save(usuario);
    }

    public void cambiarContrasena(Integer userId, String actualContrasena, String nuevaContrasena) {
        Usuario usuario = repositorioUsuario.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!passwordEncoder.matches(actualContrasena, usuario.getContrasena())) {
            throw new RuntimeException("La contraseña actual no es correcta");
        }

        usuario.setContrasena(passwordEncoder.encode(nuevaContrasena));
        repositorioUsuario.save(usuario);
    }
}
