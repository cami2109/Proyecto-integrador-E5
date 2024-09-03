package com.melodymix.entidad;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "instrumentos")
@Getter
@Setter
@AllArgsConstructor

public class Instrumento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private double precio;
    private String categoria;
    private String caracteristicas;
    private String descripcion;
    private String stock;



}
