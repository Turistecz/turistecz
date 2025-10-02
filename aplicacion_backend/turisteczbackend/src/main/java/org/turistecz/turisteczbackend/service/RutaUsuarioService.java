package org.turistecz.turisteczbackend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.turistecz.turisteczbackend.model.RutaUsuario;
import org.turistecz.turisteczbackend.model.Usuario;
import org.turistecz.turisteczbackend.repository.RutaUsuarioRepository;
import org.turistecz.turisteczbackend.repository.UsuarioRepository;

@Service
public class RutaUsuarioService {
    
    @Autowired
    RutaUsuarioRepository repositorioRutaUsuario;

    @Autowired
    UsuarioRepository usuarioRepository;

    public RutaUsuario crearRutaUsuario(Integer id_usuario, String titulo, String descripcion) {
        Usuario usuario = usuarioRepository.findById(id_usuario)
            .orElseThrow(() -> new RuntimeException("RutaUsuario no encontrada"));

        RutaUsuario ruta = new RutaUsuario();
        ruta.setUsuario(usuario);
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
