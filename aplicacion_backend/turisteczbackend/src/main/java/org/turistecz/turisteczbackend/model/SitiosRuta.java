package org.turistecz.turisteczbackend.model;


import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

// Este tipo de clases representan a una entidad del modelo de datos. 
// Se corresponden con alguna tabla de la BBDD, de nombre homonimo
@Entity
public class SitiosRuta {


    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    // @Column
    // private Integer id_ruta;

    // @Column
    // private Integer id_sitio;

    @Column
    private Integer orden;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String texto;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Integer getOrden() {
        return orden;
    }

    public void setOrden(Integer orden) {
        this.orden = orden;
    }

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_sitio", nullable = false)
    private Sitio sitio;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_ruta", nullable = false)
    private Ruta ruta;

    public Sitio getSitio() {
        return sitio;
    }

    public void setSitio(Sitio sitio) {
        this.sitio = sitio;
    }

    public Ruta getRuta() {
        return ruta;
    }

    public void setRuta(Ruta ruta) {
        this.ruta = ruta;
    }

    // public Integer getId_ruta() {
    //     return id_ruta;
    // }

    // public void setId_ruta(Integer id_ruta) {
    //     this.id_ruta = id_ruta;
    // }

    // public Integer getId_sitio() {
    //     return id_sitio;
    // }

    // public void setId_sitio(Integer id_sitio) {
    //     this.id_sitio = id_sitio;
    // }
}





