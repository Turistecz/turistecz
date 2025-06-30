package org.turistecz.turisteczbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.turistecz.turisteczbackend.model.Sitio;

public interface SitioRepository extends JpaRepository<Sitio, Integer> {
	
	List<Sitio> findByNombreLike(String nombre);
	
}