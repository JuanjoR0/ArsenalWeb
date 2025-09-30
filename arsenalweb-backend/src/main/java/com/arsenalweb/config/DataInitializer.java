// src/main/java/com/arsenalweb/config/DataInitializer.java
package com.arsenalweb.config;

import com.arsenalweb.model.Rol;
import com.arsenalweb.model.Usuario;
import com.arsenalweb.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initAdmin(UsuarioRepository usuarioRepository) {
        return args -> {
            String adminEmail = "admin@arsenalweb.com";

            Usuario admin = usuarioRepository.findByEmail(adminEmail)
                    .orElseGet(Usuario::new);

            admin.setEmail(adminEmail);
            admin.setUsername("admin");
            admin.setPassword("1234"); // <-- TEXTO PLANO
            admin.setRol(Rol.ADMIN);

            usuarioRepository.save(admin);

            System.out.println("♻️ Admin preparado: " + adminEmail + " / 1234");
        };
    }
}
