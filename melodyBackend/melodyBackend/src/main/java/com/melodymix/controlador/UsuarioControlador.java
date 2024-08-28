package com.melodymix.controlador;

import com.melodymix.entidad.Usuario;
import com.melodymix.servicio.UsuarioServicioImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
// mapeo la url para que todos los postmapping que se hagan en este controlador,
// tengan que tener "/usuario" antes, osea /usuario/registro o /usuario/login , etc
@RequestMapping("/usuario")

public class UsuarioControlador {
    // inyectamos la implementacion UsuarioServiceImpl
    private UsuarioServicioImpl usuarioServiceImpl;

    // contrasena admin
    @Value("${admin.contrasena}")
    private String adminContrasena;

    @Autowired
    public UsuarioControlador(UsuarioServicioImpl usuarioServiceImpl) {
        this.usuarioServiceImpl = usuarioServiceImpl;
    }

    @PostMapping("/registro")
    public ResponseEntity<Usuario> registrar(@RequestBody Usuario usuario) {
        Usuario nuevoUsuario = usuarioServiceImpl.registrar(usuario);
        return ResponseEntity.ok(nuevoUsuario);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Usuario usuario) {
        Usuario usuarioRegistrado = usuarioServiceImpl.buscarPorEmail(usuario.getEmail());
        if (usuarioRegistrado != null && usuarioServiceImpl.getPasswordEncoder().matches(usuario.getContrasena(), usuarioRegistrado.getContrasena())) {
            boolean isAdmin = false;

            // Depuración: Imprime los valores
            System.out.println("adminContrasena: " + adminContrasena);
            System.out.println("contrasenaAdmin del usuario: " + usuario.getContrasenaAdmin());

            // Verifica la contraseña admin si se ha proporcionado
            if (usuario.getContrasenaAdmin() != null && usuario.getContrasenaAdmin().equals(adminContrasena)) {
                isAdmin = true;
            }

            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    usuario.getEmail(),
                    usuario.getContrasena(),
                    Collections.singletonList(new SimpleGrantedAuthority(isAdmin ? "ROLE_ADMIN" : "ROLE_USER"))
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

            Map<String, Object> response = new HashMap<>();
            response.put("message", isAdmin ? "Login exitoso como ADMIN" : "Login exitoso como USUARIO");
            response.put("isAdmin", isAdmin);

            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(401).body(Collections.singletonMap("message", "Login fallido"));
    }






}
