package org.turistecz.turisteczbackend.dto;

import org.turistecz.turisteczbackend.model.SitiosRutaUsuario;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SitioRutaUsuarioDto {
    
    private Integer id_ruta;
    private Integer id_sitio_favorito;
    private Integer orden;

    public SitioRutaUsuarioDto(SitiosRutaUsuario sitio) {
        this.id_ruta = sitio.getRutaUsuario().getId();
        this.id_sitio_favorito = sitio.getFavoritos().getId();
        this.orden = sitio.getOrden();
    };
}
