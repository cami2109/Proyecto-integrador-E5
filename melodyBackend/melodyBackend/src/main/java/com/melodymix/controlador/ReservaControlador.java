package com.melodymix.controlador;

import com.melodymix.entidad.Reserva;
import com.melodymix.servicio.ReservaServicioImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

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

        Reserva reserva = reservaServicioImpl.crearReserva(instrumentoId, fechaInicio,fechaFin);
        return ResponseEntity.ok(reserva);
    }

}
