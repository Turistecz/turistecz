package org.turistecz.turisteczbackend.service;

import com.sendgrid.*;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class EmailService {

    @Autowired
    private SendGrid sendGrid;

    public void enviarCorreo(String destinatario, String asunto, String contenido) {
        Email from = new Email("no-reply@turistecz.com");
        Email to = new Email(destinatario);
        Content content = new Content("text/plain", contenido);
        Mail mail = new Mail(from, asunto, to, content);

        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sendGrid.api(request);
            System.out.println("📧 Correo enviado a " + destinatario + ". Status: " + response.getStatusCode());
        } catch (IOException ex) {
            System.err.println("❌ Error enviando correo a " + destinatario);
            ex.printStackTrace();
        }
    }
}
