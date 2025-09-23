package org.turistecz.turisteczbackend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class SitiosRutaUsuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private Integer id_ruta;

    @Column
    private Integer id_usuario;

    @Column
    private Integer id_sitio_fav;

    @Column
    private Integer orden;

    @Column
    private String texto_sitio;

    // Getters and Setters

    public int getId() {
        return id;
    }

    public Integer getId_ruta() {
        return id_ruta;
    }

    public void setId_ruta(Integer id_ruta) {
        this.id_ruta = id_ruta;
    }

    public Integer getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(Integer id_usuario) {
        this.id_usuario = id_usuario;
    }

    public Integer getId_sitio_fav() {
        return id_sitio_fav;
    }

    public void setId_sitio_fav(Integer id_sitio_fav) {
        this.id_sitio_fav = id_sitio_fav;
    }

    public Integer getOrden() {
        return orden;
    }

    public void setOrden(Integer orden) {
        this.orden = orden;
    }

    public String getTexto_sitio() {
        return texto_sitio;
    }

    public void setTexto_sitio(String texto_sitio) {
        this.texto_sitio = texto_sitio;
    }
}