package org.turistecz.turisteczbackend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="v_sitios_ruta_usuario")
@Data
@NoArgsConstructor
public class SitiosRutaUsuarioView {
  @Id
  @Column(name="id")
  private Integer id;

  @Column(name="id_ruta")
  private Integer idRuta;

  @Column(name="id_sitio")
  private Integer idSitio;

  @Column(name="nombre")
  private String nombre;
}
