package com.arsenalweb.service;

import com.arsenalweb.model.Accesorio;
import com.arsenalweb.repository.AccesorioRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class AccesorioService {

    private final AccesorioRepository accesorioRepository;

    public AccesorioService(AccesorioRepository accesorioRepository) {
        this.accesorioRepository = accesorioRepository;
    }

    public Page<Accesorio> listarAccesorios(String nombre, String tipo, Pageable pageable) {
        if (nombre != null && !nombre.isEmpty() && tipo != null && !tipo.isEmpty()) {
            return accesorioRepository.findByNombreContainingIgnoreCaseAndTipoIgnoreCase(nombre, tipo, pageable);
        } else if (nombre != null && !nombre.isEmpty()) {
            return accesorioRepository.findByNombreContainingIgnoreCase(nombre, pageable);
        } else if (tipo != null && !tipo.isEmpty()) {
            return accesorioRepository.findByTipoIgnoreCase(tipo, pageable);
        } else {
            return accesorioRepository.findAll(pageable);
        }
    }
}
