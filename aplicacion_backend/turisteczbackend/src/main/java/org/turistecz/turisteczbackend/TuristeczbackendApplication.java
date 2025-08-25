package org.turistecz.turisteczbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

//La clase que contenga esta anotacion tiene el metodo main y 
//es la encargada de arrancar la aplicacion hecha en Spring
@SpringBootApplication
public class TuristeczbackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(TuristeczbackendApplication.class, args);
	}

}
