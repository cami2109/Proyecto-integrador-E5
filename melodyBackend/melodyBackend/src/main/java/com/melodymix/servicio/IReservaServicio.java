package com.melodymix.servicio;

import com.melodymix.entidad.Reserva;

import java.time.LocalDate;
import java.util.List;

public interface IReservaServicio {
    List<Reserva> listarTodas();

    Reserva buscarPorId(Long id);

    List<Reserva> obtenerReservasPorInstrumento(Long instrumentoId);

    Reserva crearReserva(Long instrumentoId, LocalDate fechaInicio, LocalDate fechaFin);

    void cancelarReserva(Long id);

    boolean verificarDisponibilidad(Long instrumentoId, LocalDate fechaInicio, LocalDate fechaFin);


}
