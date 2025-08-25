package org.turistecz.turisteczbackend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.turistecz.turisteczbackend.model.Imagen_sitio;
import org.turistecz.turisteczbackend.repository.Imagen_sitioRepository;

//En Spring, las clases de tipo Service se utilizan como capa intermedia entre las que 
//publican los endpoints y las que realizan las consultas a la BBDD. Aqui se podrian 
//insertar comprobaciones, conversiones de tipos de datos o cualquier otra operacion.
@Service
public class Imagen_sitioService {
	
	//Esta es la clase de tipo Repository asociada que vamos a usar. Podria haber varias
	//de estas. Con la anotacion @Autowired se inyectan las dependencias necesarias para 
	//que este campo funcione, como constructores o getters/setters
	@Autowired
	Imagen_sitioRepository repositorioImagen_sitio;
	
	//En este caso, este metodo no incorpora ninguna operacion intermedia, solamente llama 
	//al correspondiente metodo de la clase Repository que toca y devuelve su resultado. 
	//Lo curioso aqui es que ese metodo no aparece codificado en esa clase (es uno de los 
	//que estan ya predefinidos dentro de la clase "JPARepository")
	public List<Imagen_sitio> buscarTodosImagen_sitios() {
	    return repositorioImagen_sitio.findAll();
	}

}
