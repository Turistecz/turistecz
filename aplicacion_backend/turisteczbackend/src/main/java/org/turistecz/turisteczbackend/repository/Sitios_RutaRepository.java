package org.turistecz.turisteczbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.turistecz.turisteczbackend.model.Sitios_Ruta;

import jakarta.persistence.EmbeddedId;

//Las clases de tipo Repository son las encargadas de crear las consultas a la BBDD
//y traer el resultado de su ejecucion. Heredan de la clase JpaRepository, lo cual les
//permite acceder a todos los metodos que estan implementados en ella (como el save() o 
//el deleteById(), amen de otros metodos basicos para un CRUD). Aqui se pueden especificar 
//metodos que, si se sigue la sintaxis de JPA, se pueden transformar automaticamente en 
//sentencias SQL sin necesidad de poner nada en ese lenguaje. Por otro lado, tambien se 
//pueden escribir metodos que tengan sentencias SQL asociadas
public interface Sitios_RutaRepository extends JpaRepository<Sitios_Ruta, EmbeddedId> {
	
	//Un metodo como este sigue la sintaxis de JPA, le estamos diciendo solo con la 
	//firma del metodo que tiene que devolver la lista de sitios que cuyo nombre se
	//corresponde con el que le estamos pasando como parametro

	// → Esta Query tendria que mostrar el sitio especifico segun la ruta, al buscar ambos ID. 
	// Por el momento lo hemos descartado, porque lo vemos necesario.
	// Si quereis usarlo, todo vuestro.

	// @Query(value = "SELECT * FROM Sitios_Ruta sr WHERE sr.id_sitio = :id_sitio and sr.id_ruta = :id_ruta", nativeQuery = true)
    // Sitios_Ruta encontrarNombrePorIdSitioIdRuta(@Param("id_sitio") Integer id_sitio, @Param("id_ruta") Integer id_ruta);

}