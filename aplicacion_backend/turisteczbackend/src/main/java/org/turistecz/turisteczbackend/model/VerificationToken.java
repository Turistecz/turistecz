package org.turistecz.turisteczbackend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class VerificationToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String token;

    private LocalDateTime fecha_expiracion;

    @ManyToOne
    private Usuario usuario;

    @Enumerated(EnumType.STRING)
    private VerificationToken.TipoToken tipo; // ✅ campo tipo añadido

    // 🔹 Enum dentro o fuera de la clase
    public enum TipoToken {
        ACTIVACION,
        RECUPERACION
    }

    // Getters y setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public LocalDateTime getFecha_expiracion() {
        return fecha_expiracion;
    }

    public void setFecha_expiracion(LocalDateTime fecha_expiracion) {
        this.fecha_expiracion = fecha_expiracion;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public TipoToken getTipo() {
        return tipo;
    }

    public void setTipo(TipoToken tipo) {
        this.tipo = tipo;
    }
}
