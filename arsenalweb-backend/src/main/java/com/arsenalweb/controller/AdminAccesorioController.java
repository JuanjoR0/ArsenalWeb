package com.arsenalweb.controller;

import com.arsenalweb.model.Accesorio;
import com.arsenalweb.service.AccesorioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/accesorios")
@CrossOrigin(origins = "http://localhost:4200")
public class AdminAccesorioController {

    private final AccesorioService accesorioService;

    public AdminAccesorioController(AccesorioService accesorioService) {
        this.accesorioService = accesorioService;
    }

    // ✅ Listar accesorios
    @GetMapping
    public List<Accesorio> listarAccesorios() {
        return accesorioService.findAll();
    }

    // ✅ Crear accesorio
    @PostMapping
    public Accesorio crearAccesorio(@RequestBody Accesorio accesorio) {
        return accesorioService.save(accesorio);
    }

    // ✅ Actualizar accesorio
    @PutMapping("/{id}")
    public ResponseEntity<Accesorio> actualizarAccesorio(@PathVariable Long id, @RequestBody Accesorio accesorio) {
        return accesorioService.update(id, accesorio)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Eliminar accesorio
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarAccesorio(@PathVariable Long id) {
        if (accesorioService.delete(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
    // ✅ Buscar accesorios por nombre o tipo
    @GetMapping("/buscar")
    public List<Accesorio> buscarAccesorios(@RequestParam String termino) {
        return accesorioService.buscarPorNombreOTipo(termino);
    }

}
