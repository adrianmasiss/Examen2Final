package examen2.backend.controller;

import examen2.backend.DTO.PreguntaResumenDTO;
import examen2.backend.DTO.PreguntaDTO;
import examen2.backend.DTO.OpcionDTO;
import examen2.backend.DTO.RespuestaDTO;
import examen2.backend.DTO.RespuestaFeedback;
import examen2.backend.data.PreguntaRepository;
import examen2.backend.data.RespuestaRepository;
import examen2.backend.logic.Pregunta;
import examen2.backend.logic.Opcion;
import examen2.backend.logic.Respuesta;
import examen2.backend.logic.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/preguntas")
public class PreguntaController {

    @Autowired
    private PreguntaRepository preguntaRepo;
    @Autowired
    private RespuestaRepository respuestaRepo;
    @Autowired
    private examen2.backend.data.UserRepository userRepo;

    // NUEVO: Buscar preguntas (solo resumen, SIN opciones)
    @GetMapping
    public List<PreguntaResumenDTO> buscarPreguntas(@RequestParam(value = "topico", required = false) String topico) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User usuario = userRepo.findByUsername(username);
        List<Pregunta> todas = (topico == null || topico.isEmpty())
                ? preguntaRepo.findAll()
                : preguntaRepo.findByTopicoContainingIgnoreCase(topico);

        return todas.stream()
                .filter(p -> !respuestaRepo.existsByUsuarioAndPregunta(usuario, p))
                .map(p -> new PreguntaResumenDTO(
                        p.getId(),
                        p.getTexto(),
                        p.getTopico()
                ))
                .collect(Collectors.toList());
    }

    // NUEVO: Endpoint para obtener una pregunta con opciones
    @GetMapping("/{id}")
    public PreguntaDTO getPregunta(@PathVariable Integer id) {
        Pregunta p = preguntaRepo.findById(id).orElseThrow();
        return new PreguntaDTO(
                p.getId(),
                p.getTexto(),
                p.getTopico(),
                p.getOpciones().stream()
                        .map(o -> new OpcionDTO(o.getId(), o.getTexto()))
                        .collect(Collectors.toList())
        );
    }

    @PostMapping("/{id}/responder")
    public RespuestaFeedback responderPregunta(
            @PathVariable Integer id,
            @RequestBody RespuestaDTO body
    ) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User usuario = userRepo.findByUsername(username);
        Pregunta pregunta = preguntaRepo.findById(id).orElseThrow();

        Opcion seleccionada = pregunta.getOpciones().stream()
                .filter(o -> o.getId().equals(body.seleccionada))
                .findFirst()
                .orElseThrow();

        boolean correcta = pregunta.getCorrectas().stream()
                .anyMatch(op -> op.getId().equals(seleccionada.getId()));

        Respuesta respuesta = new Respuesta();
        respuesta.setPregunta(pregunta);
        respuesta.setUsuario(usuario);
        respuesta.setOpcion(seleccionada);
        respuesta.setCorrecta(correcta);
        respuestaRepo.save(respuesta);

        return new RespuestaFeedback(correcta);
    }
}
