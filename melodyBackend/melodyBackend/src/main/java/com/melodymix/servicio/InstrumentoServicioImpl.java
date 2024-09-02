package com.melodymix.servicio;

import com.melodymix.entidad.Instrumento;
import com.melodymix.repo.IInstrumentoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class InstrumentoServicioImpl implements IInstrumentoServicio {

    @Autowired
    private IInstrumentoRepositorio instrumentoRepositorio;



    @Override
    public List<Instrumento> listarTodos() {
        return instrumentoRepositorio.findAll();
    }

    @Override
    public Instrumento buscarPorid(Long id) {
        return instrumentoRepositorio.findById(id).orElse(null);
    }

    @Override
    public void eliminar(Long id) {
        instrumentoRepositorio.deleteById(id);
    }

    @Override
    public Instrumento registrar(Instrumento instrumento) {
        return instrumentoRepositorio.save(instrumento);
    }

    @Override
    public void actualizar(Instrumento instrumento) {
        instrumentoRepositorio.save(instrumento);
    }
}
