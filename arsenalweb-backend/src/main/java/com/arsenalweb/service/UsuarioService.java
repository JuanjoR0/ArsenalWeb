package com.arsenalweb.service;

import com.arsenalweb.model.Rol;
import com.arsenalweb.model.Usuario;
import com.arsenalweb.repository.UsuarioRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    // 🔹 Carga usuario para Spring Security (login + JWT)
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByEmail(username)
                .orElseGet(() -> usuarioRepository.findByUsername(username)
                        .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username))
                );

        return User.builder()
                .username(usuario.getEmail()) // se usa el email como principal en JWT
                .password(usuario.getPassword())
                .roles(usuario.getRol().name())
                .build();
    }

    // 🔹 Listar todos los usuarios
    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    // 🔹 Buscar usuarios por nombre o email
    public List<Usuario> buscar(String term) {
        return usuarioRepository
                .findByUsernameContainingIgnoreCaseOrEmailContainingIgnoreCase(term, term);
    }

    // 🔹 Crear nuevo usuario (desde panel admin)
    public Usuario crear(Usuario u) {
        if (u.getRol() == null) u.setRol(Rol.USER);
        // ⚠️ Usa NoOpPasswordEncoder por ahora (sin encriptar)
        return usuarioRepository.save(u);
    }

    // 🔹 Eliminar usuario por ID
    public void eliminar(Long id) {
        usuarioRepository.deleteById(id);
    }

    // 🔹 Guardar usuario (registro normal)
    public Usuario saveUser(Usuario usuario) {
        if (usuario.getRol() == null) {
            usuario.setRol(Rol.USER);
        }
        return usuarioRepository.save(usuario);
    }
}
