package org.turistecz.turisteczbackend.dto;

import org.turistecz.turisteczbackend.model.SitiosRutaUsuario;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SitioRutaUsuarioDto {
    
    private Integer id_ruta;
    private Integer id_favoritos;

    public SitioRutaUsuarioDto(SitiosRutaUsuario sitio) {
        this.id_ruta = sitio.getRutaUsuario().getId();
        this.id_favoritos = sitio.getFavoritos().getId();
    };
}
