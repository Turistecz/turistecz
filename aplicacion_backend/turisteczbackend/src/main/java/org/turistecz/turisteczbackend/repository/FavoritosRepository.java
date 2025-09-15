package org.turistecz.turisteczbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.turistecz.turisteczbackend.model.Favoritos;
import org.turistecz.turisteczbackend.model.Sitio;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoritosRepository extends JpaRepository<Favoritos, Integer> {

    boolean existsByUsuarioIdAndSitioId(int usuarioId, int sitioId);

    Optional<Favoritos> findByUsuarioIdAndSitioId(int usuarioId, int sitioId);

    void deleteByUsuarioIdAndSitioId(int usuarioId, int sitioId);

    @Query("SELECT f.sitio FROM Favoritos f WHERE f.usuario.id = :usuarioId")
    List<Sitio> findFavoritosByUsuarioId(int usuarioId);
}
