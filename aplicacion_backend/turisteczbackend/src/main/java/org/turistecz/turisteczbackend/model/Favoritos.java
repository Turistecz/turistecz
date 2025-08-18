package org.turistecz.turisteczbackend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.util.List;

@Entity
public class Favoritos {

   @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column()
    private int usuario_id;

    @Column()
    private int sitios_id;


     @JsonBackReference
     @OneToMany(fetch = FetchType.LAZY, mappedBy = "id.favoritos", cascade = CascadeType.ALL)
     private List<Favoritos> favoritos;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUsuario_id() {
        return usuario_id;
    }

    public void setUsuario_id(int usuario_id) {
        this.usuario_id = usuario_id;
    }

    public int getSitios_id() {
        return sitios_id;
    }

    public void setSitios_id(int sitios_id) {
        this.sitios_id = sitios_id;
    }
    
}
