package org.turistecz.turisteczbackend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

//Este tipo de clases representan a una entidad del modelo de datos. 
//Se corresponden con alguna tabla de la BBDD, de nombre homonimo
@Entity
public class Imagen_sitio {

    //Los atributos de la clase se corresponden con los campos (columnas)
    //del mismo nombre en la BBDD. Mediante las diferentes anotaciones le
    //damos informacion a Java sobre esas columnas. Algunas no son imprescindibles, 
    //pero sirven para darle un nivel mas de comprobaciones a la aplicacion. Por 
    //ejemplo, aqui le indicamos que el campo id es autogenerado en la BBDD, o que 
    //el string que le pasen para el nombre no puede exceder de 255 caracteres
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 255)
    private String url;

    @Column(length = 255)
    private String nombre;

    @Column(length = 255)
    private String copy;

    //Este atributo es especial. No se corresponde exactamente con un campo de la 
    //tabla, sino que le decimos que a traves del campo "id_sitio" de la tabla, 
    //haciendo un join con la tabla correspondiente (en la BBDD está la informacion 
    //en la parte de la clave foranea), puede llegar a sacar el Sitio al cual 
    //corresponde esta Imagen_sitio. Con la anotacion @ManyToOne le indicamos la 
    //cardinalidad de la relacion que hay entre esta tabla y aquella con la que esta 
    //relacionada a traves del atributo que mencionamos ("id_sitio"). Con el atributo 
    //"fetch = FetchType.LAZY" le indicamos que, cuando saque de la BBDD la informacion 
    //de esta clase, no es necesario que se traiga la informacion de la entidad asociada
    //(el Sitio), para evitar relaciones circulares. Con la anotacion @JsonBackReference 
    //le estamos diciendo que esta entidad es la que esta en el lado de "Many" de la 
    //relacion (ManyToOne)
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
