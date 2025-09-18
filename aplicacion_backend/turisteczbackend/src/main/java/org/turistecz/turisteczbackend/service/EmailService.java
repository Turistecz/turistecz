package org.turistecz.turisteczbackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void enviarCorreo(String destinatario, String asunto, String contenido) {
        try {
            SimpleMailMessage mensaje = new SimpleMailMessage();
            mensaje.setFrom("pruebasturistecz@gmail.com"); // solo para mostrar en MailHog
            mensaje.setTo(destinatario);
            mensaje.setSubject(asunto);
            mensaje.setText(contenido);

            mailSender.send(mensaje);
            System.out.println("📧 Correo enviado a " + destinatario + " correctamente (MailHog).");
        } catch (Exception e) {
            System.err.println("❌ Error enviando correo a " + destinatario);
            e.printStackTrace();
        }
    }
}
