package examen2.backend.DTO;

import java.util.List;

public class PreguntaDTO {
    public Integer id;
    public String texto;
    public String topico;
    public List<OpcionDTO> opciones;

    public PreguntaDTO(Integer id, String texto, String topico, List<OpcionDTO> opciones) {
        this.id = id;
        this.texto = texto;
        this.topico = topico;
        this.opciones = opciones;
    }
}
