package com.melodymix.servicio;

import com.melodymix.entidad.Instrumento;
import com.melodymix.entidad.Reserva;
import com.melodymix.repo.IInstrumentoRepositorio;
import com.melodymix.repo.IReservaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReservaServicioImpl implements IReservaServicio {

    @Autowired
    private IReservaRepositorio reservaRepositorio;

    @Autowired
    private IInstrumentoRepositorio instrumentoRepositorio;
    @Override
    public List<Reserva> listarTodas() {
        return reservaRepositorio.findAll();
    }

    @Override
    public Reserva buscarPorId(Long id) {
        return reservaRepositorio.findById(id).orElse(null);
    }

    @Override
    public List<Reserva> obtenerReservasPorInstrumento(Long instrumentoId) {
        return reservaRepositorio.findByInstrumentoId(instrumentoId);
    }

    @Override
    public Reserva crearReserva(Long instrumentoId, LocalDate fechaInicio, LocalDate fechaFin) {
        Instrumento instrumento = instrumentoRepositorio.findById(instrumentoId).orElse(null);
        Reserva reserva = new Reserva(instrumento,fechaInicio, fechaFin);
        return reservaRepositorio.save(reserva);
    }

    @Override
    public void cancelarReserva(Long id) {
        Reserva reserva = buscarPorId(id);
        reservaRepositorio.delete(reserva);
    }

    @Override
    public boolean verificarDisponibilidad(Long instrumentoId, LocalDate fechaInicio, LocalDate fechaFin) {
        List<Reserva> reservas = reservaRepositorio.findByInstrumentoId(instrumentoId);
        for (Reserva reserva : reservas) {
            if ((fechaInicio.isBefore(reserva.getFechaFin()) && fechaFin.isAfter(reserva.getFechaInicio()))) {
                return false; // fecha en conflicto
            }
        }
        return true;
    }

    @Override
    public List<LocalDate> obtenerFechasReservadas(Long instrumentoId) {
        List<Reserva> reservas = reservaRepositorio.findByInstrumentoId(instrumentoId);
        List<LocalDate> fechasReservadas = new ArrayList<>();

        for (Reserva reserva : reservas) {
            LocalDate fechaInicio = reserva.getFechaInicio();
            LocalDate fechaFin = reserva.getFechaFin();

            // Iterar entre las fechas de inicio y fin y agregarlas a la lista
            while (!fechaInicio.isAfter(fechaFin)) {
                fechasReservadas.add(fechaInicio);
                fechaInicio = fechaInicio.plusDays(1);  // Avanzar al siguiente día
            }
        }

        return fechasReservadas;
    }

}



