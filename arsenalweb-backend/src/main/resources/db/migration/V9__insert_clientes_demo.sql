-- Insertar usuarios de prueba solo si no existen
INSERT INTO usuarios (username, email, password, rol)
SELECT 'Cliente1', 'cliente1@arsenalweb.com', '1234', 'USER'
WHERE NOT EXISTS (SELECT 1 FROM usuarios WHERE email = 'cliente1@arsenalweb.com');

INSERT INTO usuarios (username, email, password, rol)
SELECT 'Cliente2', 'cliente2@arsenalweb.com', '1234', 'USER'
WHERE NOT EXISTS (SELECT 1 FROM usuarios WHERE email = 'cliente2@arsenalweb.com');
