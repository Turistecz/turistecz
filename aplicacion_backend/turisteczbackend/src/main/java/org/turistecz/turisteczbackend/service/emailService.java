package org.turistecz.turisteczbackend.service;

import org.springframework.stereotype.Service;

@Service
public class emailService {

    public void sendEmail(String to, String subject, String body) {
        System.out.println("Simulando envío de correo a " + to);
        System.out.println("Asunto: " + subject);
        System.out.println("Cuerpo: " + body);
    }
}

