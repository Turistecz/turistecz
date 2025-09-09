package org.turistecz.turisteczbackend.config;

import com.sendgrid.SendGrid;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;



@Configuration
public class SendGridConfig {

    @Bean
    public SendGrid sendGrid() {
        return new SendGrid("YOUR_SENDGRID_API_KEY");
    }


}