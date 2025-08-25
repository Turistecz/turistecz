package org.turistecz.turisteczbackend.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;



//Este tipo de clases representan a una entidad del modelo de datos. 
//Se corresponden con alguna tabla de la BBDD, de nombre homonimo
@Entity
public class Ruta {

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
    private String nombre;

    @Column(length = 255)
    private String descripcion;

    @Column(length = 255)
    private String duracion;

    @Column(length = 255)
    private String imagen_destacada;

    @Column(length = 255)
    private String subtitulo;

    //Este atributo es especial. No se corresponde exactamente con un campo de la 
    //tabla, sino que le decimos que una "ruta" de la tabla esta relacionado con uno o 
    //varios Sitios_Ruta (de la tabla correspondiente). Con la anotacion @OneToMany le 
    //indicamos la cardinalidad de la relacion que hay entre esta tabla y aquella con la 
    //que esta relacionada. Con el atributo "fetch = FetchType.LAZY" le indicamos que, 
    //cuando saque de la BBDD la informacion de esta clase, no es necesario que se traiga 
    //de primeras la informacion de las entidades asociadas (los Sitios_Ruta correspondientes),  
    //para agilizar la carga de datos. Con la anotacion @JsonManagedReference le estamos 
    //diciendo que esta entidad es la importante de la relación, y que cuando tenga que 
    //mostrar la información de la entidad en formato JSON debe mostrar un campo más que
    //enseñe los "Sitios_Ruta" que están relacionados con esta Ruta 
    @JsonManagedReference
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "id.ruta", cascade = CascadeType.ALL)
    private List<Sitios_Ruta> sitios_ruta;


    public List<Sitios_Ruta> getSitios_ruta() {
      return sitios_ruta;
    }

    // Getters y Setters    
    public int getId() {
        return id;
    }

    public String getNombre() {
      return nombre;
    }

    public void setNombre(String n) {
    	this.nombre = n;
    }

    public String getDescripcion() {
      return descripcion;
    }

    public void setDescripcion(String d) {
    	this.descripcion = d;
    }

    public String getDuracion() {
      return duracion;
    }

    public void setDuracion(String du) {
    	this.duracion = du;
    }

    public String getImagen_destacada() {
      return imagen_destacada;
    }

    public void setImagen_destacada(String imagen) {
    	this.imagen_destacada = imagen;
    }

    public String getSubtitulo() {
      return subtitulo;
    }

    public void setSubtitulo(String sub) {
    	this.subtitulo= sub;
    }

}