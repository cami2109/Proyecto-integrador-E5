package com.melodymix.entidad;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "usuarios")
@Getter
@Setter
@AllArgsConstructor
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nombre;
    private String apellido;
    private String email;
    
    // Si deseas proteger la contrasena de acceso directo
 //    @Getter(AccessLevel.NONE)
    private String contrasena;
    
    private boolean isAdmin = false;
    
    @Transient
    private String contrasenaAdmin;

    public Usuario(String nombre, String apellido, String email) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
    }

    public Usuario() {
        // Constructor vacío para JPA
    }

    public Object getContrasenaAdmin() {
        return contrasenaAdmin;
    }
}
