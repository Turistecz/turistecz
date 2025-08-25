package org.turistecz.turisteczbackend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.turistecz.turisteczbackend.model.Sitio;
import org.turistecz.turisteczbackend.repository.SitioRepository;

//En Spring, las clases de tipo Service se utilizan como capa intermedia entre las que 
//publican los endpoints y las que realizan las consultas a la BBDD. Aqui se podrian 
//insertar comprobaciones, conversiones de tipos de datos o cualquier otra operacion.
@Service
public class SitioService {
	
	//Esta es la clase de tipo Repository asociada que vamos a usar. Podria haber varias
	//de estas. Con la anotacion @Autowired se inyectan las dependencias necesarias para 
	//que este campo funcione, como constructores o getters/setters
	@Autowired
	SitioRepository repositorioSitio;
	
	//En este caso, este metodo no incorpora ninguna operacion intermedia, solamente llama 
	//al correspondiente metodo de la clase Repository que toca y devuelve su resultado. 
	//Lo curioso aqui es que ese metodo no aparece codificado en esa clase (es uno de los 
	//que estan ya predefinidos dentro de la clase "JPARepository"). Ademas, la anotacion 
	//@Transactional indica que esta operacion debe tratarse como si fuera un transaccion, 
	//y que en caso de que falle algo en su interior no se deberia guardar ningun cambio 
	//en la BBDD. Esto es muy comun para las operaciones de tipo creacion, modificacion o
	//borrado, ya que podrian dejar la BBDD en un estado inconsistente en caso de fallar
	@Transactional
	public Sitio insertarSitio(Sitio sitio) {
		return repositorioSitio.save(sitio);
	}
	
	//En este caso, este metodo no incorpora ninguna operacion intermedia, solamente llama 
	//al correspondiente metodo de la clase Repository que toca y devuelve su resultado. 
	//Lo curioso aqui es que ese metodo no aparece codificado en esa clase (es uno de los 
	//que estan ya predefinidos dentro de la clase "JPARepository").
	public List<Sitio> buscarTodosSitios() {
	    return repositorioSitio.findAll();
	}
	
	//En este caso, este metodo no incorpora ninguna operacion intermedia, solamente llama 
	//al correspondiente metodo de la clase Repository que toca y devuelve su resultado. 
	//El metodo al que se llama si que esta especificado en esa clase Repository.
	public List<Sitio> buscarTodosSitiosDeNombreIgual(String nombre) {
	    return repositorioSitio.findByNombreLike(nombre);
	}

	//En este caso, este metodo no incorpora ninguna operacion intermedia, solamente llama 
	//al correspondiente metodo de la clase Repository que toca y devuelve su resultado. 
	//El metodo al que se llama si que esta especificado en esa clase Repository.
	public List<Sitio> buscarTodosSitiosDeNombreParecido(String nombre) {
	    return repositorioSitio.encontrarSitiosQueSeLlamenParecido(nombre);
	}

	//En este caso, este metodo no incorpora ninguna operacion intermedia, solamente llama 
	//al correspondiente metodo de la clase Repository que toca y devuelve su resultado. 
	//El metodo al que se llama si que esta especificado en esa clase Repository.
	public Sitio buscarSitioCorrespondienteALaImagen(String id) {
	    return repositorioSitio.encontrarSitioCorrespondienteALaImagen(id);
	}
	  
	public List<Sitio> buscarSitiosRuta(String id){
		return repositorioSitio.encontrarSitiosRuta(id);
	}

}