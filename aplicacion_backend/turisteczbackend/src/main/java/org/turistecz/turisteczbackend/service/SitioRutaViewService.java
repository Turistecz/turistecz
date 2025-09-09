package org.turistecz.turisteczbackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.turistecz.turisteczbackend.model.SitioRutaView;
import org.turistecz.turisteczbackend.repository.SitioRutaViewRepository;

import java.util.List;

@Service
public class SitioRutaViewService {

@Autowired
private SitioRutaViewRepository sitioRutaViewRepository;

    
   public List<SitioRutaView> buscarSitiosRutaPorId(Integer id) {
         return sitioRutaViewRepository.encontrarSitiosPorIdRuta(id);
    }
}
