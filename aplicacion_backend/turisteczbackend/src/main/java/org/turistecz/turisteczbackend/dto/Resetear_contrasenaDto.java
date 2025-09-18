package org.turistecz.turisteczbackend.dto;

public class Resetear_contrasenaDto {
    private String nuevaContrasena;
    private String confirmarContrasena;

    public String getNuevaContrasena() {
        return nuevaContrasena;
    }

    public void setNuevaContrasena(String nuevaContrasena) {
        this.nuevaContrasena = nuevaContrasena;
    }

    // getter correcto SIN parámetros
    public String getConfirmarContrasena() {
        return confirmarContrasena;
    }

    public void setConfirmarContrasena(String confirmarContrasena) {
        this.confirmarContrasena = confirmarContrasena;
    }

    // método auxiliar opcional para validar igualdad y evitar NPE
    public boolean passwordsMatch() {
        if (nuevaContrasena == null) return confirmarContrasena == null;
        return nuevaContrasena.equals(confirmarContrasena);
    }
}
