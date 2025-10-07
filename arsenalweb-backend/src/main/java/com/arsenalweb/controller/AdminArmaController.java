package com.arsenalweb.controller;

import com.arsenalweb.model.Arma;
import com.arsenalweb.service.ArmaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/armas")
public class AdminArmaController {

    private final ArmaService armaService;

    public AdminArmaController(ArmaService armaService) {
        this.armaService = armaService;
    }

    @GetMapping
    public List<Arma> listarArmas() {
        return armaService.findAll();
    }

    @PostMapping
    public Arma crearArma(@RequestBody Arma arma) {
        return armaService.save(arma);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Arma> actualizarArma(@PathVariable Long id, @RequestBody Arma arma) {
        return armaService.update(id, arma)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarArma(@PathVariable Long id) {
        if (armaService.delete(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
