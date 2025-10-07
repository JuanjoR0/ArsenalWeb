package com.arsenalweb.dto;

import com.arsenalweb.model.Rol;

public class UsuarioDTO {
    private Long id;
    private String username;
    private String email;
    private Rol rol;
    private long pedidosCount;

    public UsuarioDTO() {}
    public UsuarioDTO(Long id, String username, String email, Rol rol, long pedidosCount) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.rol = rol;
        this.pedidosCount = pedidosCount;
    }

    public Long getId() { return id; }
    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public Rol getRol() { return rol; }
    public long getPedidosCount() { return pedidosCount; }

    public void setId(Long id) { this.id = id; }
    public void setUsername(String username) { this.username = username; }
    public void setEmail(String email) { this.email = email; }
    public void setRol(Rol rol) { this.rol = rol; }
    public void setPedidosCount(long pedidosCount) { this.pedidosCount = pedidosCount; }
}
