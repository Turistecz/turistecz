package org.turistecz.turisteczbackend.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.turistecz.turisteczbackend.model.Filtro;
import org.turistecz.turisteczbackend.model.Filtros_user;
import org.turistecz.turisteczbackend.repository.FiltroRepository;
import org.turistecz.turisteczbackend.repository.FiltrosUserRepository;

@Service
public class FiltrosUserService {
    
    @Autowired
    private FiltrosUserRepository filtroUserRepository;

    @Autowired
    private FiltroRepository filtroRepository;

    /**
     * Comprobar si un sitio es favorito de un usuario.
     *
     * @param usuarioId id del usuario
     * @param filtroId   id del sitio
     * @return true si existe, false si no
     */
    public boolean comprobarFavorito(int usuarioId, int filtroId) {
        return filtroUserRepository.existsByUsuarioIdAndFiltroId(usuarioId, filtroId);
    }

    /**
     * Guardar un nuevo favorito.
     *
     * @param favorito entidad Favoritos con usuario y sitio seteados
     * @return Favoritos guardado
     */
    public Filtros_user addFavoritos(Filtros_user filtro) {
        // Evitar duplicados: si ya existe, devolvemos el mismo
        boolean existe = filtroUserRepository.existsByUsuarioIdAndFiltroId(
                filtro.getUsuario().getId(),
                filtro.getFiltro().getId()
        );
        if (existe) {
            return filtroUserRepository.findByUsuarioIdAndFiltroId(
                    filtro.getUsuario().getId(),
                    filtro.getFiltro().getId()
            ).orElse(filtro);
        }
        return filtroUserRepository.save(filtro);
    }

    /**
     * Eliminar un favorito.
     *
     * @param usuarioId id del usuario
     * @param filtroId   id del sitio
     */
    public void removeFiltro(int usuarioId, int filtroId) {
        Filtros_user filtro = filtroUserRepository.findByUsuarioIdAndFiltroId(usuarioId, filtroId)
            .orElseThrow(() -> new RuntimeException("Favorito no encontrado"));
        filtroUserRepository.delete(filtro);
    }

    /**
     * Obtener todos los sitios favoritos de un usuario.
     *
     * @param usuarioId id del usuario
     * @return lista de sitios favoritos
     */
    public Filtro getFavoritosbyUsuario(int usuarioId) {
        return filtroUserRepository.findFiltroByUsuarioId(usuarioId);
    }

    public List<Filtros_user> buscarTodosFiltros() {
        return filtroUserRepository.findAll();
    }

}
