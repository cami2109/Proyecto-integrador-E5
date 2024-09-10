package com.melodymix.repo;

import com.melodymix.entidad.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IReservaRepositorio extends JpaRepository<Reserva, Long> {
    List<Reserva> findByInstrumentoId(Long instrumentoId);
}
