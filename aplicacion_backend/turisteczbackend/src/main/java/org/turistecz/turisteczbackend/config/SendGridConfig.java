package org.turistecz.turisteczbackend.config;

import com.sendgrid.SendGrid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SendGridConfig {

    @Value("${sendgrid.api-key:}")
    private String sendGridApiKey;

    @Bean
    public SendGrid sendGrid() {
        return new SendGrid(sendGridApiKey == null ? "" : sendGridApiKey);
    }

    //Este método se comenta ya que ahora mismo ha caducado la API de SendGrid y por lo tanto no va a funcionar. De esta manera,
    //se deja el código preparado para su uso pero no se utiliza para evitar que dé errores.
    // @Bean
    // public SendGrid sendGrid() {
    //     if (sendGridApiKey == null || sendGridApiKey.isBlank()) {
    //         throw new IllegalStateException("Falta la API key de SendGrid. Define variable de entorno SENDGRID_API_KEY");
    //     }
    //     return new SendGrid(sendGridApiKey);
    // }
}
