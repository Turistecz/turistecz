package org.turistecz.turisteczbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.turistecz.turisteczbackend.dto.FavoriteDto;
import org.turistecz.turisteczbackend.model.Favoritos;
import org.turistecz.turisteczbackend.model.Sitio;
import org.turistecz.turisteczbackend.model.Usuario;
import org.turistecz.turisteczbackend.repository.SitioRepository;
import org.turistecz.turisteczbackend.repository.UsuarioRepository;
import org.turistecz.turisteczbackend.service.FavoritosService;

@RestController
@RequestMapping("/api/favoritos")
@CrossOrigin(origins = "http://localhost:4200")
public class FavoritosController {

    @Autowired
    private FavoritosService favoritosService;

    @Autowired
    private UsuarioRepository usuarioRepo;

    @Autowired
    private SitioRepository sitioRepo;

  
    @GetMapping("/comprobar/{usuarioId}/{sitioId}")
    public ResponseEntity<Boolean> comprobarFavorito(
            @PathVariable int usuarioId,
            @PathVariable int sitioId
    ) {
        boolean esFavorito = favoritosService.comprobarFavorito(usuarioId, sitioId);
        return ResponseEntity.ok(esFavorito);
    }

    
    @PostMapping
    public ResponseEntity<Favoritos> addFavorito(@RequestBody FavoriteDto dto) {
        Usuario usuario = usuarioRepo.findById(dto.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Sitio sitio = sitioRepo.findById(dto.getSitioId())
                .orElseThrow(() -> new RuntimeException("Sitio no encontrado"));

        Favoritos favorito = new Favoritos();
        favorito.setUsuario(usuario);
        favorito.setSitio(sitio);

        Favoritos saved = favoritosService.addFavoritos(favorito);
        return ResponseEntity.ok(saved);
    }

    
    @DeleteMapping("/{usuarioId}/{sitioId}")
    public ResponseEntity<Void> removeFavorito(
            @PathVariable int usuarioId,
            @PathVariable int sitioId
    ) {
        favoritosService.removeFavorito(usuarioId, sitioId);
        return ResponseEntity.noContent().build();
    }

    
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Sitio>> getMisFavoritos(@PathVariable int usuarioId) {
        List<Sitio> favoritos = favoritosService.getFavoritosbyUsuario(usuarioId);
        return ResponseEntity.ok(favoritos);
    }
}
