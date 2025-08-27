package org.turistecz.turisteczbackend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.turistecz.turisteczbackend.model.SitiosRuta;
import org.turistecz.turisteczbackend.repository.SitiosRutaRepository;



@Service
public class SitiosRutaService {

    @Autowired
    SitiosRutaRepository repositorioSitiosRuta;
    
    //En este caso, este metodo no incorpora ninguna operacion intermedia, solamente llama 
	//al correspondiente metodo de la clase Repository que toca y devuelve su resultado. 
	//Lo curioso aqui es que ese metodo no aparece codificado en esa clase (es uno de los 
	//que estan ya predefinidos dentro de la clase "JPARepository").
	// public List<Ruta> buscarTodasRutas() {
	//     return repositorioRuta.findAll();
	// }

    public SitiosRuta buscarNombrePorId(Integer id_sitio, Integer id_ruta) {
         return repositorioSitiosRuta.encontrarNombrePorIdSitioIdRuta(id_sitio, id_ruta);
    }

    public List<SitiosRuta> buscarTextoRutaPorId(Integer id_ruta) {
         return repositorioSitiosRuta.encontrarTextoPorIdSitioIdRuta(id_ruta);
    }

    // public Sitios_Ruta buscarTextoRutaPorId(String id_ruta) {
    //      return repositorioSitios_Ruta.encontrarTextoPorIdSitioIdRuta(id_ruta);
    // }

    // public Sitios_Ruta buscarTextoRutaPorId(Integer id_ruta) {
    //      return repositorioSitios_Ruta.encontrarTextoPorIdSitioIdRuta(id_ruta);
    // }

}
