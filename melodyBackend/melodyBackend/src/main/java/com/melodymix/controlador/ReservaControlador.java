package com.melodymix.controlador;

import com.melodymix.entidad.Reserva;
import com.melodymix.servicio.ReservaServicioImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/reserva")
public class ReservaControlador {

    @Autowired
    private ReservaServicioImpl reservaServicioImpl;

    @PostMapping("/verificar")
    public ResponseEntity<Boolean> verificarDisponibilidad(
            @RequestParam Long instrumentoId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaInicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaFin) {
        boolean disponible = reservaServicioImpl.verificarDisponibilidad(instrumentoId, fechaInicio, fechaFin);
        return ResponseEntity.ok(disponible);
    }

    @PostMapping("/reservar")
    public ResponseEntity<Reserva> crearReserva(
            @RequestParam Long instrumentoId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaInicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaFin) {

        if (reservaServicioImpl.verificarDisponibilidad(instrumentoId,fechaInicio,fechaFin)) {
            Reserva reserva = reservaServicioImpl.crearReserva(instrumentoId,fechaInicio,fechaFin);
            return ResponseEntity.ok(reserva);
        }
        else {
            throw new RuntimeException("Problema con la disponibilidad");

        }
    }

    @GetMapping("/fechas-reservadas")
    public ResponseEntity<List<LocalDate>> obtenerFechasReservadas(@RequestParam Long instrumentoId) {
        List<LocalDate> fechasReservadas = reservaServicioImpl.obtenerFechasReservadas(instrumentoId);
        return ResponseEntity.ok(fechasReservadas);
    }



}
