package com.melodymix;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
@ComponentScan(basePackages = {"com.melodymix.controlador", "com.melodymix.servicio", "com.melodymix.entidad", "com.melodymix.repositorio", "com.melodymix.config",})
public class MelodyBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(MelodyBackendApplication.class, args);
	}

}
