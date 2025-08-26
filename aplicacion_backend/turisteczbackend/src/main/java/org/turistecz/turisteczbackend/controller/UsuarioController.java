package org.turistecz.turisteczbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.turistecz.turisteczbackend.model.Usuario;
import org.turistecz.turisteczbackend.service.UsuarioService;
import org.turistecz.turisteczbackend.security.JwtUtil;

import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private JwtUtil jwtUtil;

    // 🔹 Listar todos los usuarios
    @GetMapping("/login/usuarios")
    public ResponseEntity<List<Usuario>> listar() {
        List<Usuario> usuarios = usuarioService.buscarTodosUsuarios();
        return ResponseEntity.ok(usuarios);
    }

    // 🔹 Obtener nombre de usuario por ID
    @GetMapping("/login/{id}/nombre")
    public ResponseEntity<String> obtenerNombre(@PathVariable String id) {
        String nombre = usuarioService.encontrarNombrePorId(id);
        return nombre != null ? ResponseEntity.ok(nombre)
                              : ResponseEntity.notFound().build();
    }

    // 🔹 Login que devuelve JWT
    @PostMapping("/login/signin")
    public ResponseEntity<?> login(@RequestBody Usuario datosLogin) {
        Usuario usuario = usuarioService.validarCredenciales(
            datosLogin.getEmail(),
            datosLogin.getContrasena()
        );

        if (usuario != null) {
            // ✅ Generar token JWT
            String token = jwtUtil.generateToken(usuario.getEmail(), usuario.getId());

            // ✅ Devolver token y datos básicos del usuario
            return ResponseEntity.ok(Map.of(
                "token", token,
                "id", usuario.getId(),
                "nombre", usuario.getNombre(),
                "email", usuario.getEmail()
            ));
        } else {
            return ResponseEntity.status(401).body("Credenciales inválidas");
        }
    }
}
