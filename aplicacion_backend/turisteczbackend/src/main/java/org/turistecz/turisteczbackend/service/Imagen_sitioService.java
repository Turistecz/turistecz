package org.turistecz.turisteczbackend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.turistecz.turisteczbackend.model.Imagen_sitio;
import org.turistecz.turisteczbackend.repository.Imagen_sitioRepository;

@Service
public class Imagen_sitioService {
	
	@Autowired
	Imagen_sitioRepository repositorioImagen_sitio;
	
	public List<Imagen_sitio> buscarTodosImagen_sitios() {
	    return repositorioImagen_sitio.findAll();
	}

}
