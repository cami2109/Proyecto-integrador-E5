package com.melodymix.entidad;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Entity
@Table(name = "instrumentos")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

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
    private String imagenUrl;

    @Transient
    private List<String> caracteristicasList;




    // Otros campos...

    public List<String> getCaracteristicasList() {
        if (this.caracteristicas != null) {
            return Arrays.asList(this.caracteristicas.split(","));
        }
        return new ArrayList<>();
    }

    public void setCaracteristicasList(List<String> caracteristicasList) {
        this.caracteristicasList = caracteristicasList;
        this.caracteristicas = String.join(",", caracteristicasList);
    }

    public String getImagenUrl() {
        return imagenUrl;
    }

    public void setImagenUrl(String imagenUrl) {
        this.imagenUrl = imagenUrl;
    }
}


