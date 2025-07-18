package org.turistecz.turisteczbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.turistecz.turisteczbackend.model.Usuario;
import org.turistecz.turisteczbackend.service.UsuarioService;
import java.util.List;


@RestController
@RequestMapping("/api")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;
  
    //Este es uno de los endpoints publicados por este Controller. Se encontraria en la URL
    //"http://localhost:8080/login/usuarios", y al ser accedido llamaria al metodo 
    //"buscarTodosSitios" del correspondiente Service y devolveria su resultado.
    //Con la anotacion "@CrossOrigin" le estamos diciendo que acepte las peticiones que le 
    //vengan desde ahi (es la direccion donde esta publicado el frontend)
    //Como estamos usando la anotacion "@GetMapping", las peticiones que vengan al endpoint 
    //tendran que ser de tipo GET.
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/login/usuarios")
    public List<Usuario> listar() {
        return usuarioService.buscarTodosUsuarios();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/login/{id}/nombre")
    public ResponseEntity<String> obtenerNombre(@PathVariable String id) {
        String nombre = usuarioService.encontrarNombrePorId(id);
        return nombre != null ? ResponseEntity.ok(nombre)
                              : ResponseEntity.notFound().build();

  }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping ("/login/signin")   
    public ResponseEntity<?> login(@RequestBody Usuario datosLogin) {
        Usuario usuario = usuarioService.validarCredenciales(
            datosLogin.getEmail(),
            datosLogin.getContrasena()
        );

        if (usuario != null) {
            // Evitar devolver la contraseña
            Usuario respuesta = new Usuario();
            respuesta.setId(usuario.getId());
            respuesta.setNombre(usuario.getNombre());
            respuesta.setApellido(usuario.getApellido());
            respuesta.setEmail(usuario.getEmail());
            respuesta.setActivo(usuario.getActivo());
            respuesta.setFecha_creacion(usuario.getFecha_creacion());
            return ResponseEntity.ok(respuesta);
        } else {
            return ResponseEntity.status(401).body("Credenciales inválidas");
        }
    }
}


