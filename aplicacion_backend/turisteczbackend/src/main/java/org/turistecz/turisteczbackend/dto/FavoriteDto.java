package org.turistecz.turisteczbackend.dto;

public class FavoriteDto {
    private int usuario_id;
    private int sitio_id;

    public FavoriteDto() {}

    public FavoriteDto(int usuario_id, int sitio_id) {
        this.usuario_id = usuario_id;
        this.sitio_id = sitio_id;
    }

    public int getUsuario_id() {
        return usuario_id;
    }

    public void setUsuario_id(int usuario_id) {
        this.usuario_id = usuario_id;
    }

    public int getSitio_id() {
        return sitio_id;
    }

    public void setSitio_id(int sitio_id) {
        this.sitio_id = sitio_id;
    }
}
