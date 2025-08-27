package org.turistecz.turisteczbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.turistecz.turisteczbackend.dto.UsuarioDto;
import org.turistecz.turisteczbackend.dto.ChangeEmailDto;
import org.turistecz.turisteczbackend.dto.ChangePasswordDto;
import org.turistecz.turisteczbackend.dto.Recuperar_contrasenaDto;
import org.turistecz.turisteczbackend.dto.Resetear_contrasenaDto;
import org.turistecz.turisteczbackend.model.Usuario;
import org.turistecz.turisteczbackend.model.VerificationToken;
import org.turistecz.turisteczbackend.service.UsuarioService;
import org.turistecz.turisteczbackend.service.VerificationTokenService;
import org.turistecz.turisteczbackend.security.JwtUtil;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private VerificationTokenService verificationTokenService;

    // 🔹 Registro de usuario
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UsuarioDto usuarioDto) {
        if (usuarioService.existsByEmail(usuarioDto.getEmail())) {
            return ResponseEntity.badRequest().body("El email ya está registrado");
        }

        usuarioService.registrarUsuarioDesdeDto(usuarioDto); // ✅ método correcto
        return ResponseEntity.ok("Registro exitoso. Revisa tu correo para activar tu cuenta.");
    }

    // 🔹 Verificación de cuenta
    @GetMapping("/verify")
    public ResponseEntity<?> verificarCuenta(@RequestParam String token) {
        boolean resultado = verificationTokenService.verificarToken(token);
        if (resultado) {
            return ResponseEntity.ok("Cuenta activada correctamente");
        } else {
            return ResponseEntity.badRequest().body("Token inválido o expirado");
        }
    }

    // 🔹 Cambiar email
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

    // 🔹 Cambiar contraseña
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
    
    // 🔹 Petición de recuperación de contraseña
        @PostMapping("/forgot-password")
        public ResponseEntity<?> forgotPassword(@RequestBody Recuperar_contrasenaDto dto) {
                Usuario usuario = usuarioService.buscarPorEmail(dto.getEmail());
            if (usuario == null) {
            return ResponseEntity.badRequest().body("No existe un usuario con ese email");
            }

            VerificationToken token = verificationTokenService.generarTokenRecuperacion(usuario);

            String enlace = "http://localhost:4200/reset-password?token=" + token;

            usuarioService.enviarCorreoRecuperacion(dto.getEmail(), enlace);

            return ResponseEntity.ok("Correo enviado si el usuario existe");
        }

        
        @PostMapping("/reset-password")
        public ResponseEntity<?> resetPassword(@RequestParam String token, @RequestParam String nuevaContrasena) {
            Usuario usuario = verificationTokenService.getUsuarioDesdeTokenRecuperacion(token);
            if (usuario == null) {
                return ResponseEntity.badRequest().body("Token inválido o expirado");
            }

            usuarioService.actualizarContrasena(usuario.getId(), nuevaContrasena);
            return ResponseEntity.ok("Contraseña actualizada correctamente.");
        }
        
}
