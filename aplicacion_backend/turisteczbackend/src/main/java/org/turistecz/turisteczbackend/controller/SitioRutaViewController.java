package org.turistecz.turisteczbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.turistecz.turisteczbackend.model.SitioRutaView;
import org.turistecz.turisteczbackend.service.SitioRutaViewService;

@RestController
@RequestMapping("/api")
public class SitioRutaViewController {

    @Autowired	   
    private SitioRutaViewService sitioRutaViewService;

    @GetMapping("/sitiosRutaID")
    public List<SitioRutaView> getById(@RequestParam Integer id) {
        return sitioRutaViewService.buscarSitiosRutaPorId(id);
    }
}
