CREATE TABLE categorias (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL UNIQUE,
  descripcion VARCHAR(500)
);

CREATE TABLE armas (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(150) NOT NULL,
  descripcion VARCHAR(1000),
  precio DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL,
  imagen_url VARCHAR(255),
  categoria_id BIGINT NOT NULL,
  alcance INT NOT NULL,        
  danio INT NOT NULL,          
  precision INT NOT NULL,      
  CONSTRAINT fk_armas_categoria FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);


