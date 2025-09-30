package com.arsenalweb.controller;

import com.arsenalweb.dto.LoginRequest;
import com.arsenalweb.model.Usuario;
import com.arsenalweb.model.Rol;
import com.arsenalweb.repository.UsuarioRepository;
import com.arsenalweb.security.JwtUtil;
import com.arsenalweb.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * 🔑 LOGIN
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<Usuario> optionalUser = usuarioRepository.findByEmail(loginRequest.getEmail());

        if (optionalUser.isEmpty()) {
            return ResponseEntity
                    .status(400)
                    .body(Map.of("error", "El usuario no existe. Regístrate primero."));
        }

        Usuario u = optionalUser.get();

        // en /login
        if (!u.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(400).body(Map.of("error","Contraseña incorrecta."));
        }


        String jwt = jwtUtil.generateToken(u.getEmail());

        Map<String, Object> response = new HashMap<>();
        response.put("token", jwt);
        response.put("username", u.getUsername());
        response.put("email", u.getEmail());
        response.put("rol", u.getRol().name());

        return ResponseEntity.ok(response);
    }

    /**
     * 📝 REGISTER
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Usuario usuario) {
        if (usuarioRepository.findByUsername(usuario.getUsername()).isPresent()) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("error", "El usuario ya existe"));
        }

        if (usuarioRepository.findByEmail(usuario.getEmail()).isPresent()) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("error", "El email ya está registrado"));
        }

        usuario.setRol(Rol.USER);
        Usuario nuevoUsuario = usuarioService.saveUser(usuario);

        String jwt = jwtUtil.generateToken(nuevoUsuario.getEmail());

        Map<String, Object> response = new HashMap<>();
        response.put("token", jwt);
        response.put("username", nuevoUsuario.getUsername());
        response.put("rol", nuevoUsuario.getRol().name());

        return ResponseEntity.ok(response);
    }
}
