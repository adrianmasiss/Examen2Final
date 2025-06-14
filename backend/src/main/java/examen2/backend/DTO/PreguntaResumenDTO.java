package examen2.backend.DTO;

public class PreguntaResumenDTO {
    public Integer id;
    public String texto;
    public String topico;

    public PreguntaResumenDTO(Integer id, String texto, String topico) {
        this.id = id;
        this.texto = texto;
        this.topico = topico;
    }
}
