package org.turistecz.turisteczbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.turistecz.turisteczbackend.dto.*;
import org.turistecz.turisteczbackend.model.Usuario;
import org.turistecz.turisteczbackend.model.VerificationToken;
import org.turistecz.turisteczbackend.service.UsuarioService;
import org.turistecz.turisteczbackend.service.VerificationTokenService;
import org.turistecz.turisteczbackend.security.JwtUtil;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private VerificationTokenService verificationTokenService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UsuarioDto usuarioDto) {
        if (usuarioService.existsByEmail(usuarioDto.getEmail())) {
            return ResponseEntity.badRequest().body("El email ya está registrado");
        }

        usuarioService.registrarUsuarioDesdeDto(usuarioDto);
        return ResponseEntity.ok("Registro exitoso. Revisa tu correo para activar tu cuenta.");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Usuario usuario = usuarioService.buscarPorEmail(request.getEmail());
        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario no encontrado");
        }

        if (!passwordEncoder.matches(request.getContrasena(), usuario.getContrasena())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Contraseña incorrecta");
        }

        String accessToken = jwtUtil.generateToken(usuario.getEmail(), usuario.getId());

        return ResponseEntity.ok(new LoginResponse(accessToken, usuario));
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verificarCuenta(@RequestParam String token) {
        Optional<VerificationToken> vTokenOpt = verificationTokenService.validateToken(token, "ACTIVACION");

        if (vTokenOpt.isPresent()) {
            VerificationToken vToken = vTokenOpt.get();
            Usuario usuario = vToken.getUsuario();
            usuario.setActivo(true);
            usuarioService.save(usuario);
            verificationTokenService.deleteToken(vToken);
            return ResponseEntity.ok("Cuenta activada correctamente");
        }

        return ResponseEntity.badRequest().body("Token inválido o expirado");
    }

    @PutMapping("/change-email")
    public ResponseEntity<?> changeEmail(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody ChangeEmailDto dto) {

        String token = authHeader.substring(7);
        String email = jwtUtil.getEmail(token);

        Usuario usuario = usuarioService.buscarPorEmail(email);
        usuarioService.cambiarEmail(usuario.getId(), dto.getNuevoEmail());

        return ResponseEntity.ok("Email actualizado correctamente");
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody ChangePasswordDto dto) {

        String token = authHeader.substring(7);
        String email = jwtUtil.getEmail(token);

        Usuario usuario = usuarioService.buscarPorEmail(email);
        usuarioService.cambiarContrasena(usuario.getId(), dto.getActualContrasena(), dto.getNuevaContrasena());

        return ResponseEntity.ok("Contraseña actualizada correctamente");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Recuperar_contrasenaDto dto) {
        Usuario usuario = usuarioService.buscarPorEmail(dto.getEmail());
        if (usuario == null) {
            return ResponseEntity.badRequest().body("Correo no registrado");
        }

        VerificationToken token = verificationTokenService.crearToken(usuario, "RECOVERY");
        String enlace = "http://localhost:4200/reset-password?token=" + token.getToken();

        usuarioService.enviarCorreoRecuperacion(usuario.getEmail(), enlace);
        return ResponseEntity.ok("Se ha enviado un enlace de recuperación a tu correo");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(
            @RequestParam String token,
            @RequestBody Resetear_contrasenaDto dto) {

        Optional<VerificationToken> vTokenOpt = verificationTokenService.validateToken(token, "RECOVERY");
        if (vTokenOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Token inválido o expirado");
        }

        if (!dto.getNuevaContrasena().equals(dto.getConfirmarContrasena())) {
            return ResponseEntity.badRequest().body("Las contraseñas no coinciden");
        }

        VerificationToken vToken = vTokenOpt.get();
        Usuario usuario = vToken.getUsuario();

        usuarioService.actualizarContrasena(usuario.getId(), dto.getNuevaContrasena());
        verificationTokenService.deleteToken(vToken);

        return ResponseEntity.ok("Contraseña actualizada correctamente.");
    }

    public static class LoginResponse {
        private String accessToken;
        private Usuario usuario;

        public LoginResponse(String accessToken, Usuario usuario) {
            this.accessToken = accessToken;
            this.usuario = usuario;
        }

        public String getAccessToken() { return accessToken; }
        public void setAccessToken(String accessToken) { this.accessToken = accessToken; }
        public Usuario getUsuario() { return usuario; }
        public void setUsuario(Usuario usuario) { this.usuario = usuario; }
    }
}
