package examen2.backend.logic;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Pregunta {
    @Id @GeneratedValue
    private Integer id;

    private String texto;
    private String topico;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Opcion> opciones;

    @ManyToMany
    private List<Opcion> correctas;

    public Pregunta() {}

    public Pregunta(String texto, String topico) {
        this.texto = texto;
        this.topico = topico;
    }

    public Integer getId() { return id; }
    public String getTexto() { return texto; }
    public void setTexto(String texto) { this.texto = texto; }
    public String getTopico() { return topico; }
    public void setTopico(String topico) { this.topico = topico; }
    public List<Opcion> getOpciones() { return opciones; }
    public void setOpciones(List<Opcion> opciones) { this.opciones = opciones; }
    public List<Opcion> getCorrectas() { return correctas; }
    public void setCorrectas(List<Opcion> correctas) { this.correctas = correctas; }
}
