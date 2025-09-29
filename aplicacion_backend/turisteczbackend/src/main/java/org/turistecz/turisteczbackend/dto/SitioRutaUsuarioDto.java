package org.turistecz.turisteczbackend.dto;

import org.turistecz.turisteczbackend.model.SitiosRutaUsuario;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SitioRutaUsuarioDto {
    
    private Integer id_ruta;
    private Integer id_sitio_fav;

    public SitioRutaUsuarioDto(SitiosRutaUsuario sitio) {
        this.id_ruta = sitio.getId_ruta();
        this.id_sitio_fav = sitio.getId_sitio_fav();
    };
}
