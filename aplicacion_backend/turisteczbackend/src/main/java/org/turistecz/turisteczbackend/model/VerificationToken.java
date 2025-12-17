package org.turistecz.turisteczbackend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "verification_token")
public class VerificationToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String token;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(name = "fecha_expiracion", nullable = false)
    private LocalDateTime fechaExpiracion;

    @Column(nullable = false)
    private String tipo;

    public VerificationToken() {}

    public VerificationToken(String token, Usuario usuario, LocalDateTime fechaExpiracion, String tipo) {
        this.token = token;
        this.usuario = usuario;
        this.fechaExpiracion = fechaExpiracion;
        this.tipo = tipo;
    }

    // Getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

    public LocalDateTime getFechaExpiracion() { return fechaExpiracion; }
    public void setFechaExpiracion(LocalDateTime fechaExpiracion) { this.fechaExpiracion = fechaExpiracion; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
}
