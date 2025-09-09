package org.turistecz.turisteczbackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "v_sitios_ruta")
public class SitioRutaView {

    @Id
    @Column(name = "id_sitio") 
    private Integer idSitio;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "url")
    private String url;

    @Column(name = "texto")
    private String texto;

    @Column(name = "id_ruta")
    private Integer idRuta;

    // Getters y setters
    public Integer getIdSitio() { return idSitio; }
    public void setIdSitio(Integer idSitio) { this.idSitio = idSitio; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public String getTexto() { return texto; }
    public void setTexto(String texto) { this.texto = texto; }

    public Integer getIdRuta() { return idRuta; }
    public void setIdRuta(Integer idRuta) { this.idRuta = idRuta; }
}
