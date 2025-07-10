package org.turistecz.turisteczbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.turistecz.turisteczbackend.model.Usuario;
import org.turistecz.turisteczbackend.service.UsuarioService;
import java.util.List;


@RestController
@RequestMapping("/login")
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
    @GetMapping("/usuarios")
    public List<Usuario> listar() {
        return usuarioService.buscarTodosUsuarios();
    }

      @GetMapping("/{id}/nombre")
    public ResponseEntity<String> obtenerNombre(@PathVariable String id) {
        String nombre = usuarioService.encontrarNombrePorId(id);
        return nombre != null ? ResponseEntity.ok(nombre)
                              : ResponseEntity.notFound().build();

}

}
