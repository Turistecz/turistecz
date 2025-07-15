package org.turistecz.turisteczbackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class emailService {

    @Autowired
    private JavaMailSender mailSender;

    public void enviarEmail(String email, String asunto, String cuerpo) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject(asunto);
        message.setText(cuerpo);
        message.setFrom("b0c4d6d4cdeb9f"); // debe coincidir con el spring.mail.username

        mailSender.send(message);
    }
}
