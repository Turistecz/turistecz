package org.turistecz.turisteczbackend.dto;

public class FavoriteDto {
    private Integer usuarioId;
    private Integer sitioId;

    public FavoriteDto() {}

    public FavoriteDto(Integer usuarioid, Integer sitioid) {
        this.usuarioId = usuarioid;
        this.sitioId = sitioid;
    }

    public Integer getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Integer usuarioId) {
        this.usuarioId = usuarioId;
    }

    public Integer getSitioId() {
        return sitioId;
    }

    public void setSitioId(Integer sitioId) {
        this.sitioId = sitioId;
    }
}
