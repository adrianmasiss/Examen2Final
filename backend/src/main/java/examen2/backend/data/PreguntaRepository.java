package examen2.backend.data;

import examen2.backend.logic.Pregunta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PreguntaRepository extends JpaRepository<Pregunta, Integer> {
    List<Pregunta> findByTopicoContainingIgnoreCase(String topico);
}
