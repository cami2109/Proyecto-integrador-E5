package com.melodymix.controlador;

import com.melodymix.entidad.Usuario;
import com.melodymix.servicio.IUsuarioServicio;
import com.melodymix.servicio.IAuthServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/usuario")
public class UsuarioControlador {

    private static final Logger logger = LoggerFactory.getLogger(UsuarioControlador.class);

    private final IUsuarioServicio usuarioServicio;
    private final PasswordEncoder passwordEncoder;
    private final IAuthServicio authServicio;

    @Autowired
    public UsuarioControlador(IUsuarioServicio usuarioServicio, PasswordEncoder passwordEncoder, IAuthServicio authServicio) {
        this.usuarioServicio = usuarioServicio;
        this.passwordEncoder = passwordEncoder;
        this.authServicio = authServicio;
    }

    @PostMapping("/registro")
    public ResponseEntity<Usuario> registrar(@RequestBody Usuario usuario) {
        logger.info("Registrando usuario: {}", usuario.getEmail());
        Usuario nuevoUsuario = usuarioServicio.registrar(usuario);
        return ResponseEntity.ok(nuevoUsuario);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Usuario usuario) {
        logger.info("Intentando login para usuario: {}", usuario.getEmail());
        Map<String, String> response = new HashMap<>();
        String token = authServicio.authenticate(usuario.getEmail(), usuario.getContrasena());
        if (token != null) {
            logger.info("Login exitoso para usuario: {}", usuario.getEmail());
            response.put("token", token);
            response.put("message", "Login exitoso");
            return ResponseEntity.ok(response);
        } else {
            logger.warn("Login fallido para usuario: {}", usuario.getEmail());
            response.put("message", "Login fallido");
            return ResponseEntity.status(401).body(response);
        }
    }
}