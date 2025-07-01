package org.turistecz.turisteczbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.turistecz.turisteczbackend.model.Sitio;

//Las clases de tipo Repository son las encargadas de crear las consultas a la BBDD
//y traer el resultado de su ejecucion. Heredan de la clase JpaRepository, lo cual les
//permite acceder a todos los metodos que estan implementados en ella (como el save() o 
//el deleteById(), amen de otros metodos basicos para un CRUD). Aqui se pueden especificar 
//metodos que, si se sigue la sintaxis de JPA, se pueden transformar automaticamente en 
//sentencias SQL sin necesidad de poner nada en ese lenguaje. Por otro lado, tambien se 
//pueden escribir metodos que tengan sentencias SQL asociadas
public interface SitioRepository extends JpaRepository<Sitio, Integer> {
	
	//Un metodo como este sigue la sintaxis de JPA, le estamos diciendo solo con la 
	//firma del metodo que tiene que devolver la lista de sitios que cuyo nombre se
	//corresponde con el que le estamos pasando como parametro
	List<Sitio> findByNombreLike(String nombre);

	//Este seria un metodo "personalizado" que cremos sin seguir la sintaxis de JPA.
	//No es necesario usarla en este caso, porque le estamos asociando directamente 
	//la consulta SQL que queremos que se ejecute cuando le llamemos. Este metodo
	//devolvera una lista con todos los sitios cuyo nombre se parezca al que le 
	//estamos pasando como parametro
	@Query("SELECT s FROM Sitio s WHERE s.nombre LIKE %:nombre%")
    List<Sitio> encontrarSitiosQueSeLlamenParecido(@Param("nombre") String nombre);
	
}