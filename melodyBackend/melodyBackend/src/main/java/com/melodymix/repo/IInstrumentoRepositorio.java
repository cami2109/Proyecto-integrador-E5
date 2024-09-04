package com.melodymix.repo;

import com.melodymix.entidad.Instrumento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IInstrumentoRepositorio extends JpaRepository<Instrumento,Long> {

}
