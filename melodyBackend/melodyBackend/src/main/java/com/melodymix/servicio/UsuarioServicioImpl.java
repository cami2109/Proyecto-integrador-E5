package com.melodymix.servicio;

import com.melodymix.entidad.Usuario;
import com.melodymix.repo.IUsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

// anotacion @Service Spring
@Service
public class UsuarioServicioImpl implements IUsuarioServicio {

    private final IUsuarioRepositorio usuarioRepositorio;

    // Autowired sirve para inyectar una instancia de IUsuarioRepositorio en esta clase
    // osea, cuando se crea un UsuarioServiceImpl, spring se encarga de darle una instancia
    // adecuada de IUsuarioRepositorio
    // esto permite que UsuarioServiceImpl use el repositorio para acceder a la base de datos
    @Autowired
    public UsuarioServicioImpl(IUsuarioRepositorio usuarioRepositorio) {
        this.usuarioRepositorio = usuarioRepositorio;
    }
    @Override
    public Usuario registrar(Usuario usuario) {
        System.out.println("Registrando usuario: " + usuario);
        return usuarioRepositorio.save(usuario);
    }

    @Override
    public List<Usuario> listarTodos() {
        return usuarioRepositorio.findAll();
    }

    @Override
    public Usuario buscarPorId(Long id) {
        // el orEslse, es para que si no encuentra al usuario por el id, returnee null
        return usuarioRepositorio.findById(id).orElse(null);
    }

    @Override
    public void eliminar(Long id) {
        usuarioRepositorio.deleteById(id);
    }

    @Override
    public void actualizar(Usuario usuario) {

    }

    @Override
    public Usuario buscarPorEmail(String email) {
        return usuarioRepositorio.findByEmail(email).orElse(null);
    }
}
