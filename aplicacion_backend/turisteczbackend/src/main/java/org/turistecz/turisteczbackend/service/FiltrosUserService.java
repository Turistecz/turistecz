package org.turistecz.turisteczbackend.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.turistecz.turisteczbackend.model.Filtro;
import org.turistecz.turisteczbackend.model.Filtros_user;
import org.turistecz.turisteczbackend.repository.FiltrosUserRepository;

@Service
public class FiltrosUserService {
    
    @Autowired
    private FiltrosUserRepository filtroUserRepository;

    public boolean comprobarFavorito(int usuarioId, int filtroId) {
        return filtroUserRepository.existsByUsuarioIdAndFiltroId(usuarioId, filtroId);
    }

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

    public void removeFiltro(int usuarioId, int filtroId) {
        Filtros_user filtro = filtroUserRepository.findByUsuarioIdAndFiltroId(usuarioId, filtroId)
            .orElseThrow(() -> new RuntimeException("Favorito no encontrado"));
        filtroUserRepository.delete(filtro);
    }

    public Filtro getFavoritosbyUsuario(int usuarioId) {
        return filtroUserRepository.findFiltroByUsuarioId(usuarioId);
    }

    public List<Filtros_user> buscarTodosFiltros() {
        return filtroUserRepository.findAll();
    }

}
