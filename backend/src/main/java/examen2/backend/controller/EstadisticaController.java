package examen2.backend.controller;

import examen2.backend.data.RespuestaRepository;
import examen2.backend.logic.Respuesta;
import examen2.backend.logic.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/estadisticas")
public class EstadisticaController {

    @Autowired
    private RespuestaRepository respuestaRepo;
    @Autowired
    private examen2.backend.data.UserRepository userRepo;

    @GetMapping
    public Estadisticas getEstadisticas() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User usuario = userRepo.findByUsername(username);

        List<Respuesta> respuestas = respuestaRepo.findByUsuario(usuario);
        long aciertos = respuestas.stream().filter(Respuesta::isCorrecta).count();
        long fallos = respuestas.stream().filter(r -> !r.isCorrecta()).count();
        long total = respuestas.size();
        int nota = (total > 0) ? (int) Math.round(aciertos * 100.0 / total) : 0;

        return new Estadisticas((int) aciertos, (int) fallos, nota);
    }

    public static class Estadisticas {
        public int aciertos;
        public int fallos;
        public int nota;

        public Estadisticas(int aciertos, int fallos, int nota) {
            this.aciertos = aciertos;
            this.fallos = fallos;
            this.nota = nota;
        }
    }
}
