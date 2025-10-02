package org.turistecz.turisteczbackend.model;


import java.time.LocalDate;
import jakarta.persistence.*;
import java.util.Objects;
import java.util.Set;


@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String nombre;

    @Column
    private String apellido;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, name= "contrasena")
    private String contrasena;

    @Column(nullable = false)
    private boolean activo = false;

    @Column(name = "fecha_creacion")
    private LocalDate fechaCreacion = LocalDate.now();

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<RutaUsuario> rutaUsuario;

    public Usuario() {}

    public Usuario(String email, String contrasena, String nombre) {
        this.email = email;
        this.contrasena = contrasena;
        this.nombre = nombre;
        this.activo = false;
        this.fechaCreacion = LocalDate.now();
    }

public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getApellido() { return apellido; }
    public void setApellido(String apellido) { this.apellido = apellido; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getContrasena() { return contrasena; }
    public void setContrasena(String contrasena) { this.contrasena = contrasena; }

    public boolean isActivo() { return activo; }
    public void setActivo(boolean activo) { this.activo = activo; }

    public LocalDate getFechaCreacion() { return fechaCreacion; }
    public void setFechaCreacion(LocalDate fechaCreacion) { this.fechaCreacion = fechaCreacion; }

    @Override
    public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof Usuario)) return false;
    Usuario usuario = (Usuario) o;
    return Objects.equals(id, usuario.id);
    }

    @Override
    public int hashCode() { return Objects.hash(id); }
}