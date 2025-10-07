-- Crear tabla accesorios
CREATE TABLE accesorios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    imagen VARCHAR(255)
);

-- Insertar accesorios de ejemplo
INSERT INTO accesorios (nombre, tipo, descripcion, precio, imagen) VALUES
('Mira Holográfica', 'Mira', 'Mira de punto rojo para mejor precisión en distancias cortas', 120.00, '/assets/MiraHolografica.webp'),
('Mira ACOG', 'Mira', 'Mira telescópica de 4x aumentos', 300.00, '/assets/miraACOG.jpg'),
('Culata Ajustable', 'Culata', 'Culata retráctil para mejorar estabilidad en disparo', 150.00, '/assets/culataAjustable.webp'),
('Culata Táctica', 'Culata', 'Culata ergonómica para rifles de asalto', 200.00, '/assets/culataTactica.jpg'),
('Munición Perforante', 'Munición', 'Cartuchos diseñados para atravesar blindajes ligeros', 80.00, '/assets/municion1.webp'),
('Munición Expansiva', 'Munición', 'Balas que se expanden al impactar, causando mayor daño', 90.00, '/assets/municion2.png'),
('Empuñadura Vertical', 'Empuñadura', 'Empuñadura para mejorar el control del retroceso', 70.00, '/assets/empuñaduraVertical.jpg'),
('Empuñadura Angulada', 'Empuñadura', 'Empuñadura ligera que facilita disparos rápidos', 65.00, '/assets/empuñaduraAngular.jpg'),
('Cañón Largo', 'Cañón', 'Cañón extendido para mejorar precisión y alcance', 250.00, '/assets/cañon-largo.jpeg'),
('Silenciador', 'Silenciador', 'Reduce el ruido y el fogonazo del disparo', 180.00, '/assets/silenciador.jpg');
