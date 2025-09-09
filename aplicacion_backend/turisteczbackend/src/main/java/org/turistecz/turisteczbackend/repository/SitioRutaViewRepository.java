package org.turistecz.turisteczbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.turistecz.turisteczbackend.model.SitioRutaView;


@Repository
public interface SitioRutaViewRepository extends JpaRepository<SitioRutaView, Integer> {

    @Query(value = "SELECT * FROM v_sitios_ruta vs WHERE vs.id_ruta = :id", nativeQuery = true)
    List<SitioRutaView> encontrarSitiosPorIdRuta(@Param("id") Integer id);

}
