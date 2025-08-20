package org.turistecz.turisteczbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.turistecz.turisteczbackend.model.Favoritos;

import jakarta.transaction.Transactional;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface FavoritosRepository extends JpaRepository <Favoritos, Integer>{
     List<Favoritos> findByUsuario_Id(int usuarioId);
     @Modifying
    @Transactional
    @Query("DELETE FROM Favoritos f WHERE f.usuario.id = :usuarioId AND f.sitio.id = :sitioId")
    void deleteByUsuarioAndSitio(@Param("usuarioId") int usuarioId, @Param("sitioId") int sitioId);

    @Query(value = "SELECT * FROM favoritos f WHERE f.usuario_id = :idusuario and f.sitios_id = :idsitio", nativeQuery = true)
    Favoritos comprobarFavorito(@Param("idusuario") int idusuario,@Param ("idsitio") int idsitio);
}
