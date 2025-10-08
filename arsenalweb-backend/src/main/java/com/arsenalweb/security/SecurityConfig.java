package com.arsenalweb.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @SuppressWarnings("deprecation")
    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance(); // ⚠️ solo para desarrollo
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> {}) // ✅ permite llamadas desde Angular
            .csrf(csrf -> csrf.disable()) // ✅ desactiva CSRF
            .authorizeHttpRequests(auth -> auth
                // rutas abiertas para frontend Angular
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/armas/**").permitAll()
                .requestMatchers("/api/accesorios/**").permitAll()

                // rutas admin (abiertas temporalmente mientras desarrollas)
                .requestMatchers("/api/admin/**").permitAll()

                // consola H2
                .requestMatchers("/h2-console/**").permitAll()

                // todo lo demás
                .anyRequest().permitAll()
            )
            // ✅ permite que el H2 se renderice en navegador
            .headers(headers -> headers.frameOptions(frame -> frame.disable()));

        return http.build();
    }
}
