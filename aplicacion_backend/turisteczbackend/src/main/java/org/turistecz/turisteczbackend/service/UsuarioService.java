package org.turistecz.turisteczbackend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.turistecz.turisteczbackend.model.Usuario;
import org.turistecz.turisteczbackend.repository.UsuarioRepository;


@Service
public class UsuarioService {
    @Autowired
    UsuarioRepository repositorioUsuario;

    public UsuarioService(UsuarioRepository repositorioUsuario) {
        this.repositorioUsuario = repositorioUsuario;
    }
    
    //En este caso, este metodo no incorpora ninguna operacion intermedia, solamente llama 
	//al correspondiente metodo de la clase Repository que toca y devuelve su resultado. 
	//Lo curioso aqui es que ese metodo no aparece codificado en esa clase (es uno de los 
	//que estan ya predefinidos dentro de la clase "JPARepository").
	public List<Usuario> buscarTodosUsuarios() {
	    return repositorioUsuario.findAll();
	}
   
    private UsuarioRepository usuarioRepository;

    public String encontrarNombrePorId(int id) {
        return usuarioRepository.encontrarNombrePorId(id);
    }


}
