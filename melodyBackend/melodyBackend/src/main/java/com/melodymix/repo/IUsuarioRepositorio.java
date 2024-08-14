package com.melodymix.repo;


import com.melodymix.entidad.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
// JpaRepository es una interfaz que proporciona metodos CRUD
public interface IUsuarioRepositorio extends JpaRepository<Usuario, Long> {
    // save(S entity): Guarda una entidad en la base de datos (ya sea insertando una nueva o actualizando una existente).
    //findById(ID id): Busca una entidad por su ID.
    //findAll(): Recupera todas las entidades de la tabla.
    //deleteById(ID id): Elimina una entidad por su ID.
    //count(): Cuenta el número de entidades en la tabla.
    // estos son los metodos que trae JpaRepository, y le voy a agregar otro que capaz usemos
    // que es findByEmail

    // le ponemos optional, para despues en el override de la funcion en la implementacion,
    // le pueda poner un .orElse(null) para si no lo encuentra devuelva null
    Optional<Usuario> findByEmail(String email);



}
