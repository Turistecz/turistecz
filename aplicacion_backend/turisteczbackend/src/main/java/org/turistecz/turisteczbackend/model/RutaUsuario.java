package org.turistecz.turisteczbackend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class RutaUsuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private Integer id_usuario;

    @Column(length = 255)
    private String titulo_ruta;

    @Column(length = 255)
    private String descripcion_ruta;

    @Column(length = 255)
    private String imagen_destacada;

    // Getters and Setters

    public int getId() {
        return id;
    }

    public Integer getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(Integer id_usuario) {
        this.id_usuario = id_usuario;
    }

    public String getTitulo_ruta() {
        return titulo_ruta;
    }

    public void setTitulo_ruta(String titulo_ruta) {
        this.titulo_ruta = titulo_ruta;
    }

    public String getDescripcion_ruta() {
        return descripcion_ruta;
    }

    public void setDescripcion_ruta(String descripcion_ruta) {
        this.descripcion_ruta = descripcion_ruta;
    }

    public String getImagen_destacada() {
        return imagen_destacada;
    }

    public void setImagen_destacada(String imagen_destacada) {
        this.imagen_destacada = imagen_destacada;
    }

}
