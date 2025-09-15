package org.turistecz.turisteczbackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.turistecz.turisteczbackend.model.Favoritos;
import org.turistecz.turisteczbackend.model.Sitio;
import org.turistecz.turisteczbackend.repository.FavoritosRepository;
import org.turistecz.turisteczbackend.repository.SitioRepository;

import java.util.List;

@Service
public class FavoritosService {

    @Autowired
    private FavoritosRepository favoritosRepository;

    @Autowired
    private SitioRepository sitioRepository;

    /**
     * Comprobar si un sitio es favorito de un usuario.
     *
     * @param usuarioId id del usuario
     * @param sitioId   id del sitio
     * @return true si existe, false si no
     */
    public boolean comprobarFavorito(int usuarioId, int sitioId) {
        return favoritosRepository.existsByUsuarioIdAndSitioId(usuarioId, sitioId);
    }

    /**
     * Guardar un nuevo favorito.
     *
     * @param favorito entidad Favoritos con usuario y sitio seteados
     * @return Favoritos guardado
     */
    public Favoritos addFavoritos(Favoritos favorito) {
        // Evitar duplicados: si ya existe, devolvemos el mismo
        boolean existe = favoritosRepository.existsByUsuarioIdAndSitioId(
                favorito.getUsuario().getId(),
                favorito.getSitio().getId()
        );
        if (existe) {
            return favoritosRepository.findByUsuarioIdAndSitioId(
                    favorito.getUsuario().getId(),
                    favorito.getSitio().getId()
            ).orElse(favorito);
        }
        return favoritosRepository.save(favorito);
    }

    /**
     * Eliminar un favorito.
     *
     * @param usuarioId id del usuario
     * @param sitioId   id del sitio
     */
    public void removeFavorito(int usuarioId, int sitioId) {
        Favoritos favorito = favoritosRepository.findByUsuarioIdAndSitioId(usuarioId, sitioId)
            .orElseThrow(() -> new RuntimeException("Favorito no encontrado"));
        favoritosRepository.delete(favorito);
    }


    /**
     * Obtener todos los sitios favoritos de un usuario.
     *
     * @param usuarioId id del usuario
     * @return lista de sitios favoritos
     */
    public List<Sitio> getFavoritosbyUsuario(int usuarioId) {
        return sitioRepository.findFavoritosByUsuarioId(usuarioId);
    }
}
