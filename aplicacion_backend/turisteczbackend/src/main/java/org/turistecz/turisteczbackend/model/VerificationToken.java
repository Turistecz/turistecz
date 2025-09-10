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

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoToken tipo;

    private LocalDateTime expiration;

    @Column(length = 1000)
    private String data;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, name = "usuario_id")
    private Usuario usuario;

    public VerificationToken() {}

    // ─── GETTERS Y SETTERS ──────────────────────────────────────────────

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public TipoToken getTipo() { return tipo; }
    public void setTipo(TipoToken tipo) { this.tipo = tipo; }

    public LocalDateTime getExpiration() { return expiration; }
    public void setExpiration(LocalDateTime expiration) { this.expiration = expiration; }

    public String getData() { return data; }
    public void setData(String data) { this.data = data; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

    // ─── ENUM TIPO DE TOKEN ────────────────────────────────────────────
    public enum TipoToken {
        ACTIVACION,
        RECUPERACION
    }
}
