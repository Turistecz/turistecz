package org.turistecz.turisteczbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.turistecz.turisteczbackend.model.SitiosRutaUsuarioView;

@Repository
public interface SitiosRutaUsuarioViewRepository extends JpaRepository<SitiosRutaUsuarioView, Integer> {
  @Query(value = "SELECT * FROM v_sitios_ruta_usuario vsru", nativeQuery = true)
  List<SitiosRutaUsuarioView> buscarPorIdRuta();
}
