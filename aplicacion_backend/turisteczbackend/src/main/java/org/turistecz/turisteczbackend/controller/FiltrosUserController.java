package org.turistecz.turisteczbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.turistecz.turisteczbackend.dto.FiltrosUserDto;
import org.turistecz.turisteczbackend.model.Filtro;
import org.turistecz.turisteczbackend.model.Filtros_user;
import org.turistecz.turisteczbackend.model.Usuario;
import org.turistecz.turisteczbackend.repository.FiltroRepository;
import org.turistecz.turisteczbackend.repository.UsuarioRepository;
import org.turistecz.turisteczbackend.service.FiltrosUserService;

@RestController
@RequestMapping("/api/filtrosUser")
public class FiltrosUserController {
    
    @Autowired
    private FiltrosUserService filtrosUserService;

    @Autowired
    private UsuarioRepository usuarioRepo;

    @Autowired
    private FiltroRepository filtroRepo;

    @GetMapping("/comprobar/{usuarioId}/{filtroId}")
    public ResponseEntity<Boolean> comprobarFavorito(
            @PathVariable int usuarioId,
            @PathVariable int filtroId
    ) {
        boolean esFiltro = filtrosUserService.comprobarFavorito(usuarioId, filtroId);
        return ResponseEntity.ok(esFiltro);
    }

    @PostMapping
    public ResponseEntity<Filtros_user> addFilterUser(@RequestBody FiltrosUserDto dto) {
        Usuario usuario = usuarioRepo.findById(dto.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Filtro filtro = filtroRepo.findById(dto.getFiltroId())
                .orElseThrow(() -> new RuntimeException("Sitio no encontrado"));

        Filtros_user filtroUser = new Filtros_user();
        filtroUser.setUsuario(usuario);
        filtroUser.setFiltro(filtro);

        Filtros_user saved = filtrosUserService.addFavoritos(filtroUser);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{usuarioId}/{filtroId}")
    public ResponseEntity<Void> removeFiltro(
            @PathVariable int usuarioId,
            @PathVariable int filtroId
    ) {
        filtrosUserService.removeFiltro(usuarioId, filtroId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<Filtro> getMisFavoritos(@PathVariable int usuarioId) {
        Filtro favorito = filtrosUserService.getFavoritosbyUsuario(usuarioId);
        return ResponseEntity.ok(favorito);
    }

    @GetMapping("/filtroUser")
    public List<Filtros_user> listFiltros() {
        return filtrosUserService.buscarTodosFiltros();
    }
}
