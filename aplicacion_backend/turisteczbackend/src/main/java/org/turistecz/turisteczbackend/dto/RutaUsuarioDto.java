package org.turistecz.turisteczbackend.dto;

import org.turistecz.turisteczbackend.model.RutaUsuario;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RutaUsuarioDto {

    private String titulo_ruta;

    // public String getTitulo_ruta() {
    //     return titulo_ruta;
    // }

    // public void setTitulo_ruta(String titulo_ruta) {
    //     this.titulo_ruta = titulo_ruta;
    // }

    public RutaUsuarioDto(RutaUsuario ruta) {
        this.titulo_ruta = ruta.getTitulo_ruta();
    }
}
