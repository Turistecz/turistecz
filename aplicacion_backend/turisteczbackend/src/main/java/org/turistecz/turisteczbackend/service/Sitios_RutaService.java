package org.turistecz.turisteczbackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.turistecz.turisteczbackend.repository.Sitios_RutaRepository;



@Service
public class Sitios_RutaService {

    @Autowired
    Sitios_RutaRepository repositorioSitios_Ruta;
    
    //En este caso, este metodo no incorpora ninguna operacion intermedia, solamente llama 
	//al correspondiente metodo de la clase Repository que toca y devuelve su resultado. 
	//Lo curioso aqui es que ese metodo no aparece codificado en esa clase (es uno de los 
	//que estan ya predefinidos dentro de la clase "JPARepository").
	// public List<Ruta> buscarTodasRutas() {
	//     return repositorioRuta.findAll();
	// }

    // public Sitios_Ruta buscarNombrePorId(Integer id_sitio, Integer id_ruta) {
    //     return repositorioSitios_Ruta.encontrarNombrePorIdSitioIdRuta(id_sitio, id_ruta);
    // }

}
