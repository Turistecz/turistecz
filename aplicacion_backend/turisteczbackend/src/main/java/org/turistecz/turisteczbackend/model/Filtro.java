package org.turistecz.turisteczbackend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Filtro {
    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column
    private Boolean museos_exposiciones;
    @Column
    private Boolean monumentos_esculturas;
    @Column
    private Boolean zonas_verdes;
    @Column
    private Boolean arquitectura;
    @Column
    private Boolean arte_mudejar;
    @Column
    private Boolean arte_romano;
    @Column
    private Boolean rampas;
    @Column
    private Boolean ascensores;
    @Column
    private Boolean puertas_automaticas;
    @Column
    private Boolean escaleras_mecanicas;
    @Column
    private Boolean servicios_adaptados;
    @Column
    private Boolean parking_adaptado;
    @Column
    private Boolean mostrador_adaptado;
    @Column
    private Boolean sin_barreras_arquitectonicas;
    @Column
    private Boolean braille;
    @Column
    private Boolean interprete_lengua_signos;
    @Column
    private Boolean videos_subtitulados;
    @Column
    private Boolean ayudas_visuales;
    @Column
    private Boolean bancos;
    @Column
    private Boolean ayuda_movilidad;
    @Column
    private Boolean lenguaje_simple;
    @Column
    private Boolean acceso_perros_guias;
    @Column
    private Boolean acceso_perros_asistencia;
    @Column
    private Boolean sala_lactancia;
    @Column
    private Boolean cambiador;
    @Column
    private Boolean visitas_grupales;
    @Column
    private Boolean guias_turisticos_multiidioma;
    @Column
    private Boolean elementos_audiovisuales_multiidioma;
    @Column
    private Boolean documentacion_multiidioma;

    public int getId() {
       return id;
    }

    public Boolean  getMuseosExposiciones() {
       return museos_exposiciones;
    }

    public Boolean  getMonumentosEsculturas() {
       return monumentos_esculturas;
    }

    public Boolean  getZonasVerdes() {
       return zonas_verdes;
    }

    public Boolean  getArquitectura() {
       return arquitectura;
    }

    public Boolean  getArteMudejar() {
       return arte_mudejar;
    }

    public Boolean  getArteRomano() {
       return arte_romano;
    }

    public Boolean  getRampas() {
       return rampas;
    }

    public Boolean  getAscensores() {
       return ascensores;
    }

    public Boolean  getPuertasAutomaticas() {
       return puertas_automaticas;
    }

    public Boolean  getEscalerasMecanicas() {
       return escaleras_mecanicas;
    }

    public Boolean  getServiciosAdaptados() {
       return servicios_adaptados;
    }

    public Boolean  getParkingAdaptado() {
       return parking_adaptado;
    }

    public Boolean  getMostradorAdaptado() {
       return mostrador_adaptado;
    }

    public Boolean  getSinBarrerasArquitectonicas() {
       return sin_barreras_arquitectonicas;
    }

    public Boolean  getBraille() {
       return braille;
    }

    public Boolean  getInterpreteLenguaSignos() {
       return interprete_lengua_signos;
    }

    public Boolean  getVideosSubtitulados() {
       return videos_subtitulados;
    }

    public Boolean  getAyudasVisuales() {
       return ayudas_visuales;
    }

    public Boolean  getBancos() {
       return bancos;
    }

    public Boolean  getAyudaMovilidad() {
       return ayuda_movilidad;
    }

    public Boolean  getLenguajeSimple() {
       return lenguaje_simple;
    }

    public Boolean  getAccesoPerrosGuias() {
       return acceso_perros_guias;
    }

    public Boolean  getAccesoPerrosAsistencia() {
       return acceso_perros_asistencia;
    }

    public Boolean  getSalaLactancia() {
       return sala_lactancia;
    }

    public Boolean  getCambiador() {
       return cambiador;
    }

    public Boolean  getVisitasGrupales() {
       return visitas_grupales;
    }

    public Boolean  getGuiasTuristicosMultiidioma() {
       return guias_turisticos_multiidioma;
    }

    public Boolean  getElementosAudiovisualesMultiidioma() {
       return elementos_audiovisuales_multiidioma;
    }

    public Boolean  getDocumentacionMultiidioma() {
       return documentacion_multiidioma;
    }


    public void setId(int id) {
       this.id = id;
    }

    public void  setMuseosExposiciones(Boolean museos_exposiciones) {
       this.museos_exposiciones = museos_exposiciones;
    }

    public void  setMonumentosEsculturas(Boolean monumentos_esculturas) {
       this.monumentos_esculturas = monumentos_esculturas;
    }

    public void  setZonasVerdes(Boolean zonas_verdes) {
       this.zonas_verdes = zonas_verdes;
    }

    public void  setArquitectura(Boolean arquitectura) {
       this.arquitectura = arquitectura;
    }

    public void  setArteMudejar(Boolean arte_mudejar) {
       this.arte_mudejar = arte_mudejar;
    }

    public void  setArteRomano(Boolean arte_romano) {
       this.arte_romano = arte_romano;
    }

    public void  setRampas(Boolean rampas) {
       this.rampas = rampas;
    }

    public void  setAscensores(Boolean ascensores) {
       this.ascensores = ascensores;
    }

    public void  setPuertasAutomaticas(Boolean puertas_automaticas) {
       this.puertas_automaticas = puertas_automaticas;
    }

    public void  setEscalerasMecanicas(Boolean escaleras_mecanicas) {
       this.escaleras_mecanicas = escaleras_mecanicas;
    }

    public void  setServiciosAdaptados(Boolean servicios_adaptados) {
       this.servicios_adaptados = servicios_adaptados;
    }

    public void  setParkingAdaptado(Boolean parking_adaptado) {
       this.parking_adaptado = parking_adaptado;
    }

    public void  setMostradorAdaptado(Boolean mostrador_adaptado) {
       this.mostrador_adaptado = mostrador_adaptado;
    }

    public void  setSinBarrerasArquitectonicas(Boolean sin_barreras_arquitectonicas) {
       this.sin_barreras_arquitectonicas = sin_barreras_arquitectonicas;
    }

    public void  setBraille(Boolean braille) {
       this.braille = braille;
    }

    public void  setInterpreteLenguaSignos(Boolean interprete_lengua_signos) {
       this.interprete_lengua_signos = interprete_lengua_signos;
    }

    public void  setVideosSubtitulados(Boolean videos_subtitulados) {
       this.videos_subtitulados = videos_subtitulados;
    }

    public void  setAyudasVisuales(Boolean ayudas_visuales) {
       this.ayudas_visuales = ayudas_visuales;
    }

    public void  setBancosAsientos(Boolean bancos) {
       this.bancos = bancos;
    }

    public void  setAyudaMovilidad(Boolean ayuda_movilidad) {
       this.ayuda_movilidad = ayuda_movilidad;
    }

    public void  setLenguajeSimple(Boolean lenguaje_simple) {
       this.lenguaje_simple = lenguaje_simple;
    }

    public void  setAccesoPerrosGuias(Boolean acceso_perros_guias) {
       this.acceso_perros_guias = acceso_perros_guias;
    }

    public void  setAccesoPerrosAsistencia(Boolean acceso_perros_asistencia) {
       this.acceso_perros_asistencia = acceso_perros_asistencia;
    }

    public void  setSalaLactancia(Boolean sala_lactancia) {
       this.sala_lactancia = sala_lactancia;
    }

    public void  setCambiador(Boolean cambiador) {
       this.cambiador = cambiador;
    }

    public void  setVisitasGrupales(Boolean visitas_grupales) {
       this.visitas_grupales = visitas_grupales;
    }

    public void  setGuiasTuristicosMultiidioma(Boolean guias_turisticos_multiidioma) {
       this.guias_turisticos_multiidioma = guias_turisticos_multiidioma;
    }

    public void  setElementosAudiovisualesMultiidioma(Boolean elementos_audiovisuales_multiidioma) {
       this.elementos_audiovisuales_multiidioma = elementos_audiovisuales_multiidioma;
    }

    public void  setDocumentacionMultiidioma(Boolean documentacion_multiidioma) {
       this.documentacion_multiidioma = documentacion_multiidioma;
    }

}