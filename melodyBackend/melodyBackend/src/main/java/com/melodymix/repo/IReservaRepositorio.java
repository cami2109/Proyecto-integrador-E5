package com.melodymix.repo;

import com.melodymix.entidad.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface IReservaRepositorio extends JpaRepository<Reserva, Long> {
    List<Reserva> findByInstrumentoId(Long instrumentoId);

    @Query("SELECT r.fechaInicio, r.fechaFin FROM Reserva r WHERE r.instrumento.id = :instrumentoId")
    List<Object[]> findFechasReservadasByInstrumentoId(@Param("instrumentoId") Long instrumentoId);


}
