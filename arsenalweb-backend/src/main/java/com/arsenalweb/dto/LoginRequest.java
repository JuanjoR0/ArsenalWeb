package com.arsenalweb.dto;

public class LoginRequest {
    private String email;
    private String password;

    // Constructor vacío (Spring lo necesita)
    public LoginRequest() {}

    // Constructor rápido (por si quieres usarlo)
    public LoginRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

    // Getters y Setters
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
}
