package com.melodymix.servicio;

import com.melodymix.entidad.Usuario;
import org.springframework.security.core.userdetails.UserDetails;

public interface IAuthServicio {
    String authenticate(String email, String password);
    String generateToken(UserDetails userDetails);
    boolean validateToken(String token, UserDetails userDetails);
    UserDetails loadUserByEmail(String email);
}
