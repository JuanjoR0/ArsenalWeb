-- Normalización de categorías
UPDATE categorias SET nombre = 'Pistola' WHERE nombre = 'Pistolas';

MERGE INTO categorias (nombre, descripcion) KEY(nombre) VALUES
('Fusil de Asalto', 'Ráfagas y versatilidad'),
('Fusil de tirador', 'Media-larga distancia, precisión'),
('Escopeta', 'Corta distancia, gran daño'),
('Subfusil', 'Alta cadencia, corta distancia'),
('Pistola', 'Arma secundaria de apoyo'),
('Especial', 'Armas singulares')

;

-- Nuevas columnas de estadísticas 0-100 en armas
ALTER TABLE armas ADD COLUMN IF NOT EXISTS alcance INT;
ALTER TABLE armas ADD COLUMN IF NOT EXISTS danio INT;
ALTER TABLE armas ADD COLUMN IF NOT EXISTS precision INT;
ALTER TABLE armas ADD COLUMN IF NOT EXISTS precio_indice INT;

-- Límites (CHECK) para H2
ALTER TABLE armas ADD CONSTRAINT IF NOT EXISTS chk_armas_alcance CHECK (alcance BETWEEN 0 AND 100);
ALTER TABLE armas ADD CONSTRAINT IF NOT EXISTS chk_armas_danio CHECK (danio BETWEEN 0 AND 100);
ALTER TABLE armas ADD CONSTRAINT IF NOT EXISTS chk_armas_precision CHECK (precision BETWEEN 0 AND 100);
ALTER TABLE armas ADD CONSTRAINT IF NOT EXISTS chk_armas_precio_indice CHECK (precio_indice BETWEEN 0 AND 100);

-- Valores por defecto para registros existentes (si los hay)
UPDATE armas SET alcance = COALESCE(alcance, 60),
                 danio = COALESCE(danio, 70),
                 precision = COALESCE(precision, 65),
                 precio_indice = COALESCE(precio_indice, 50);

-- Semillas de ejemplo coherentes con las nuevas categorías (idempotentes)
INSERT INTO armas (nombre, descripcion, precio, stock, imagen_url, categoria_id, alcance, danio, precision, precio_indice)
SELECT 'Desert Eagle (CS)', 'Pistola clásica de Counter-Strike', 399.99, 10, NULL, c.id, 40, 90, 80, 60
FROM categorias c
WHERE c.nombre = 'Pistola'
  AND NOT EXISTS (SELECT 1 FROM armas a WHERE a.nombre = 'Desert Eagle (CS)');

INSERT INTO armas (nombre, descripcion, precio, stock, imagen_url, categoria_id, alcance, danio, precision, precio_indice)
SELECT 'AK-47 (CS)', 'Rifle de asalto soviético icónico', 599.99, 5, NULL, c.id, 70, 80, 60, 65
FROM categorias c
WHERE c.nombre = 'Fusil de Asalto'
  AND NOT EXISTS (SELECT 1 FROM armas a WHERE a.nombre = 'AK-47 (CS)');
