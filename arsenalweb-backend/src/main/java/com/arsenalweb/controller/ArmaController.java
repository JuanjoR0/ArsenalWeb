package com.arsenalweb.controller;

import com.arsenalweb.dto.ArmaDTO;
import com.arsenalweb.model.Arma;
import com.arsenalweb.model.Categoria;
import com.arsenalweb.repository.ArmaRepository;
import com.arsenalweb.repository.CategoriaRepository;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/armas")
@CrossOrigin(origins = "http://localhost:4200")
public class ArmaController {

    private final ArmaRepository armaRepo;
    private final CategoriaRepository categoriaRepo;

    public ArmaController(ArmaRepository armaRepo, CategoriaRepository categoriaRepo) {
        this.armaRepo = armaRepo;
        this.categoriaRepo = categoriaRepo;
    }

    // ====== READ con paginación y filtros ======
    @GetMapping
    public ResponseEntity<?> listar(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size,
            @RequestParam(required = false) String nombre,
            @RequestParam(required = false) String categoria
    ) {
        Pageable pageable = PageRequest.of(page, size);

        Page<Arma> pageArmas;

        if (nombre != null && categoria != null) {
            pageArmas = armaRepo.findByNombreContainingIgnoreCaseAndCategoria_NombreIgnoreCase(nombre, categoria, pageable);
        } else if (nombre != null) {
            pageArmas = armaRepo.findByNombreContainingIgnoreCase(nombre, pageable);
        } else if (categoria != null) {
            pageArmas = armaRepo.findByCategoria_NombreIgnoreCase(categoria, pageable);
        } else {
            pageArmas = armaRepo.findAll(pageable);
        }

        Page<ArmaDTO> pageDto = pageArmas.map(this::toDTO);
        return ResponseEntity.ok(pageDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArmaDTO> porId(@PathVariable Long id) {
        return armaRepo.findById(id)
                .map(a -> ResponseEntity.ok(toDTO(a)))
                .orElse(ResponseEntity.notFound().build());
    }

    // ====== CREATE ======
    @PostMapping
    public ResponseEntity<ArmaDTO> crear(@Valid @RequestBody ArmaDTO dto) {
        Categoria c = categoriaRepo.findById(dto.categoriaId()).orElseThrow();
        Arma arma = armaRepo.save(toEntity(dto, c));
        return ResponseEntity.created(URI.create("/api/armas/" + arma.getId()))
                .body(toDTO(arma));
    }

    // ====== UPDATE ======
    @PutMapping("/{id}")
    public ResponseEntity<ArmaDTO> actualizar(@PathVariable Long id, @Valid @RequestBody ArmaDTO dto) {
        return armaRepo.findById(id).map(existing -> {
            Categoria c = categoriaRepo.findById(dto.categoriaId()).orElseThrow();
            existing.setNombre(dto.nombre());
            existing.setDescripcion(dto.descripcion());
            existing.setPrecio(dto.precio());
            existing.setStock(dto.stock());
            existing.setImagenUrl(dto.imagenUrl());
            existing.setCategoria(c);
            // stats 0..100
            existing.setAlcance(dto.alcance());
            existing.setDanio(dto.danio());
            existing.setPrecision(dto.precision());
            return ResponseEntity.ok(toDTO(armaRepo.save(existing)));
        }).orElse(ResponseEntity.notFound().build());
    }

    // ====== DELETE ======
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (!armaRepo.existsById(id)) return ResponseEntity.notFound().build();
        armaRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // ====== MAPPERS ======
    private ArmaDTO toDTO(Arma a) {
        return new ArmaDTO(
                a.getId(),
                a.getNombre(),
                a.getDescripcion(),
                a.getPrecio(),
                a.getStock(),
                a.getImagenUrl(),
                a.getCategoria().getId(),
                a.getCategoria().getNombre(),
                a.getAlcance(),
                a.getDanio(),
                a.getPrecision()
        );
    }

    private Arma toEntity(ArmaDTO dto, Categoria c) {
        Arma arma = new Arma();
        arma.setNombre(dto.nombre());
        arma.setDescripcion(dto.descripcion());
        arma.setPrecio(dto.precio());
        arma.setStock(dto.stock());
        arma.setImagenUrl(dto.imagenUrl());
        arma.setCategoria(c);
        arma.setAlcance(dto.alcance());
        arma.setDanio(dto.danio());
        arma.setPrecision(dto.precision());
        return arma;
    }
}
