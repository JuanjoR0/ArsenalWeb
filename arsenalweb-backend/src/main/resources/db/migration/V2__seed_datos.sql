-- ===== CATEGORÍAS (idempotente por nombre) =====
MERGE INTO categorias (nombre, descripcion) KEY(nombre) VALUES
('Pistolas','Armas cortas de colección'),
('Rifles','Rifles icónicos');

-- ===== ARMAS (idempotente: inserta solo si no existe arma con ese nombre) =====
INSERT INTO armas (nombre, descripcion, precio, stock, imagen_url, categoria_id)
SELECT 'Desert Eagle (CS)', 'Pistola clásica de Counter-Strike', 399.99, 10, NULL, c.id
FROM categorias c
WHERE c.nombre = 'Pistolas'
  AND NOT EXISTS (SELECT 1 FROM armas a WHERE a.nombre = 'Desert Eagle (CS)');

INSERT INTO armas (nombre, descripcion, precio, stock, imagen_url, categoria_id)
SELECT 'AK-47 (CS)', 'Rifle de asalto soviético icónico', 599.99, 5, NULL, c.id
FROM categorias c
WHERE c.nombre = 'Rifles'
  AND NOT EXISTS (SELECT 1 FROM armas a WHERE a.nombre = 'AK-47 (CS)');
