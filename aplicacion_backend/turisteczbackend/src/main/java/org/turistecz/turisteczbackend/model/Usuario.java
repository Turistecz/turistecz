package org.turistecz.turisteczbackend.model;
import jakarta.persistence.*;
import java.time.LocalDate; 

@Entity
public class Usuario {
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @Column(length = 255)
    private String nombre;

    @Column(length = 255)
    private String apellido;

    @Column(length = 255)
    private String email;

    @Column(length = 255)
    private String contrasena;

    @Column(nullable = false)
    private Boolean activo = false;

    @Column()
    private LocalDate fecha_creacion;

    //Getters y Setters
   
   
    
   
    public int getId() {
        return id;
    }
     public void setId(int id) {
      this.id = id;
    }
     public String getNombre() {
      return nombre;
    }

    public void setNombre(String n) {
    	this.nombre = n;
    }

    public String getApellido() {
      return apellido;
    }

    public void setApellido(String a) {
    	this.apellido = a;
    }
     public String getContrasena() {
      return contrasena;
    }

    public void setContrasena(String c) {
    	this.contrasena = c;
    }
     public String getEmail() {
      return email;
    }

    public void setEmail(String e) {
    	this.email = e;
    }
     public Boolean getActivo() {
      return activo;
    }
    public void setActivo(Boolean activo) {
      this.activo = activo;
    }
    public LocalDate getFecha_creacion() {
      return fecha_creacion;
    }
    public void setFecha_creacion(LocalDate fecha_creacion) {
      this.fecha_creacion = fecha_creacion;
    }  

    
}