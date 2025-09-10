package org.turistecz.turisteczbackend.model;


import jakarta.persistence.*;
import java.util.Objects;


@Entity
@Table(name = "usuario")
public class Usuario {


@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Integer id;


@Column(nullable = false, unique = true)
private String email;


@Column(nullable = false)
private String password;


@Column(nullable = false)
private boolean activo = false;


private String nombre;


public Usuario() {}


public Usuario(String email, String password, String nombre) {
this.email = email;
this.password = password;
this.nombre = nombre;
this.activo = false;
}


public Integer getId() { return id; }
public void setId(Integer id) { this.id = id; }


public String getEmail() { return email; }
public void setEmail(String email) { this.email = email; }


public String getPassword() { return password; }
public void setPassword(String password) { this.password = password; }


public boolean isActivo() { return activo; }
public void setActivo(boolean activo) { this.activo = activo; }


public String getNombre() { return nombre; }
public void setNombre(String nombre) { this.nombre = nombre; }


@Override
public boolean equals(Object o) {
if (this == o) return true;
if (!(o instanceof Usuario)) return false;
Usuario usuario = (Usuario) o;
return Objects.equals(id, usuario.id);
}


@Override
public int hashCode() { return Objects.hash(id); }
}