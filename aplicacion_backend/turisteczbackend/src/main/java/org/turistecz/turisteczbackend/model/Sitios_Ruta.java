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
    //el string que le pasen para el nombre no puede exceder de 255 caracteres.
    //La anotacion @EmbeddedId la usamos para indicarle que en la tabla que representa 
    //a esta entidad hay una clave primaria compuesta y que vamos a representar dicha 
    //clave primaria compuesta mediante una entidad auxiliar, que vamos a crear aquí 
    //dentro, en una clase llamada "SitiosRutaId"
    @EmbeddedId 
    private SitiosRutaId id; // Nombre de las 2PK (clave primaria compuesta)

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

    
    //Esta es la clase que hemos mencionado antes, la que vamos a usar para representar
    //la clave primaria compuesta de la tabla que representa a esta entidad. Se usa la
    //anotacion @Embeddable para que Java sepa que esta es una entidad "ficticia" creada 
    //solamente con el fin de representar una clave primaria compuesta de esta entidad.
    //La hacemos estática para que no necesite implementar constructores
    @Embeddable
    static class SitiosRutaId {

        //Este atributo es especial. No se corresponde exactamente con un campo de la 
        //tabla, sino que le decimos que a traves del campo "id_sitio" de la tabla, 
        //haciendo un join con la tabla correspondiente (en la BBDD está la informacion 
        //en la parte de la clave foranea), puede llegar a sacar el Sitio al cual 
        //corresponde este Sitios_Ruta. Con la anotacion @ManyToOne le indicamos la 
        //cardinalidad de la relacion que hay entre esta tabla y aquella con la que esta 
        //relacionada a traves del atributo que mencionamos ("id_sitio"). Con el atributo 
        //"fetch = FetchType.LAZY" le indicamos que, cuando saque de la BBDD la informacion 
        //de esta clase, no es necesario que se traiga de primeras la informacion de las 
        //entidades asociadas (el Sitio correspondiente), para agilizar la carga de datos. 
        //Con la anotacion @JsonBackReference le estamos diciendo que cuando tenga que 
        //mostrar la información de la entidad en formato JSON no debe mostrar ningún campo 
        //con la información del Sitio al que está asociado este Sitios_Ruta, para evitar
        //una relación circular
        @JsonBackReference
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "id_sitio", nullable = false)
        private Sitio sitio;

        //Este atributo es especial. No se corresponde exactamente con un campo de la 
        //tabla, sino que le decimos que a traves del campo "id_ruta" de la tabla, 
        //haciendo un join con la tabla correspondiente (en la BBDD está la informacion 
        //en la parte de la clave foranea), puede llegar a sacar la ruta a la cual 
        //corresponde este Sitios_Ruta. Con la anotacion @ManyToOne le indicamos la 
        //cardinalidad de la relacion que hay entre esta tabla y aquella con la que esta 
        //relacionada a traves del atributo que mencionamos ("id_ruta"). Con el atributo 
        //"fetch = FetchType.LAZY" le indicamos que, cuando saque de la BBDD la informacion 
        //de esta clase, no es necesario que se traiga de primeras la informacion de las 
        //entidades asociadas (la Ruta correspondiente), para agilizar la carga de datos. 
        //Con la anotacion @JsonBackReference le estamos diciendo que cuando tenga que 
        //mostrar la información de la entidad en formato JSON no debe mostrar ningún campo 
        //con la información de la Ruta a la que está asociada este Sitios_Ruta, para evitar
        //una relación circular
        @JsonBackReference
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "id_ruta", nullable = false)
        private Ruta ruta;

        public Ruta getRuta() {
            return ruta;
        }

        public Sitio getSitio() {
            return sitio;
        }

    }

}





