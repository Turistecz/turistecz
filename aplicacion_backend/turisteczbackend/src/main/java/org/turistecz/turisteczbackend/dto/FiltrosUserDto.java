package org.turistecz.turisteczbackend.dto;

public class FiltrosUserDto {
    private Integer usuarioId;
    private Integer filtroid;

    public FiltrosUserDto() {}

    public FiltrosUserDto(Integer usuarioid, Integer filtroid) {
        this.usuarioId = usuarioid;
        this.filtroid = filtroid;
    }

    public Integer getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Integer usuarioId) {
        this.usuarioId = usuarioId;
    }

    public Integer getFiltroId() {
        return filtroid;
    }

    public void setFiltroId(Integer filtroid) {
        this.filtroid = filtroid;
    }
}
