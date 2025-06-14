package examen2.backend.controller;

import examen2.backend.DTO.PreguntaResumenDTO;
import examen2.backend.DTO.RespuestaHistorialDTO;
import examen2.backend.data.RespuestaRepository;
import examen2.backend.data.UserRepository;
import examen2.backend.logic.Respuesta;
import examen2.backend.logic.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/respuestas")
public class HistorialController {

    @Autowired
    private RespuestaRepository respuestaRepo;
    @Autowired
    private UserRepository userRepo;

    @GetMapping
    public List<RespuestaHistorialDTO> historial() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User usuario = userRepo.findByUsername(username);
        List<Respuesta> respuestas = respuestaRepo.findByUsuario(usuario);
        return respuestas.stream()
                .map(r -> new RespuestaHistorialDTO(
                        new PreguntaResumenDTO(
                                r.getPregunta().getId(),
                                r.getPregunta().getTexto(),
                                r.getPregunta().getTopico()
                        ),
                        r.isCorrecta(),
                        r.getOpcion().getTexto()
                ))
                .collect(Collectors.toList());
    }
}