-- Crear tabla usuarios
CREATE TABLE usuarios (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    rol VARCHAR(20) NOT NULL
);

-- Insertar administrador
INSERT INTO usuarios (username, password, email, rol)
VALUES (
    'admin',
    '$2a$10$7QbnNUQv1w5HSkA4Yd6t8O9hTzqgOQnZh6oN6j5c0hV7Xv8v1X2zK', -- 1234 en BCrypt
    'admin@arsenalweb.com',
    'ADMIN'
);

-- Insertar usuario normal de prueba
INSERT INTO usuarios (username, password, email, rol)
VALUES (
    'usuario1',
    '$2a$10$7QbnNUQv1w5HSkA4Yd6t8O9hTzqgOQnZh6oN6j5c0hV7Xv8v1X2zK', -- 1234 en BCrypt
    'usuario1@arsenalweb.com',
    'USER'
);
