package examen2.backend.data;

import examen2.backend.logic.Respuesta;
import examen2.backend.logic.User;
import examen2.backend.logic.Pregunta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RespuestaRepository extends JpaRepository<Respuesta, Integer> {
    List<Respuesta> findByUsuario(User usuario);
    boolean existsByUsuarioAndPregunta(User usuario, Pregunta pregunta);
}
