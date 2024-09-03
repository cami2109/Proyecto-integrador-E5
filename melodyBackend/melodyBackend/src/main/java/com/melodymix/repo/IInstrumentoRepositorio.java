package com.melodymix.repo;

import com.melodymix.entidad.Instrumento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IInstrumentoRepositorio extends JpaRepository<Instrumento,Long> {

}
