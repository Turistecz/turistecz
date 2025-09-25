package org.turistecz.turisteczbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.turistecz.turisteczbackend.model.Filtro;
import org.turistecz.turisteczbackend.service.FiltroService;


@RestController
@RequestMapping("/api")
public class FiltroController {
    
    @Autowired
    private FiltroService filtroService;

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/filtros")
    public List<Filtro> listFiltros() {
        return filtroService.buscarTodosFiltros();
    }
    
}