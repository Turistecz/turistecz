package org.turistecz.turisteczbackend.model;
import jakarta.persistence.*;

@Entity
public class Usuarios {
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @Column(length = 255)
    private String nombre;

    @Column(length = 255)
    private String apellido;

    @Column(length = 255)
    private String email;

    @Column(length = 255)
    private String contrasena;


}
