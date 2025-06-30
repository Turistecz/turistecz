package org.turistecz.turisteczbackend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.turistecz.turisteczbackend.model.Sitio;
import org.turistecz.turisteczbackend.repository.SitioRepository;

@Service
public class SitioService {
	
	@Autowired
	SitioRepository repositorioSitio;
	
	@Transactional
	public Sitio insertarSitio(Sitio sitio) {
		return repositorioSitio.save(sitio);
	}
	
	public List<Sitio> buscarTodosSitios() {
	    return repositorioSitio.findAll();
	}
	
	public List<Sitio> buscarTodosSitiosDeNombreParecido(String nombre) {
	    return repositorioSitio.findByNombreLike(nombre);
	}
	  
}