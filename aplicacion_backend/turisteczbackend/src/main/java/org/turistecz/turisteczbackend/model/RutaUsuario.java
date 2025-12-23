package org.turistecz.turisteczbackend.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "ruta_usuario")
@Data
@NoArgsConstructor
public class RutaUsuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    @Column(name="id")
    private int id;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name="id_usuario", referencedColumnName = "id")
    private Usuario usuario;

    @Column(name="titulo_ruta", length = 255)
    private String titulo_ruta;

    @Column(name="descripcion_ruta",length = 255)
    private String descripcion_ruta;

    @Column(name="imagen_destacada",length = 255)
    private String imagen_destacada;

    @JsonManagedReference
    @OneToMany(mappedBy = "rutaUsuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SitiosRutaUsuario> sitios_ruta_usuario;

}
