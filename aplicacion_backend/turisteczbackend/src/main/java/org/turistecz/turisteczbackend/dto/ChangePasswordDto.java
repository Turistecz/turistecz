package org.turistecz.turisteczbackend.dto;

public class ChangePasswordDto {
    private String actualContrasena;
    private String nuevaContrasena;

    public String getActualContrasena() {
        return actualContrasena;
    }

    public void setActualContrasena(String actualContrasena) {
        this.actualContrasena = actualContrasena;
    }

    public String getNuevaContrasena() {
        return nuevaContrasena;
    }

    public void setNuevaContrasena(String nuevaContrasena) {
        this.nuevaContrasena = nuevaContrasena;
    }
}
