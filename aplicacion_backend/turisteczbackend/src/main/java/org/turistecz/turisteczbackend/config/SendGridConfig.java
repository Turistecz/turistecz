package org.turistecz.turisteczbackend.config;

import com.sendgrid.SendGrid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SendGridConfig {

    @Value("${SENDGRID_API_KEY:}")
    private String sendGridApiKey;

    @Bean
    public SendGrid sendGrid() {
        if (sendGridApiKey == null || sendGridApiKey.isBlank()) {
            throw new IllegalStateException("Falta la API key de SendGrid. Define variable de entorno SENDGRID_API_KEY");
        }
        return new SendGrid(sendGridApiKey);
    }
}
