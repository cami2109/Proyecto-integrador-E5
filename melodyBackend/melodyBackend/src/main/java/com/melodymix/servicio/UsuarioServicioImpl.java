package com.melodymix.servicio;

import com.melodymix.entidad.Usuario;
import com.melodymix.repo.IUsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.*;

@Service
public class UsuarioServicioImpl implements IUsuarioServicio, UserDetailsService {

    @Autowired
    private final IUsuarioRepositorio usuarioRepositorio;
    private final PasswordEncoder passwordEncoder;

    @Value("${admin.contrasena}")
    private String adminContrasena;



    // Autowired sirve para inyectar una instancia de IUsuarioRepositorio en esta clase
    // osea, cuando se crea un UsuarioServiceImpl, spring se encarga de darle una instancia
    // adecuada de IUsuarioRepositorio
    // esto permite que UsuarioServiceImpl use el repositorio para acceder a la base de datos
    @Autowired
    public UsuarioServicioImpl(IUsuarioRepositorio usuarioRepositorio, PasswordEncoder passwordEncoder) {
        this.usuarioRepositorio = usuarioRepositorio;
        this.passwordEncoder = passwordEncoder;
    }

    public PasswordEncoder getPasswordEncoder() {
        return passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuario usuario = buscarPorEmail(email);
        if (usuario == null) {
            throw new UsernameNotFoundException("Usuario no encontrado con el email: " + email);
        }
        return org.springframework.security.core.userdetails.User.builder()
                .username(usuario.getEmail())
                .password(usuario.getContrasena())
                .roles(usuario.isAdmin() ? "ADMIN" :"USER")
                .build();
    }

    @Override
    public Usuario registrar(Usuario usuario) {
//        if (usuario.getContrsenaAdmin() != null && usuario.getContrsenaAdmin().equals(admin)) esto quedo viejo del admin en registro, ahora es para login
        usuario.setContrasena(passwordEncoder.encode(usuario.getContrasena()));
        return usuarioRepositorio.save(usuario);
    }

    @Override
    public List<Usuario> listarTodos() {
        return usuarioRepositorio.findAll();
    }

    @Override
    public Usuario buscarPorId(Long id) {
        return usuarioRepositorio.findById(id).orElse(null);
    }

    @Override
    public void eliminar(Long id) {
        usuarioRepositorio.deleteById(id);
    }

    @Override
    public void actualizar(Usuario usuario) {
        // Implementar la lógica de actualización si es necesario
        usuarioRepositorio.save(usuario);
    }

    @Override
    public Usuario buscarPorEmail(String email) {
        return usuarioRepositorio.findByEmail(email).orElse(null);
    }
}