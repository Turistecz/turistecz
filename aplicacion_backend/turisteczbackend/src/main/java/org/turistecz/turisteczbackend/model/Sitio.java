package org.turistecz.turisteczbackend.model;

import jakarta.persistence.*;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Sitio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 255)
    private String nombre;

    @Column(length = 255)
    private String direccion;

    @Column
    private Double longitud;

    @Column
    private Double latitud;

    @Column(length = 255)
    private String horario_visita;

    @Column(length = 50)
    private String telefono;

    @Column(length = 255)
    private String enlace_web;

    @Column
    private Boolean rampas;

    @Column
    private Boolean ascensores;

    @Column
    private Boolean puertas_automaticas;

    @Column
    private Boolean escaleras_mecanicas;

    @Column
    private Boolean visitable;

    @Column
    private Boolean acceso_perros_guias;

    @Column
    private Boolean servicios;

    @Column
    private Boolean servicios_adaptados;

    @Column
    private Boolean escalones;

    @Column
    private Boolean braille;

    @Column
    private Boolean interprete_lengua_signos;

    @Column
    private Boolean videos_subtitulos;

    @Column
    private Boolean ayudas_visuales;

    @Column
    private Boolean servicios_hombres_cambiador;

    @Column
    private Boolean servicios_mujeres_cambiador;

    @Column
    private Boolean sala_lactancia;

    @Column
    private Boolean guias_turisticos_multiidioma;

    @Column
    private Boolean elementos_audiovisuales_multiidioma;

    @Column
    private Boolean documentacion_multiidioma;

    @Column
    private Boolean visitas_grupales;
  
    @JsonManagedReference
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "sitio", cascade = CascadeType.ALL)
    private List<Imagen_sitio> imagenes;

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

    public String getDireccion() {
      return direccion;
    }

    public void setDireccion(String direccion) {
      this.direccion = direccion;
    }

    public Double getLongitud() {
      return longitud;
    }

    public void setLongitud(Double longitud) {
      this.longitud = longitud;
    }

    public Double getLatitud() {
      return latitud;
    }

    public void setLatitud(Double latitud) {
      this.latitud = latitud;
    }

    public String getHorario_visita() {
      return horario_visita;
    }

    public void setHorario_visita(String horario_visita) {
      this.horario_visita = horario_visita;
    }

    public String getTelefono() {
      return telefono;
    }

    public void setTelefono(String telefono) {
      this.telefono = telefono;
    }

    public String getEnlace_web() {
      return enlace_web;
    }

    public void setEnlace_web(String enlace_web) {
      this.enlace_web = enlace_web;
    }

    public Boolean getRampas() {
      return rampas;
    }

    public void setRampas(Boolean rampas) {
      this.rampas = rampas;
    }

    public Boolean getAscensores() {
      return ascensores;
    }

    public void setAscensores(Boolean ascensores) {
      this.ascensores = ascensores;
    }

    public Boolean getPuertas_automaticas() {
      return puertas_automaticas;
    }

    public void setPuertas_automaticas(Boolean puertas_automaticas) {
      this.puertas_automaticas = puertas_automaticas;
    }

    public Boolean getEscaleras_mecanicas() {
      return escaleras_mecanicas;
    }

    public void setEscaleras_mecanicas(Boolean escaleras_mecanicas) {
      this.escaleras_mecanicas = escaleras_mecanicas;
    }

    public Boolean getVisitable() {
      return visitable;
    }

    public void setVisitable(Boolean visitable) {
      this.visitable = visitable;
    }

    public Boolean getAcceso_perros_guias() {
      return acceso_perros_guias;
    }

    public void setAcceso_perros_guias(Boolean acceso_perros_guias) {
      this.acceso_perros_guias = acceso_perros_guias;
    }

    public Boolean getServicios() {
      return servicios;
    }

    public void setServicios(Boolean servicios) {
      this.servicios = servicios;
    }

    public Boolean getServicios_adaptados() {
      return servicios_adaptados;
    }

    public void setServicios_adaptados(Boolean servicios_adaptados) {
      this.servicios_adaptados = servicios_adaptados;
    }

    public Boolean getEscalones() {
      return escalones;
    }

    public void setEscalones(Boolean escalones) {
      this.escalones = escalones;
    }

    public Boolean getBraille() {
      return braille;
    }

    public void setBraille(Boolean braille) {
      this.braille = braille;
    }

    public Boolean getInterprete_lengua_signos() {
      return interprete_lengua_signos;
    }

    public void setInterprete_lengua_signos(Boolean interprete_lengua_signos) {
      this.interprete_lengua_signos = interprete_lengua_signos;
    }

    public Boolean getVideos_subtitulos() {
      return videos_subtitulos;
    }

    public void setVideos_subtitulos(Boolean videos_subtitulos) {
      this.videos_subtitulos = videos_subtitulos;
    }

    public Boolean getAyudas_visuales() {
      return ayudas_visuales;
    }

    public void setAyudas_visuales(Boolean ayudas_visuales) {
      this.ayudas_visuales = ayudas_visuales;
    }

    public Boolean getServicios_hombres_cambiador() {
      return servicios_hombres_cambiador;
    }

    public void setServicios_hombres_cambiador(Boolean servicios_hombres_cambiador) {
      this.servicios_hombres_cambiador = servicios_hombres_cambiador;
    }

    public Boolean getServicios_mujeres_cambiador() {
      return servicios_mujeres_cambiador;
    }

    public void setServicios_mujeres_cambiador(Boolean servicios_mujeres_cambiador) {
      this.servicios_mujeres_cambiador = servicios_mujeres_cambiador;
    }

    public Boolean getSala_lactancia() {
      return sala_lactancia;
    }

    public void setSala_lactancia(Boolean sala_lactancia) {
      this.sala_lactancia = sala_lactancia;
    }

    public Boolean getGuias_turisticos_multiidioma() {
      return guias_turisticos_multiidioma;
    }

    public void setGuias_turisticos_multiidioma(Boolean guias_turisticos_multiidioma) {
      this.guias_turisticos_multiidioma = guias_turisticos_multiidioma;
    }

    public Boolean getElementos_audiovisuales_multiidioma() {
      return elementos_audiovisuales_multiidioma;
    }

    public void setElementos_audiovisuales_multiidioma(Boolean elementos_audiovisuales_multiidioma) {
      this.elementos_audiovisuales_multiidioma = elementos_audiovisuales_multiidioma;
    }

    public Boolean getDocumentacion_multiidioma() {
      return documentacion_multiidioma;
    }

    public void setDocumentacion_multiidioma(Boolean documentacion_multiidioma) {
      this.documentacion_multiidioma = documentacion_multiidioma;
    }

    public Boolean getVisitas_grupales() {
      return visitas_grupales;
    }

    public void setVisitas_grupales(Boolean visitas_grupales) {
      this.visitas_grupales = visitas_grupales;
    }

    public List<Imagen_sitio> getImagenes() {
      return imagenes;
    }
    
}