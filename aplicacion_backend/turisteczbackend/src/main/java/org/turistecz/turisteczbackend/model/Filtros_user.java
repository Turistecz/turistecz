package org.turistecz.turisteczbackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Filtros_user {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "filtro_id")
    private Filtro filtro;

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

    public Filtro getFiltro() {
       return filtro;
    }

    public void setFiltro(Filtro filtro) {
       this.filtro = filtro;
    }
}
