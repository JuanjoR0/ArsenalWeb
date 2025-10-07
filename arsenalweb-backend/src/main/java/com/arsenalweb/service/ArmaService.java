package com.arsenalweb.service;

import com.arsenalweb.model.Arma;
import com.arsenalweb.repository.ArmaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ArmaService {

    private final ArmaRepository armaRepository;

    public ArmaService(ArmaRepository armaRepository) {
        this.armaRepository = armaRepository;
    }

    public List<Arma> findAll() {
        return armaRepository.findAll();
    }

    public Arma save(Arma arma) {
        return armaRepository.save(arma);
    }

    public Optional<Arma> update(Long id, Arma armaData) {
        return armaRepository.findById(id).map(arma -> {
            arma.setNombre(armaData.getNombre());
            arma.setDescripcion(armaData.getDescripcion());
            arma.setPrecio(armaData.getPrecio());
            arma.setCategoria(armaData.getCategoria());
            return armaRepository.save(arma);
        });
    }

    public boolean delete(Long id) {
        if (armaRepository.existsById(id)) {
            armaRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
