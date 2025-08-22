package org.turistecz.turisteczbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.turistecz.turisteczbackend.dto.UsuarioDto;
import org.turistecz.turisteczbackend.dto.ChangeEmailDto;
import org.turistecz.turisteczbackend.dto.ChangePasswordDto;
import org.turistecz.turisteczbackend.model.Usuario;
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
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UsuarioDto usuarioDto) {
        if (usuarioService.existsByEmail(usuarioDto.getEmail())) {
            return ResponseEntity.badRequest().body("El email ya está registrado");
        } 

        usuarioService.crearUsuario(usuarioDto);
       
        return ResponseEntity.ok("Registro exitoso. Revisa tu correo para activar tu cuenta.");
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/verify")
    public ResponseEntity<?> verificarCuenta(@RequestParam String token) {
        boolean resultado = verificationTokenService.verificarToken(token);
        if (resultado) {
            return ResponseEntity.ok("Cuenta activada correctamente");
        } else {
            return ResponseEntity.badRequest().body("Token inválido o expirado");
        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
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

     @CrossOrigin(origins = "http://localhost:4200")
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



}
