package org.turistecz.turisteczbackend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.turistecz.turisteczbackend.model.RutaUsuario;
import org.turistecz.turisteczbackend.repository.RutaUsuarioRepository;

@Service
public class RutaUsuarioService {
    
    @Autowired
    RutaUsuarioRepository repositorioRutaUsuario;

    public RutaUsuario crearRutaUsuario(Integer id, String titulo, String descripcion) {
        RutaUsuario ruta = new RutaUsuario();
        ruta.setId_usuario(id);
        ruta.setTitulo_ruta(titulo);
        ruta.setDescripcion_ruta(descripcion);
        return repositorioRutaUsuario.save(ruta);
    }

    public List<RutaUsuario> mostrarRutasUsuario(Integer id_usuario) {
	    return repositorioRutaUsuario.encontrarRutasUsuario(id_usuario);
	}

    // public RutaUsuario mostrarUltimaRutaUsuario(){
    //     return repositorioRutaUsuario.buscarUltimaRutaUsuario();
    // }

}
