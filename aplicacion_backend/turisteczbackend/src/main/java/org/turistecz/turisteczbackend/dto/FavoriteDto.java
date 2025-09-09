package org.turistecz.turisteczbackend.dto;

public class FavoriteDto {
    private int usuarioId;
    private int sitioId;

    public FavoriteDto() {}

    public FavoriteDto(int usuarioId, int sitioId) {
        this.usuarioId = usuarioId;
        this.sitioId = sitioId;
    }

    public int getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(int usuarioId) {
        this.usuarioId = usuarioId;
    }

    public int getSitioId() {
        return sitioId;
    }

    public void setSitioId(int sitioId) {
        this.sitioId = sitioId;
    }
}
