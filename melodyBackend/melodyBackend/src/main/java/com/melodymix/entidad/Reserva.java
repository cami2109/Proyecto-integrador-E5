package com.melodymix.entidad;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "reservas")
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // muchas reservas pueden estar asociadas a un solo instrumento
    @ManyToOne
    // se especifica que la columna intrumento_id se va a usar
    // para la foreign key (FK) de la tabla instrumentos
    @JoinColumn(name = "instrumento_id")
    // el instrumento al que esta asociado
    private Instrumento instrumento;

    private LocalDate fechaInicio;
    private LocalDate fechaFin;

    public Reserva(Instrumento instrumento, LocalDate fechaInicio, LocalDate fechaFin) {
        this.instrumento = instrumento;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
    }

}


