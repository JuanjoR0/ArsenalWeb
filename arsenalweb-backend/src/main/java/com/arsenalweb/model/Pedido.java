package com.arsenalweb.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "pedidos")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    private String estado; // "PENDIENTE" o "FINALIZADO"

    private LocalDateTime fecha;

    // 🔹 Constructor vacío obligatorio
    public Pedido() {}

    public Pedido(Usuario usuario, String estado, LocalDateTime fecha) {
        this.usuario = usuario;
        this.estado = estado;
        this.fecha = fecha;
    }

    // 🔹 Getters y setters
    public Long getId() {
        return id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }
}
