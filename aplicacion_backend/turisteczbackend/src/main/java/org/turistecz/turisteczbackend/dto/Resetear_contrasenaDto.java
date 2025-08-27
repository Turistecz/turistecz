package org.turistecz.turisteczbackend.dto;

public class Resetear_contrasenaDto {
    private String nuevaContrasena;
    private String confirmarContrasena;

    public String getNuevaContrasena(){
        return nuevaContrasena;
    }

    public void setNuevaContrasena(String nuevaContrasena){
        this.nuevaContrasena = nuevaContrasena;

    }

    public String getConfirmarContrasena(String nuevaContrasena){
        return confirmarContrasena;
    }
    
     public void setConfirmarContrasena(String confirmarContrasena) {
        this.confirmarContrasena = confirmarContrasena;
    }
}
