package examen2.backend.logic;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "usuarios")
public class User {
    @Id
    private String username;
    private String password;
    private String rol;
    private String nombre;

    public User() {}
    public User(String username, String password, String rol, String nombre) {
        this.username = username;
        this.password = password;
        this.rol = rol;
        this.nombre = nombre;
    }


    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
}
