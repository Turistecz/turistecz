package org.turistecz.turisteczbackend.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import javax.xml.crypto.dsig.keyinfo.RetrievalMethod;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.turistecz.turisteczbackend.model.Usuario;
import org.turistecz.turisteczbackend.model.VerificationToken;
import org.turistecz.turisteczbackend.repository.UsuarioRepository;
import org.turistecz.turisteczbackend.repository.VerificationTokenRepository;

@Service
public class VerificationTokenService {

    @Autowired
    private VerificationTokenRepository tokenRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;


    public VerificationToken crearTokenParaUsuario(Usuario usuario) {
        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setToken(token);
        verificationToken.setUsuario(usuario);
        verificationToken.setFecha_expiracion(LocalDateTime.now().plusHours(48));
        verificationToken.setTipo("ACTIVATION");

        return tokenRepository.save(verificationToken);
    }


    public boolean verificarToken(String token) {
        Optional<VerificationToken> optional = tokenRepository.findByToken(token);
        if (optional.isEmpty()) {
            return false;
        }

        VerificationToken vt = optional.get();
        if (vt.getFecha_expiracion().isBefore(LocalDateTime.now())) {
            return false;
        }

        Usuario usuario = vt.getUsuario();
        usuario.setActivo(true);
        usuarioRepository.save(usuario);
        tokenRepository.delete(vt);

        return true;
    }

    public VerificationToken generarTokenRecuperacion(Usuario usuario){
        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setToken(token);
        verificationToken.setUsuario(usuario);
        verificationToken.setFecha_expiracion(LocalDateTime.now().plusHours(2));
        verificationToken.setTipo("RECOVERY");
        
        return tokenRepository.save(verificationToken);
    }

    public Usuario getUsuarioDesdeTokenRecuperacion(String token){
        Optional<VerificationToken> optional = tokenRepository.findByToken(token);
        if(optional.isEmpty()) return null;

        VerificationToken vt = optional.get();
        if(vt.getFecha_expiracion().isBefore(LocalDateTime.now())) return null;

        return vt.getUsuario();

    }
}
