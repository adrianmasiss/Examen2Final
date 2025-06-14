package examen2.backend.DTO;

public class RespuestaHistorialDTO {
    public PreguntaResumenDTO pregunta;
    public boolean correcta;
    public String opcionTexto;

    public RespuestaHistorialDTO(PreguntaResumenDTO pregunta, boolean correcta, String opcionTexto) {
        this.pregunta = pregunta;
        this.correcta = correcta;
        this.opcionTexto = opcionTexto;
    }
}