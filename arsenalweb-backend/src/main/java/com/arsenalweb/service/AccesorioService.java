package com.arsenalweb.service;

import com.arsenalweb.model.Accesorio;
import com.arsenalweb.repository.AccesorioRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccesorioService {

    private final AccesorioRepository accesorioRepository;

    public AccesorioService(AccesorioRepository accesorioRepository) {
        this.accesorioRepository = accesorioRepository;
    }

    // ✅ --- MÉTODO PARA CLIENTE (paginado con filtros) ---
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

    // ✅ --- MÉTODOS PARA ADMIN ---
    
    /** Obtener todos los accesorios (sin paginar, para panel admin) */
    public List<Accesorio> findAll() {
        return accesorioRepository.findAll();
    }

    /** Guardar nuevo accesorio */
    public Accesorio save(Accesorio accesorio) {
        return accesorioRepository.save(accesorio);
    }

    /** Actualizar accesorio existente */
    public Optional<Accesorio> update(Long id, Accesorio accesorioData) {
        return accesorioRepository.findById(id).map(acc -> {
            acc.setNombre(accesorioData.getNombre());
            acc.setDescripcion(accesorioData.getDescripcion());
            acc.setPrecio(accesorioData.getPrecio());
            acc.setTipo(accesorioData.getTipo());
            acc.setImagen(accesorioData.getImagen());
            return accesorioRepository.save(acc);
        });
    }

    /** Eliminar accesorio */
    public boolean delete(Long id) {
        if (accesorioRepository.existsById(id)) {
            accesorioRepository.deleteById(id);
            return true;
        }
        return false;
    }
    public List<Accesorio> buscarPorNombreOTipo(String termino) {
        return accesorioRepository.findByNombreContainingIgnoreCaseOrTipoContainingIgnoreCase(termino, termino);
    }

}
