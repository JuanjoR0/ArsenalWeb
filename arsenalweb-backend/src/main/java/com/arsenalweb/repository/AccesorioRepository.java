package com.arsenalweb.repository;
import java.util.List;
import com.arsenalweb.model.Accesorio;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccesorioRepository extends JpaRepository<Accesorio, Long> {
    Page<Accesorio> findByNombreContainingIgnoreCase(String nombre, Pageable pageable);
    Page<Accesorio> findByTipoIgnoreCase(String tipo, Pageable pageable);
    Page<Accesorio> findByNombreContainingIgnoreCaseAndTipoIgnoreCase(String nombre, String tipo, Pageable pageable);
    List<Accesorio> findByNombreContainingIgnoreCaseOrTipoContainingIgnoreCase(String nombre, String tipo);
}
