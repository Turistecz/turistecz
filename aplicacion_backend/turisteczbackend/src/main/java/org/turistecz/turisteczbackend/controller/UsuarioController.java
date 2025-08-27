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
        try {
            // 🔹 Log de entrada
            System.out.println("Intento de login: " + datosLogin.getEmail());

            // 🔹 Buscar usuario por email
            Usuario usuario = usuarioService.validarCredenciales(
                datosLogin.getEmail(),
                datosLogin.getContrasena()
            );

            // 🔹 Si usuario es null (no debería pasar si validarCredenciales lanza excepción)
            if (usuario == null) {
                return ResponseEntity.status(401).body("Credenciales inválidas");
            }

        // 🔹 Crear respuesta sin exponer contraseña
        Usuario respuesta = new Usuario();
        respuesta.setId(usuario.getId());
        respuesta.setNombre(usuario.getNombre());
        respuesta.setApellido(usuario.getApellido());
        respuesta.setEmail(usuario.getEmail());
        respuesta.setActivo(usuario.getActivo());
        respuesta.setFecha_creacion(usuario.getFecha_creacion());

        // 🔹 Generar JWT
        String token = jwtUtil.generateToken(usuario.getEmail(), usuario.getId());
        System.out.println("Token generado: " + token);

        // 🔹 Devolver usuario + token
        return ResponseEntity.ok(Map.of(
            "usuario", respuesta,
            "token", token
        ));

        } catch (RuntimeException e) {
            // 🔹 Capturar errores conocidos
            System.err.println("Error en login: " + e.getMessage());
            return ResponseEntity.status(401).body(e.getMessage());
        } catch (Exception e) {
            // 🔹 Capturar cualquier error inesperado
            System.err.println("Error inesperado en login: " + e);
            return ResponseEntity.status(500).body("Error interno del servidor");
        }
    }

}
