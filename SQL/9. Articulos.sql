/* 1. Crear una base de datos en MySQL */

CREATE DATABASE ejercicio_9_Articulos;
USE ejercicio_9_Articulos;

/*
2. Crear las siguientes tabkas en la base de datos creada:
  a. ARTICULOS
     I. CODIGO
    II. NOMBRE
   III. PRECIO COSTO
    IV. PRECIO VENTA
     V. EXISTENCIA
    VI. CATEGORIA
  b. CATEGORIAS
     I. CODIGO
    II. NOMBRE
 */

CREATE TABLE ARTICULOS(
  CODIGO VARCHAR(255) NOT NULL,
  NOMBRE VARCHAR(255) NOT NULL,
  PRECIO_COSTO FLOAT(12, 5) NOT NULL,
  PRECIO_VENTA FLOAT(12, 5) NOT NULL,
  EXISTENCIA INT NOT NULL DEFAULT 0,
  CATEGORIA VARCHAR(255) NOT NULL,
  PRIMARY KEY (CODIGO),
  UNIQUE (CODIGO)
);

CREATE TABLE CATEGORIAS(
  CODIGO VARCHAR(255) NOT NULL,
  NOMBRE TEXT NOT NULL,
  PRIMARY KEY (CODIGO),
  UNIQUE (CODIGO)
);

/* 3. Definir la relacion entre las dos tablas */

ALTER TABLE ARTICULOS ADD CONSTRAINT FK_CATEGORIA FOREIGN KEY (CATEGORIA) REFERENCES CATEGORIAS(CODIGO);

/* 4. Adicionar un campo para Existencia minima, costo promedio en la tabla articulos */

ALTER TABLE ARTICULOS ADD EXISTENCIA_MIN INT NOT NULL DEFAULT 0;

ALTER TABLE ARTICULOS ADD COSTO_PROMEDIO FLOAT(12,5) NOT NULL DEFAULT 0.00;

/* 5. Adiciona una nueva tabla llamada BODEGA, la cual cuenta con dos atributos, CODIGO, NOMBRE de la bodega */

CREATE TABLE BODEGA(
  CODIGO VARCHAR(10) NOT NULL,
  NOMBRE VARCHAR(255) NOT NULL,
  PRIMARY KEY (CODIGO),
  UNIQUE (CODIGO)
);

/* 6. Adiciona el atributo bodega a la tabla de ARTICULOS */

ALTER TABLE ARTICULOS ADD BODEGA VARCHAR(10) NOT NULL;

/* 7. Crea la relacion entre las tablas BODEGA y ARTICULOS */

ALTER TABLE ARTICULOS ADD CONSTRAINT ARTICULOS_FK_BODEGA FOREIGN KEY (BODEGA) REFERENCES BODEGA(CODIGO);

/* 8. Cambiar el nombre del campo PRECIO_COSTO en la tabla ARTICULOS por PRECIO_COMPRA */

ALTER TABLE ARTICULOS CHANGE PRECIO_COSTO PRECIO_COMPRA FLOAT(12,5) NOT NULL;

/* 9. Agregar 20 registros en la Tabla ARTICULOS, 3 CATEGORIAS, 2 BODEGAS */

INSERT INTO CATEGORIAS(CODIGO, NOMBRE) VALUES
("Tecnologia", "Productos sobre tecnologias como computadoras, celulares, componentes, etc."),
("Electrodomesticos", "Productos para el uso de aparatos domestico, etc."),
("Juegos de mesa", "Productos de juguetes para la diversion en casa.");

INSERT INTO BODEGA(CODIGO, NOMBRE) VALUES
("A-01", "Bodega Centro"),
("B-24", "Gran Bodegon"),
("C-05", "Almacenes Super");

INSERT INTO ARTICULOS
(CODIGO, NOMBRE, PRECIO_COMPRA, PRECIO_VENTA, EXISTENCIA, CATEGORIA, EXISTENCIA_MIN, COSTO_PROMEDIO, BODEGA) VALUES
("ABCD-0001", "Lavadora", 1000, 1200, 15, "Electrodomesticos", 3, 1150, "A-01"),
("ABCD-0002", "Computador", 1000, 1200, 15, "Tecnologia", 3, 1150, "C-05"),
("ABCD-0003", "Microondas", 1000, 1200, 15, "Electrodomesticos", 3, 1150, "A-01"),
("ABCD-0004", "Nevera", 1000, 1200, 15, "Electrodomesticos", 3, 1150, "B-24"),
("ABCD-0005", "Parlante", 1000, 1200, 15, "Tecnologia", 3, 1150, "C-05"),
("ABCD-0006", "Audifonos", 1000, 1200, 15, "Tecnologia", 3, 1150, "A-01"),
("ABCD-0007", "Cargador", 1000, 1200, 15, "Tecnologia", 3, 1150, "C-05"),
("ABCD-0008", "Celular", 1000, 1200, 15, "Tecnologia", 3, 1150, "B-24"),
("ABCD-0009", "Auriculares", 1000, 1200, 15, "Tecnologia", 3, 1150, "A-01"),
("ABCD-0010", "Pokker", 1000, 1200, 15, "Juegos de mesa", 3, 1150, "A-01"),
("ABCD-0011", "Ajedrez", 1000, 1200, 15, "Juegos de mesa", 3, 1150, "B-24"),
("ABCD-0012", "Jinga", 1000, 1200, 15, "Juegos de mesa", 3, 1150, "B-24"),
("ABCD-0013", "Cubo Rubik", 1000, 1200, 15, "Juegos de mesa", 3, 1150, "A-01"),
("ABCD-0014", "Rompe Cabezas", 1000, 1200, 15, "Juegos de mesa", 3, 1150, "C-05"),
("ABCD-0015", "Tablet", 1000, 1200, 15, "Electrodomesticos", 3, 1150, "C-05"),
("ABCD-0016", "Licuadora", 1000, 1200, 15, "Electrodomesticos", 3, 1150, "A-01"),
("ABCD-0017", "PC", 1000, 1200, 15, "Tecnologia", 3, 1150, "C-05"),
("ABCD-0018", "Teclado", 1000, 1200, 15, "Tecnologia", 3, 1150, "A-01"),
("ABCD-0019", "Mouse", 1000, 1200, 15, "Tecnologia", 3, 1150, "B-24"),
("ABCD-0020", "Secadora", 1000, 1200, 15, "Electrodomesticos", 3, 1150, "A-01");

/* 10. Listar todos los articulos. */

SELECT * FROM ARTICULOS;

/* 11. Listar el codigo, nombre, precio venta de los articulos que comiencen por la letra A. */

SELECT NOMBRE, PRECIO_VENTA FROM ARTICULOS WHERE NOMBRE LIKE "A%";

/* 12. Listar el codigo, nombre, precio venta de los articulos que comiencen por la letra A
       ordenados por nombre de forma decendente. */

SELECT NOMBRE, PRECIO_VENTA FROM ARTICULOS WHERE NOMBRE LIKE "A%" ORDER BY NOMBRE DESC;

/* 13. Eliminar la Tabla BODEGA y Eliminar la Relacion con la Tabla ARTICULOS. */

ALTER TABLE ARTICULOS DROP FOREIGN KEY ARTICULOS_FK_BODEGA;

ALTER TABLE ARTICULOS DROP COLUMN BODEGA;
DROP TABLE BODEGA;
