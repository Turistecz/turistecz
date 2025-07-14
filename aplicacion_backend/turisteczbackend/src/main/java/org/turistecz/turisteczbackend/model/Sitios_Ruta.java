package org.turistecz.turisteczbackend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

//Este tipo de clases representan a una entidad del modelo de datos. 
//Se corresponden con alguna tabla de la BBDD, de nombre homonimo
@Entity
public class Sitios_Ruta {

    //Los atributos de la clase se corresponden con los campos (columnas)
    //del mismo nombre en la BBDD. Mediante las diferentes anotaciones le
    //damos informacion a Java sobre esas columnas. Algunas no son imprescindibles, 
    //pero sirven para darle un nivel mas de comprobaciones a la aplicacion. Por 
    //ejemplo, aqui le indicamos que el campo id es autogenerado en la BBDD, o que 
    //el string que le pasen para el nombre no puede exceder de 255 caracteres


    @EmbeddedId // Clave primaria compuesta 
    private SitiosRutaId id; // Nombre de las 2PK (compuesta)

    @Column
    private Integer orden;

    @Column
    private String texto;

    

    public SitiosRutaId getId() {
        return id;
    }

    public void setId(SitiosRutaId id) {
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

    

    // Creamos la clase SitiosRutaId con @Embeddable ya que tiene PK compuestas. 
    @Embeddable //Clase para la clave primaria compuesta
    static class SitiosRutaId {

       /*  public SitiosRutaId(int idRuta, Sitio sitio) {
            this.idRuta = idRuta;
            this.sitio = sitio;
        }*/

        // @Column(name = "id_ruta")
        // private int idRuta;

        //@Column(name = "id_sitio")
        //private int idSitio;

        // public int getIdRuta() {
        //     return idRuta;
        // }

        //public int getIdSitio() {
        //    return idSitio;
        //}

        // Relacion muchos a uno entre sitiosRuta y sitio
        @JsonBackReference
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "id_sitio", nullable = false)
        private Sitio sitio;

        @JsonBackReference
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "id_ruta", nullable = false)
        private Ruta ruta;

        //public SitiosRutaId() {
        //}

        public Ruta getRuta() {
            return ruta;
        }

        public Sitio getSitio() {
            return sitio;
        }

    }

}





