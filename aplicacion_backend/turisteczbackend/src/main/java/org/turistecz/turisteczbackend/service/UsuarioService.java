package org.turistecz.turisteczbackend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.turistecz.turisteczbackend.model.Usuario;
import org.turistecz.turisteczbackend.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class UsuarioService {

    @Autowired
    UsuarioRepository repositorioUsuario;

    @Autowired
    PasswordEncoder passwordEncoder;

    
    //En este caso, este metodo no incorpora ninguna operacion intermedia, solamente llama 
	//al correspondiente metodo de la clase Repository que toca y devuelve su resultado. 
	//Lo curioso aqui es que ese metodo no aparece codificado en esa clase (es uno de los 
	//que estan ya predefinidos dentro de la clase "JPARepository").
	public List<Usuario> buscarTodosUsuarios() {
	    return repositorioUsuario.findAll();
	}
   
    public String encontrarNombrePorId(String id) {
        return repositorioUsuario.encontrarNombrePorId(id);
    }

    public Usuario validarCredenciales(String email, String contrasenaRaw) {
        Usuario usuario = repositorioUsuario.findByEmail(email);
        if (usuario != null && passwordEncoder.matches(contrasenaRaw, usuario.getContrasena())) {
            return usuario;
        }
        return null;
    }

     public Usuario registrarUsuario(Usuario usuario) {
        String hash = passwordEncoder.encode(usuario.getContrasena());
        usuario.setContrasena(hash);
        return repositorioUsuario.save(usuario);
    }

}

