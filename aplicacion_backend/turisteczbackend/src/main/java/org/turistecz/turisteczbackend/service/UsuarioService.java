package org.turistecz.turisteczbackend.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.turistecz.turisteczbackend.dto.UsuarioDto;
import org.turistecz.turisteczbackend.model.Usuario;
import org.turistecz.turisteczbackend.model.VerificationToken;
import org.turistecz.turisteczbackend.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;



@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repositorioUsuario;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private VerificationTokenService verificationService;

    @Autowired
    private emailService emailService;

    public List<Usuario> buscarTodosUsuarios() {
        return repositorioUsuario.findAll();
    }

    public String encontrarNombrePorId(String id) {
        return repositorioUsuario.encontrarNombrePorId(id);
    }

    public Usuario validarCredenciales(String email, String contrasenaRaw) {
        Usuario usuario = repositorioUsuario.findByEmail(email);
        if (usuario != null && passwordEncoder.matches(contrasenaRaw, usuario.getContrasena())) {
            return usuario;
        }
        return null;
    }

    public void registrarUsuario(Usuario usuario) {
        // Encriptar contraseña
        String hash = passwordEncoder.encode(usuario.getContrasena());
        usuario.setContrasena(hash);

        // Poner activo = false
        usuario.setActivo(false);

        // Guardar el usuario en la base de datos
        Usuario nuevoUsuario = repositorioUsuario.save(usuario);

        // Crear token de verificación
        VerificationToken token = verificationService.crearTokenParaUsuario(nuevoUsuario);

        // Enviar email con el enlace de verificación
        String linkVerificacion = "http://localhost:8080/auth/verify?token=" + token.getToken();
        String cuerpo = "Hola " + usuario.getNombre() + ",\n\nGracias por registrarte en Turistecz. Por favor verifica tu cuenta haciendo clic en el siguiente enlace:\n\n"
                      + linkVerificacion + "\n\nEste enlace expirará en 24 horas.";

        emailService.enviarEmail(usuario.getEmail(), "Verificación de cuenta", cuerpo);
    }

    public void registrarUsuarioDesdeDto(UsuarioDto usuarioDto) {
        Usuario usuario = new Usuario();
        usuario.setNombre(usuarioDto.getNombre());
        usuario.setApellido(usuarioDto.getApellido());
        usuario.setEmail(usuarioDto.getEmail());
        usuario.setContrasena(usuarioDto.getContrasena());
        usuario.setFecha_creacion(LocalDate.now());

        registrarUsuario(usuario);
    }

    public boolean existsByEmail(String email) {
        return repositorioUsuario.findByEmail(email) != null;
    }

    public void crearUsuario(UsuarioDto usuarioDto) {
        Usuario usuario = new Usuario();
        usuario.setNombre(usuarioDto.getNombre());
        usuario.setApellido(usuarioDto.getApellido());
        usuario.setEmail(usuarioDto.getEmail());
        usuario.setContrasena(usuarioDto.getContrasena());
        usuario.setFecha_creacion(LocalDate.now());

        registrarUsuario(usuario);
    }
}


