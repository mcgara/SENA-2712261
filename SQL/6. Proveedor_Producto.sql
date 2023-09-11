CREATE DATABASE ejercicio_6_proveedor_producto;
USE ejercicio_6_proveedor_producto;

CREATE TABLE proveedor (
	nit_proveedor VARCHAR(10) NOT NULL,
	nombre VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL,
    telefono VARCHAR(50) NULL,
    PRIMARY KEY (nit_Proveedor)
);

CREATE TABLE producto (
	codigo_producto VARCHAR(100) PRIMARY KEY,
    precio DOUBLE NOT NULL
);

CREATE TABLE proveedor_producto (
	id INT NOT NULL,
	nit_proveedor VARCHAR(10) NOT NULL, 
    codigo_producto VARCHAR(100) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (nit_proveedor) REFERENCES proveedor (nit_proveedor),
    FOREIGN KEY (codigo_producto) REFERENCES producto (codigo_producto)
);
