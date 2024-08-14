package com.melodymix.servicio;

import com.melodymix.entidad.Usuario;

// importe el util.List para que se pueda usar el objeto List
import java.util.List;
public interface IUsuarioServicio {
    Usuario registrar(Usuario usuario);
    List <Usuario> listarTodos();
    Usuario buscarPorId(Long id);
    void eliminar(Long id);
    void actualizar(Usuario usuario);
    Usuario buscarPorEmail(String email);

}
