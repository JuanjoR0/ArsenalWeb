package com.arsenalweb.service;

import com.arsenalweb.model.Usuario;
import com.arsenalweb.model.Rol;
import com.arsenalweb.repository.UsuarioRepository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Optional<Usuario> findByEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }


    /**
     * Guardar un nuevo usuario en la base de datos
     */
   // src/main/java/com/arsenalweb/service/UsuarioService.java
// ...
    public Usuario saveUser(Usuario usuario) {
        if (usuario.getRol() == null) {
            usuario.setRol(Rol.USER);
        }
        // Guardar tal cual (proyecto de estudio)
        return usuarioRepository.save(usuario);
    }



    /**
     * Cargar un usuario para autenticación
     */
    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        Usuario u = usuarioRepository.findByEmail(login)
            .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + login));

        return org.springframework.security.core.userdetails.User
                .withUsername(u.getEmail()) // email como identificador
                .password("{noop}" + u.getPassword())
                .roles(u.getRol().name())
                .build();
    }



}
