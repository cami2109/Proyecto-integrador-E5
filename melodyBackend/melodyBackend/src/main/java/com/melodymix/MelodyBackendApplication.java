package com.melodymix;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.melodymix.controlador", "com.melodymix.servicio", "com.melodymix.entidad", "com.melodymix.repositorio"})
public class MelodyBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(MelodyBackendApplication.class, args);
	}
}
