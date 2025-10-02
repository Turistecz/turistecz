package org.turistecz.turisteczbackend.dto;

import org.turistecz.turisteczbackend.model.RutaUsuario;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RutaUsuarioDto {

    private Integer id_usuario;
    private String titulo_ruta;
    private String descripcion_ruta;

    public RutaUsuarioDto(RutaUsuario ruta) {
        this.id_usuario = ruta.getUsuario().getId();
        this.titulo_ruta = ruta.getTitulo_ruta();
        this.descripcion_ruta = ruta.getDescripcion_ruta();
    }
}
