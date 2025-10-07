package com.arsenalweb.controller;

import com.arsenalweb.model.Accesorio;
import com.arsenalweb.service.AccesorioService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/accesorios")
public class AccesorioController {

    private final AccesorioService accesorioService;

    public AccesorioController(AccesorioService accesorioService) {
        this.accesorioService = accesorioService;
    }

    @GetMapping
    public Page<Accesorio> listarAccesorios(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size,
            @RequestParam(required = false) String nombre,
            @RequestParam(required = false) String tipo
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return accesorioService.listarAccesorios(nombre, tipo, pageable);
    }
}
