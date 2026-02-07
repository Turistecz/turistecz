package org.turistecz.turisteczbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.turistecz.turisteczbackend.model.SitiosRutaUsuarioView;
import org.turistecz.turisteczbackend.service.SitiosRutaUsuarioViewService;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/auth")
public class SitiosRutaUsuarioViewController {
  @Autowired
  private SitiosRutaUsuarioViewService sitiosRutaUsuarioViewService;

  @GetMapping("/sitiosRutaUsuario")
  public List<SitiosRutaUsuarioView> getAll(){
    return sitiosRutaUsuarioViewService.mostrarSitiosRutaUsuarioPorId();
  }
}
