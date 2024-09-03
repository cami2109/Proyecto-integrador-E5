package com.melodymix.servicio;

import com.melodymix.entidad.Instrumento;

import java.util.List;

public interface IInstrumentoServicio {
    List<Instrumento> listarTodos();

    Instrumento buscarPorid(Long id);

    void eliminar(Long id);
    Instrumento registrar(Instrumento instrumento);

    void actualizar(Instrumento instrumento);
}
