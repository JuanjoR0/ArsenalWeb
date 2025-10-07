package com.arsenalweb.controller;

import com.arsenalweb.dto.UsuarioDTO;
import com.arsenalweb.model.Usuario;
import com.arsenalweb.repository.PedidoRepository;
import com.arsenalweb.repository.UsuarioRepository;
import com.arsenalweb.service.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/usuarios")
public class AdminUsuarioController {

    private final UsuarioService usuarioService;
    private final UsuarioRepository usuarioRepository;
    private final PedidoRepository pedidoRepository;

    public AdminUsuarioController(UsuarioService usuarioService,
                                  UsuarioRepository usuarioRepository,
                                  PedidoRepository pedidoRepository) {
        this.usuarioService = usuarioService;
        this.usuarioRepository = usuarioRepository;
        this.pedidoRepository = pedidoRepository;
    }

    // Listado
    @GetMapping
    public List<UsuarioDTO> listar() {
        return usuarioService.findAll().stream()
                .map(u -> new UsuarioDTO(
                        u.getId(),
                        u.getUsername(),
                        u.getEmail(),
                        u.getRol(),
                        pedidoRepository.countByUsuarioId(u.getId())
                ))
                .collect(Collectors.toList());
    }

    // Buscar por username/email
    @GetMapping("/buscar")
    public List<UsuarioDTO> buscar(@RequestParam String term) {
        return usuarioService.buscar(term).stream()
                .map(u -> new UsuarioDTO(
                        u.getId(),
                        u.getUsername(),
                        u.getEmail(),
                        u.getRol(),
                        pedidoRepository.countByUsuarioId(u.getId())
                ))
                .collect(Collectors.toList());
    }

    // Crear (para admin)
    @PostMapping("/crear")
    @ResponseStatus(HttpStatus.CREATED)
    public UsuarioDTO crear(@RequestBody Usuario body) {
        // validaciones simples
        usuarioRepository.findByEmail(body.getEmail()).ifPresent(u -> {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email ya registrado");
        });
        usuarioRepository.findByUsername(body.getUsername()).ifPresent(u -> {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username ya registrado");
        });

        Usuario saved = usuarioService.crear(body);
        long count = pedidoRepository.countByUsuarioId(saved.getId());
        return new UsuarioDTO(saved.getId(), saved.getUsername(), saved.getEmail(), saved.getRol(), count);
    }

    // Eliminar
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable Long id) {
        usuarioService.eliminar(id);
    }
}
