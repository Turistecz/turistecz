package org.turistecz.turisteczbackend.controller;

import java.lang.reflect.Array;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.turistecz.turisteczbackend.dto.FiltrosUserDto;
import org.turistecz.turisteczbackend.model.Filtro;
import org.turistecz.turisteczbackend.model.Filtros_user;
import org.turistecz.turisteczbackend.model.Usuario;
import org.turistecz.turisteczbackend.service.FiltroService;


@RestController
@RequestMapping("/api/filtros")
public class FiltroController {
    
    @Autowired
    private FiltroService filtroService;

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping
    public List<Filtro> listFiltros() {
        return filtroService.buscarTodosFiltros();
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