package com.melodymix.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Base64;

public class JwtAutenticadorFiltro implements Filter {

    private final UserDetailsService userDetailsService;
    private final String secretKey;

    public JwtAutenticadorFiltro(UserDetailsService userDetailsService, String secretKey) {
        this.userDetailsService = userDetailsService;
        byte[] decodedKey = Base64.getDecoder().decode(secretKey);
        this.secretKey = new String(decodedKey);
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // No es necesario implementar
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        // Obtener el token JWT de los encabezados
        String token = httpRequest.getHeader("Authorization");

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7); // Eliminar "Bearer " del token

            try {
                // Extraer el nombre de usuario del token
                Claims claims = Jwts.parser()
                        .setSigningKey(secretKey)
                        .parseClaimsJws(token)
                        .getBody();

                String username = claims.getSubject();

                if (username != null) {
                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                    if (userDetails != null) {
                        // Autenticación exitosa, establecer el contexto de seguridad
                        SecurityContextHolder.getContext().setAuthentication(
                                new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities())
                        );
                    }
                }
            } catch (Exception e) {
                // Manejar excepciones relacionadas con el token
                SecurityContextHolder.clearContext();
            }
        }

        chain.doFilter(request, response); // Continuar con el siguiente filtro
    }

    @Override
    public void destroy() {
        // No es necesario implementar
    }
}