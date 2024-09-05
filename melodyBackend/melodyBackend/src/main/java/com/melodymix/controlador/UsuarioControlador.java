package com.melodymix.controlador;

import com.melodymix.entidad.Usuario;
import com.melodymix.servicio.UsuarioServicioImpl;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("/usuario")
public class UsuarioControlador {

    private final UsuarioServicioImpl usuarioServiceImpl;
    private final String secretKey;

    @Value("${admin.contrasena}")
    private String adminContrasena;

    @Autowired
    public UsuarioControlador(UsuarioServicioImpl usuarioServiceImpl,
                              @Value("${jwt.secret.key}") String secretKey) {
        this.usuarioServiceImpl = usuarioServiceImpl;
        this.secretKey = secretKey;
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

            if (usuario.getContrasenaAdmin() != null && usuario.getContrasenaAdmin().equals(adminContrasena)) {
                isAdmin = true;
            }

            // Generar el token JWT
            String token = Jwts.builder()
                    .setSubject(usuarioRegistrado.getEmail())
                    .claim("roles", isAdmin ? "ROLE_ADMIN" : "ROLE_USER")
                    .signWith(SignatureAlgorithm.HS256, secretKey.getBytes())
                    .compact();

            Map<String, Object> response = new HashMap<>();
            response.put("message", isAdmin ? "Login exitoso como ADMIN" : "Login exitoso como USUARIO");
            response.put("isAdmin", isAdmin);
            response.put("nombre", usuarioRegistrado.getNombre());
            response.put("apellido", usuarioRegistrado.getApellido());
            response.put("email", usuarioRegistrado.getEmail());
            response.put("token", token); // Agrega el token a la respuesta

            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(401).body(Collections.singletonMap("message", "Login fallido"));
    }
}
