package org.turistecz.turisteczbackend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
public class Imagen_sitio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 255)
    private String url;

    @Column(length = 255)
    private String nombre;

    @Column(length = 255)
    private String copy;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_sitio", nullable = false)
    private Sitio sitio;

    // Getters y Setters
    public int getId() {
        return id;
    }

    public String getUrl() {
      return url;
    }

    public void setUrl(String u) {
    	this.url = u;
    }

    public String getNombre() {
      return nombre;
    }

    public void setNombre(String n) {
    	this.nombre = n;
    }

    public String getCopy() {
      return copy;
    }

    public void setCopy(String c) {
      this.copy = c;
    }
    
    public Sitio getSitio() {
      return sitio;
    }
}
