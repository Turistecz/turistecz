package org.turistecz.turisteczbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.turistecz.turisteczbackend.model.Imagen_sitio;

//Las clases de tipo Repository son las encargadas de crear las consultas a la BBDD
//y traer el resultado de su ejecucion. Heredan de la clase JpaRepository, lo cual les
//permite acceder a todos los metodos que estan implementados en ella (como el save() o 
//el deleteById(), amen de otros metodos basicos para un CRUD). Aqui se pueden especificar 
//metodos que, si se sigue la sintaxis de JPA, se pueden transformar automaticamente en 
//sentencias SQL sin necesidad de poner nada en ese lenguaje. Por otro lado, tambien se 
//pueden escribir metodos que tengan sentencias SQL asociadas
public interface Imagen_sitioRepository extends JpaRepository<Imagen_sitio, Integer> {
	
	
	
}