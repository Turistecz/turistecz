package org.turistecz.turisteczbackend.model;

import jakarta.persistence.*;

import java.util.List;


import com.fasterxml.jackson.annotation.JsonManagedReference;

//Este tipo de clases representan a una entidad del modelo de datos. 
//Se corresponden con alguna tabla de la BBDD, de nombre homonimo
@Entity
public class Sitio {

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
    @Enumerated(EnumType.STRING)
    private EnumServiciosAdaptabilidad rampas;

    @Column
    @Enumerated(EnumType.STRING)
    private EnumServiciosAdaptabilidad ascensores;

    @Column
    @Enumerated(EnumType.STRING)
    private EnumServiciosAdaptabilidad puertas_automaticas;

    @Column
    @Enumerated(EnumType.STRING)
    private EnumServiciosAdaptabilidad escaleras_mecanicas;

    @Column
    @Enumerated(EnumType.STRING)
    private EnumServiciosAdaptabilidad acceso_perros_guias;

    @Column
    @Enumerated(EnumType.STRING)
    private EnumServiciosAdaptabilidad acceso_perros_asistencia;

    @Column
    @Enumerated(EnumType.STRING)
    private EnumServiciosAdaptabilidad servicios_adaptados;

    @Column
    @Enumerated(EnumType.STRING)
    private EnumServiciosAdaptabilidad braille;

    @Column
    @Enumerated(EnumType.STRING)
    private EnumServiciosAdaptabilidad interprete_lengua_signos;

    @Column
    @Enumerated(EnumType.STRING)
    private EnumServiciosAdaptabilidad videos_subtitulos;

    @Column
    @Enumerated(EnumType.STRING)
    private EnumServiciosAdaptabilidad ayudas_visuales;

    @Column
    @Enumerated(EnumType.STRING)
    private EnumServiciosAdaptabilidad cambiador;

    @Column
    @Enumerated(EnumType.STRING)
    private EnumServiciosAdaptabilidad sala_lactancia;

    @Column
    @Enumerated(EnumType.STRING)
    private EnumServiciosAdaptabilidad guias_turisticos_multiidioma;

    @Column
    @Enumerated(EnumType.STRING)
    private EnumServiciosAdaptabilidad elementos_audiovisuales_multiidioma;

    @Column
    @Enumerated(EnumType.STRING)
    private EnumServiciosAdaptabilidad documentacion_multiidioma;

    @Column
    @Enumerated(EnumType.STRING)
    private EnumServiciosAdaptabilidad visitas_grupales;

    @Column
    @Enumerated(EnumType.STRING)
    private EnumServiciosAdaptabilidad parking_adaptado;

    @Column
    @Enumerated(EnumType.STRING)
    private EnumServiciosAdaptabilidad bancos;

    @Column
    @Enumerated(EnumType.STRING)
    private EnumServiciosAdaptabilidad mostrador_adaptado;

    @Column
    @Enumerated(EnumType.STRING)
    private EnumServiciosAdaptabilidad ayuda_movilidad;

    @Column
    @Enumerated(EnumType.STRING)
    private EnumServiciosAdaptabilidad lenguaje_simple;

    @Column
    @Enumerated(EnumType.STRING)
    private EnumServiciosAdaptabilidad sin_barreras_arquitectonicas;
  
    //Este atributo es especial. No se corresponde exactamente con un campo de la 
    //tabla, sino que le decimos que un "sitio" de la tabla esta relacionado con una o 
    //varias Imagen_sitio(de la tabla correspondiente). Con la anotacion @OneToMany le 
    //indicamos la cardinalidad de la relacion que hay entre esta tabla y aquella con la 
    //que esta relacionada. Con el atributo "fetch = FetchType.LAZY" le indicamos que, 
    //cuando saque de la BBDD la informacion de esta clase, no es necesario que se traiga 
    //de primeras la informacion de las entidades asociadas (las Imagen_Sitio correspondientes),  
    //para agilizar la carga de datos.  Con la anotacion @JsonManagedReference le estamos 
    //diciendo que esta entidad es la importante de la relación, y que cuando tenga que 
    //mostrar la información de la entidad en formato JSON debe mostrar un campo más que
    //enseñe las "Imagen_Sitio" que están relacionados con este Sitio  
    @JsonManagedReference
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "sitio", cascade = CascadeType.ALL)
    private List<Imagen_sitio> imagenes;

    //Este atributo es especial. No se corresponde exactamente con un campo de la 
    //tabla, sino que le decimos que un "sitio" de la tabla esta relacionado con uno o 
    //varios Sitios_Ruta(de la tabla correspondiente). Con la anotacion @OneToMany le 
    //indicamos la cardinalidad de la relacion que hay entre esta tabla y aquella con la 
    //que esta relacionada. Con el atributo "fetch = FetchType.LAZY" le indicamos que, 
    //cuando saque de la BBDD la informacion de esta clase, no es necesario que se traiga 
    //de primeras la informacion de las entidades asociadas (las Imagen_Sitio correspondientes),  
    //para agilizar la carga de datos.  Con la anotacion @JsonManagedReference le estamos 
    //diciendo que esta entidad es la importante de la relación, y que cuando tenga que 
    //mostrar la información de la entidad en formato JSON debe mostrar un campo más que
    //enseñe los "Sitios_Ruta" que están relacionados con este Sitio 
    @JsonManagedReference
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "sitio", cascade = CascadeType.ALL)
    private List<SitiosRuta> sitios_ruta;

    
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

    public EnumServiciosAdaptabilidad getRampas() {
      return rampas;
    }

    public void setRampas(EnumServiciosAdaptabilidad rampas) {
      this.rampas = rampas;
    }

    public EnumServiciosAdaptabilidad getAscensores() {
      return ascensores;
    }

    public void setAscensores(EnumServiciosAdaptabilidad ascensores) {
      this.ascensores = ascensores;
    }

    public EnumServiciosAdaptabilidad getPuertas_automaticas() {
      return puertas_automaticas;
    }

    public void setPuertas_automaticas(EnumServiciosAdaptabilidad puertas_automaticas) {
      this.puertas_automaticas = puertas_automaticas;
    }

    public EnumServiciosAdaptabilidad getEscaleras_mecanicas() {
      return escaleras_mecanicas;
    }

    public void setEscaleras_mecanicas(EnumServiciosAdaptabilidad escaleras_mecanicas) {
      this.escaleras_mecanicas = escaleras_mecanicas;
    }
  
    public EnumServiciosAdaptabilidad getAcceso_perros_guias() {
      return acceso_perros_guias;
    }

    public void setAcceso_perros_guias(EnumServiciosAdaptabilidad acceso_perros_guias) {
      this.acceso_perros_guias = acceso_perros_guias;
    }

    public EnumServiciosAdaptabilidad getAcceso_perros_asistencia() {
      return acceso_perros_asistencia;
    }

    public void setAcceso_perros_asistencia(EnumServiciosAdaptabilidad acceso_perros_asistencia) {
      this.acceso_perros_asistencia = acceso_perros_asistencia;
    }

    public EnumServiciosAdaptabilidad getServicios_adaptados() {
      return servicios_adaptados;
    }

    public void setServicios_adaptados(EnumServiciosAdaptabilidad servicios_adaptados) {
      this.servicios_adaptados = servicios_adaptados;
    }

    public EnumServiciosAdaptabilidad getBraille() {
      return braille;
    }

    public void setBraille(EnumServiciosAdaptabilidad braille) {
      this.braille = braille;
    }

    public EnumServiciosAdaptabilidad getInterprete_lengua_signos() {
      return interprete_lengua_signos;
    }

    public void setInterprete_lengua_signos(EnumServiciosAdaptabilidad interprete_lengua_signos) {
      this.interprete_lengua_signos = interprete_lengua_signos;
    }

    public EnumServiciosAdaptabilidad getVideos_subtitulos() {
      return videos_subtitulos;
    }

    public void setVideos_subtitulos(EnumServiciosAdaptabilidad videos_subtitulos) {
      this.videos_subtitulos = videos_subtitulos;
    }

    public EnumServiciosAdaptabilidad getAyudas_visuales() {
      return ayudas_visuales;
    }

    public void setAyudas_visuales(EnumServiciosAdaptabilidad ayudas_visuales) {
      this.ayudas_visuales = ayudas_visuales;
    }

    public EnumServiciosAdaptabilidad getCambiador() {
      return cambiador;
    }

    public void setCambiador(EnumServiciosAdaptabilidad cambiador) {
      this.cambiador = cambiador;
    }
    
    public EnumServiciosAdaptabilidad getSala_lactancia() {
      return sala_lactancia;
    }

    public void setSala_lactancia(EnumServiciosAdaptabilidad sala_lactancia) {
      this.sala_lactancia = sala_lactancia;
    }

    public EnumServiciosAdaptabilidad getGuias_turisticos_multiidioma() {
      return guias_turisticos_multiidioma;
    }

    public void setGuias_turisticos_multiidioma(EnumServiciosAdaptabilidad guias_turisticos_multiidioma) {
      this.guias_turisticos_multiidioma = guias_turisticos_multiidioma;
    }

    public EnumServiciosAdaptabilidad getElementos_audiovisuales_multiidioma() {
      return elementos_audiovisuales_multiidioma;
    }

    public void setElementos_audiovisuales_multiidioma(EnumServiciosAdaptabilidad elementos_audiovisuales_multiidioma) {
      this.elementos_audiovisuales_multiidioma = elementos_audiovisuales_multiidioma;
    }

    public EnumServiciosAdaptabilidad getDocumentacion_multiidioma() {
      return documentacion_multiidioma;
    }

    public void setDocumentacion_multiidioma(EnumServiciosAdaptabilidad documentacion_multiidioma) {
      this.documentacion_multiidioma = documentacion_multiidioma;
    }

    public EnumServiciosAdaptabilidad getVisitas_grupales() {
      return visitas_grupales;
    }

    public void setVisitas_grupales(EnumServiciosAdaptabilidad visitas_grupales) {
      this.visitas_grupales = visitas_grupales;
    }

    public EnumServiciosAdaptabilidad getParking_adaptado() {
      return parking_adaptado;
    }

    public void setParking_adaptado(EnumServiciosAdaptabilidad parking_adaptado) {
      this.parking_adaptado = parking_adaptado;
    }

    public EnumServiciosAdaptabilidad getBancos() {
      return bancos;
    }

    public void setBancos(EnumServiciosAdaptabilidad bancos) {
      this.bancos = bancos;
    }

    public EnumServiciosAdaptabilidad getMostrador_adaptado() {
      return mostrador_adaptado;
    }
    
    public void setMostrador_adaptado(EnumServiciosAdaptabilidad mostrador_adaptado) {
      this.mostrador_adaptado = mostrador_adaptado;
    }

    public EnumServiciosAdaptabilidad getAyuda_movilidad() {
      return ayuda_movilidad;
    }

    public void setAyuda_movilidad(EnumServiciosAdaptabilidad ayuda_movilidad) {
      this.ayuda_movilidad = ayuda_movilidad;
    }

    public EnumServiciosAdaptabilidad getLenguaje_simple() {
      return lenguaje_simple;
    }

    public void setLenguaje_simple(EnumServiciosAdaptabilidad lenguaje_simple) {
      this.lenguaje_simple = lenguaje_simple;
    }

    public EnumServiciosAdaptabilidad getSin_barreras_arquitectonicas() {
      return sin_barreras_arquitectonicas;
    }

    public void setSin_barreras_arquitectonicas(EnumServiciosAdaptabilidad sin_barreras_arquitectonicas) {
      this.sin_barreras_arquitectonicas = sin_barreras_arquitectonicas;
    }

    public List<Imagen_sitio> getImagenes() {
      return imagenes;
    }

    public List<SitiosRuta> getSitios_ruta() {
      return sitios_ruta;
    }

    public void setSitios_ruta(List<SitiosRuta> sitios_ruta) {
      this.sitios_ruta = sitios_ruta;
    }

}