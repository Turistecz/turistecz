package org.turistecz.turisteczbackend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.turistecz.turisteczbackend.dto.FavoriteDto;
import org.turistecz.turisteczbackend.model.Favoritos;
import org.turistecz.turisteczbackend.model.Sitio;
import org.turistecz.turisteczbackend.model.Usuario;
import org.turistecz.turisteczbackend.repository.SitioRepository;
import org.turistecz.turisteczbackend.repository.UsuarioRepository;
import org.turistecz.turisteczbackend.service.FavoritosService;



 @RestController
 @RequestMapping("/favorite")

public class FavoritosController {
    @Autowired
    private FavoritosService favoritosService;
    @Autowired
    private UsuarioRepository usuarioRepo;
    @Autowired
    private SitioRepository sitioRepo;

    @CrossOrigin(origins ="http://localhost:4200")
    @GetMapping("/comprobar-favorito/")
    public boolean comprobarFavorito(@RequestParam int usuarioid, @RequestParam int sitioid) {
        return favoritosService.comprobarFavorito(usuarioid, sitioid);
   }

   @CrossOrigin(origins ="http://localhost:4200")
   @PostMapping("/add-favorite")
   public Favoritos addFavorito(@RequestBody FavoriteDto dto) {
     Usuario usuario = usuarioRepo.findById(dto.getUsuario_id())
                          .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Sitio sitio = sitioRepo.findById(dto.getSitio_id())
                        .orElseThrow(() -> new RuntimeException("Sitio no encontrado"));

        Favoritos favorito = new Favoritos();
        favorito.setUsuario(usuario);
        favorito.setSitio(sitio);

        return favoritosService.addFavoritos(favorito);
}
   // public Favoritos addFavorito(@RequestBody FavoriteDto favorito) {
       // return favoritosService.addFavoritos(favorito);
       // return null;
    //}

    @CrossOrigin(origins ="http://localhost:4200")
@DeleteMapping("/{usuario_id}/{sitio_id}")
public void removeFavorito(@PathVariable int usuario_id, @PathVariable int sitio_id) {
    favoritosService.removeFavorito(usuario_id, sitio_id);
}




 }
