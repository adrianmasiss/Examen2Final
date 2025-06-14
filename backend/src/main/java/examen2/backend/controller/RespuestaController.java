package examen2.backend.controller;

import examen2.backend.data.*;
import examen2.backend.logic.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/responder")
public class RespuestaController {

    @Autowired
    private PreguntaRepository preguntaRepo;
    @Autowired
    private OpcionRepository opcionRepo;
    @Autowired
    private RespuestaRepository respuestaRepo;
    @Autowired
    private UserRepository userRepo;

    // Registra la respuesta y devuelve si fue correcta
    @PostMapping
    public ResultadoRespuesta responder(@RequestBody Req req) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User usuario = userRepo.findByUsername(username);
        Pregunta pregunta = preguntaRepo.findById(req.preguntaId).orElseThrow();
        Opcion opcion = opcionRepo.findById(req.opcionId).orElseThrow();

        // OJO: Ahora la lista de correctas está en la pregunta
        boolean correcta = pregunta.getCorrectas().contains(opcion);

        Respuesta r = new Respuesta(usuario, pregunta, opcion, correcta);
        respuestaRepo.save(r);

        return new ResultadoRespuesta(correcta);
    }

    public static class Req {
        public Integer preguntaId;
        public Integer opcionId;
    }

    public static class ResultadoRespuesta {
        public boolean correcta;

        public ResultadoRespuesta(boolean correcta) {
            this.correcta = correcta;
        }
    }
}
