package com.controlador;

import com.entidad.Usuario;
import com.servicio.IUsuarioService;
import com.servicio.implementacion.UsuarioServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
// mapeo la url para que todos los postmapping que se hagan en este controlador,
// tengan que tener "/usuario" antes, osea /usuario/registro o /usuario/login , etc
@RequestMapping("/usuario")

public class UsuarioControlador {
    // inyectamos la implementacion UsuarioServiceImpl
    private UsuarioServiceImpl usuarioServiceImpl;

    @Autowired
    public UsuarioControlador(UsuarioServiceImpl usuarioServiceImpl) {
        this.usuarioServiceImpl = usuarioServiceImpl;
    }

    @PostMapping("/registro")
    public ResponseEntity<Usuario> registrar(@RequestBody Usuario usuario) {
        Usuario nuevoUsuario = usuarioServiceImpl.registrar(usuario);
        return ResponseEntity.ok(nuevoUsuario);
    }
}
