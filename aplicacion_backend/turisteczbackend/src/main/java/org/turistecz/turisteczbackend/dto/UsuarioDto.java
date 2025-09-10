package org.turistecz.turisteczbackend.dto;

public class UsuarioDto {
    private String email;
    private String contrasena;  // 🔹 cambiado de "password" a "contrasena"
    private String nombre;

    public UsuarioDto() {}

    public String getEmail() { 
        return email; 
    }
    public void setEmail(String email) { 
        this.email = email; 
    }

    public String getContrasena() { 
        return contrasena; 
    }
    public void setContrasena(String contrasena) { 
        this.contrasena = contrasena; 
    }

    public String getNombre() { 
        return nombre; 
    }
    public void setNombre(String nombre) { 
        this.nombre = nombre; 
    }
}
