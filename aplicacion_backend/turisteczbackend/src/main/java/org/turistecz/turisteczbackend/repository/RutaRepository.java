package org.turistecz.turisteczbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.turistecz.turisteczbackend.model.Ruta;



public interface RutaRepository extends JpaRepository<Ruta, Integer> {

    @Query("SELECT ru FROM Ruta ru WHERE ru.id = :id")
    Ruta encontrarNombrePorId(@Param("id") String id);

    @Query("SELECT ru FROM Ruta ru WHERE ru.nombre LIKE %:nombre%")
    List<Ruta> encontrarRutasParecidas(@Param("nombre") String nombre);

}