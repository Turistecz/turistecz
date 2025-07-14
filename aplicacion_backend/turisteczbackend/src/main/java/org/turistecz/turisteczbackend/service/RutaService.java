package org.turistecz.turisteczbackend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.turistecz.turisteczbackend.model.Ruta;
import org.turistecz.turisteczbackend.repository.RutaRepository;



@Service
public class RutaService {

    @Autowired
    RutaRepository repositorioRuta;
    
    //En este caso, este metodo no incorpora ninguna operacion intermedia, solamente llama 
	//al correspondiente metodo de la clase Repository que toca y devuelve su resultado. 
	//Lo curioso aqui es que ese metodo no aparece codificado en esa clase (es uno de los 
	//que estan ya predefinidos dentro de la clase "JPARepository").
	public List<Ruta> buscarTodasRutas() {
	    return repositorioRuta.findAll();
	}

    public Ruta buscarNombrePorId(String id) {
        return repositorioRuta.encontrarNombrePorId(id);
    }

    public List<Ruta> buscarRutasParecidas(String nombre) {
	    return repositorioRuta.encontrarRutasParecidas(nombre);
	}


}
