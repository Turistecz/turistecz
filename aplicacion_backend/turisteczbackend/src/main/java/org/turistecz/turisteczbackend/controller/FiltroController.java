package org.turistecz.turisteczbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.turistecz.turisteczbackend.model.Filtro;
import org.turistecz.turisteczbackend.service.FiltroService;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/filtros")
public class FiltroController {
    
    @Autowired
    private FiltroService filtroService;

    @GetMapping
    public List<Filtro> listFiltros() {
        return filtroService.buscarTodosFiltros();
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<Filtro> getFilter(@PathVariable int id) {
        Filtro filtro = filtroService.getFiltroById(id);
        return ResponseEntity.ok(filtro);
    }
    

    @PostMapping
    public ResponseEntity<Filtro> addNewFilter(@RequestBody Filtro filter) {
    Filtro saved = filtroService.addNewFiltro(filter);
    return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeFiltro(
            @PathVariable int id
    ) {
        filtroService.removeFiltro(id);
        return ResponseEntity.noContent().build();
    }
    
}