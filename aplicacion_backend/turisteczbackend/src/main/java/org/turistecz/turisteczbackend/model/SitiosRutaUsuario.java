package org.turistecz.turisteczbackend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "sitios_ruta_usuario")
@Data
@NoArgsConstructor
public class SitiosRutaUsuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name="id_ruta", referencedColumnName = "id")
    private RutaUsuario rutaUsuario;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name="id_sitio_favorito", referencedColumnName = "sitios_id")
    private Favoritos favoritos;
    
    @Column
    private Integer orden;

    @Column
    private String texto_sitio;

}