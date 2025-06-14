package examen2.backend.data;

import examen2.backend.logic.Opcion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OpcionRepository extends JpaRepository<Opcion, Integer> {
}
