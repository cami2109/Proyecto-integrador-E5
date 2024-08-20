package com.melodymix.entidad;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Entity
// aca iria @Table(name = "usuarios", o como llamemos a la tabla)
@Table(name = "usuarios")
@Getter
@Setter
@AllArgsConstructor
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Para que JPA use AUTO_INCREMENT de la base de datos
    private Long id;
    private String nombre;
    private String apellido;
    private String email;
    @Getter(AccessLevel.NONE) // esto excluye el get contrasena asi esta "encriptada"
    private String contrasena;

    public Usuario(String nombre, String apellido, String email) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
    }
    public Usuario() {

    }

}
