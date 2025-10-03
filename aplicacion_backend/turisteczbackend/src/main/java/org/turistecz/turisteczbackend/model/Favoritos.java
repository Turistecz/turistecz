package org.turistecz.turisteczbackend.model;


import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;





@Entity
public class Favoritos {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Integer id;

   @ManyToOne
   @JoinColumn(name = "usuario_id")
   private Usuario usuario;

   @ManyToOne
   @JoinColumn(name = "sitios_id")
   private Sitio sitio;

   @JsonManagedReference
   @OneToMany(mappedBy = "favoritos", cascade = CascadeType.ALL, orphanRemoval = true)
   private List<SitiosRutaUsuario> sitios_ruta_usuario;

   // Getters y Setters

   public Integer getId() {
      return id;
   }

   public void setId(Integer id) {
      this.id = id;
   }

   public Usuario getUsuario() {
      return usuario;
   }

   public void setUsuario(Usuario usuario) {
      this.usuario = usuario;
   }

   public Sitio getSitio() {
      return sitio;
   }

   public void setSitio(Sitio sitio) {
      this.sitio = sitio;
   }

   public List<SitiosRutaUsuario> getSitios_ruta_usuario() {
      return sitios_ruta_usuario;
   }

   public void setSitios_ruta_usuario(List<SitiosRutaUsuario> sitios_ruta_usuario) {
      this.sitios_ruta_usuario = sitios_ruta_usuario;
   }
    
}
