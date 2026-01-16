package org.turistecz.turisteczbackend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.turistecz.turisteczbackend.model.SitiosRutaUsuarioView;
import org.turistecz.turisteczbackend.repository.SitiosRutaUsuarioViewRepository;

@Service
public class SitiosRutaUsuarioViewService {
  @Autowired
  SitiosRutaUsuarioViewRepository sitiosRutaUsuarioViewRepository;

  public List<SitiosRutaUsuarioView> mostrarSitiosRutaUsuarioPorId(){
    return sitiosRutaUsuarioViewRepository.buscarPorIdRuta();
  }
}
