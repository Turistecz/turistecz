package org.turistecz.turisteczbackend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;





@Entity
public class Favoritos {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private int id;

   @ManyToOne
   @JoinColumn(name = "usuario_id", nullable = false)
   private Usuario usuario;   

   @ManyToOne
   @JoinColumn(name = "sitios_id", nullable = false)
   private Sitio sitio;       

   
   public int getId() { return id; }
   public void setId(int id) { this.id = id; }

   public Usuario getUsuario() 
   { return usuario; }
   public void setUsuario(Usuario usuario) 
   { this.usuario = usuario; }

   public Sitio getSitio() 
   { return sitio; }
   public void setSitio(Sitio sitio) 
   { this.sitio = sitio; }
}


