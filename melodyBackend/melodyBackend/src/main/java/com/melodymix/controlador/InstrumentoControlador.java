package com.melodymix.controlador;


import com.melodymix.entidad.Instrumento;
import com.melodymix.servicio.InstrumentoServicioImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/instrumento")
//@CrossOrigin(origins = "*") // Permite solicitudes desde cualquier origen

public class InstrumentoControlador {
    @Autowired
    private InstrumentoServicioImpl instrumentoServicioImpl;

    @GetMapping("/listar")
    public List<Instrumento> listarInstrumentos() {
        return instrumentoServicioImpl.listarTodos();
    }

    @PostMapping("/registrar")
    public ResponseEntity<Instrumento> registrar(@RequestBody Instrumento instrumento) {
        Instrumento nuevoInstrumento = instrumentoServicioImpl.registrar(instrumento);
        return ResponseEntity.ok(nuevoInstrumento);
    }

    @DeleteMapping("/{id}")
    public void eliminar (@PathVariable Long id) {
        instrumentoServicioImpl.eliminar(id);
    }

}
