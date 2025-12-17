package org.turistecz.turisteczbackend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.turistecz.turisteczbackend.model.Filtro;
import org.turistecz.turisteczbackend.repository.FiltroRepository;

@Service
public class FiltroService {

    @Autowired
    FiltroRepository filtroRepository;

    public List<Filtro> buscarTodosFiltros() {
        return filtroRepository.findAll();
    }

    public Filtro getFiltroById(int id) {
        return filtroRepository.findById(id);
    }

    public Filtro addNewFiltro(Filtro filtro) {
        return filtroRepository.save(filtro);
    }

    public void removeFiltro(int id) {
        Filtro filtro = filtroRepository.findById(id);
            //.orElseThrow(() -> new RuntimeException("Favorito no encontrado"));
        filtroRepository.delete(filtro);
    }
    
}