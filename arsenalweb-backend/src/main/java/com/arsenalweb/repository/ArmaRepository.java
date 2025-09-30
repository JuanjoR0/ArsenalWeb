package com.arsenalweb.repository;
import com.arsenalweb.model.Arma;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArmaRepository extends JpaRepository<Arma, Long> {
    Page<Arma> findByNombreContainingIgnoreCase(String nombre, Pageable pageable);
    Page<Arma> findByCategoria_NombreIgnoreCase(String categoria, Pageable pageable);
    Page<Arma> findByNombreContainingIgnoreCaseAndCategoria_NombreIgnoreCase(String nombre, String categoria, Pageable pageable);
}
