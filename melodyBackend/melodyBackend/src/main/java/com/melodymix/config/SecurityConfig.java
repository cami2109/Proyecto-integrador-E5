package com.melodymix.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final UserDetailsService userDetailsService;

    @Value("${jwt.secret.key}")
    private String secretKey;

    public SecurityConfig(@Qualifier("authServicio") UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        JwtAutenticadorFiltro jwtFilter = new JwtAutenticadorFiltro(userDetailsService, secretKey);

        http
                .cors(cors -> cors.disable()) // Desactiva la configuración de CORS si no se necesita
                .authorizeHttpRequests(authorizeRequests ->
                        authorizeRequests
                                .requestMatchers("/usuario/registro", "/usuario/login", "/instrumento/registrar", "/instrumento/listar","/instrumento/actualizar", "/instrumento/**").permitAll() // Permitir acceso sin autenticación
                                .anyRequest().authenticated() // Requiere autenticación para cualquier otra ruta
                )
                .httpBasic(withDefaults()) // Configuración de HttpBasic
                .csrf(csrf -> csrf.disable()) // Desactiva CSRF para pruebas con Postman
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class); // Añade el filtro

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
