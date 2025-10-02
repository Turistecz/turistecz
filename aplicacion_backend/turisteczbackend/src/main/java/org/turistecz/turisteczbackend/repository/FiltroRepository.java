package org.turistecz.turisteczbackend.repository;

import java.util.Optional;

//import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.turistecz.turisteczbackend.model.Filtro;

public interface FiltroRepository extends JpaRepository<Filtro, Integer> {

    boolean existsById(int id);

    //Optional<Filtro> findById(int id);

    Filtro findById(int id);

}