package examen2.backend.logic;

import jakarta.persistence.*;

@Entity
public class Respuesta {
    @Id @GeneratedValue
    private Integer id;

    @ManyToOne
    private User usuario;

    @ManyToOne
    private Pregunta pregunta;

    @ManyToOne
    private Opcion opcion;

    private boolean correcta;

    public Respuesta() {}

    public Respuesta(User usuario, Pregunta pregunta, Opcion opcion, boolean correcta) {
        this.usuario = usuario;
        this.pregunta = pregunta;
        this.opcion = opcion;
        this.correcta = correcta;
    }


    public Integer getId() { return id; }
    public User getUsuario() { return usuario; }
    public void setUsuario(User usuario) { this.usuario = usuario; }
    public Pregunta getPregunta() { return pregunta; }
    public void setPregunta(Pregunta pregunta) { this.pregunta = pregunta; }
    public Opcion getOpcion() { return opcion; }
    public void setOpcion(Opcion opcion) { this.opcion = opcion; }
    public boolean isCorrecta() { return correcta; }
    public void setCorrecta(boolean correcta) { this.correcta = correcta; }
}
