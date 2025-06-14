package examen2.backend.logic;

import jakarta.persistence.*;

@Entity
public class Opcion {
    @Id @GeneratedValue
    private Integer id;

    private String texto;

    public Opcion() {}

    public Opcion(String texto) {
        this.texto = texto;
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getTexto() { return texto; }
    public void setTexto(String texto) { this.texto = texto; }
}
