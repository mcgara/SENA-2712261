CREATE DATABASE ejercicio_13_Carrito;
USE ejercicio_13_Carrito;

CREATE TABLE Usuario(
  Id_Usuario INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  Correo VARCHAR(100) NOT NULL,
  Password VARCHAR(255) NOT NULL
);

CREATE TABLE Cliente(
  Id_Cliente INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  Id_Usuario INT NOT NULL,
  Nombre VARCHAR(100) NOT NULL,
  Apellido VARCHAR(100) DEFAULT NULL,
  Direccion VARCHAR(70) DEFAULT NULL,
  Telefono VARCHAR(25) DEFAULT NULL,
  Fecha_Nacimiento DATE DEFAULT NULL
);

CREATE TABLE Administrador(
  Id_Administrador INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  Id_Usuario INT NOT NULL
);

CREATE TABLE Comentario(
  Id_Comentario INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  Id_Cliente INT NOT NULL,
  Comentario TEXT NOT NULL
);

CREATE TABLE Carrito(
  Id_Carrito INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  Id_Cliente INT NOT NULL,
  Fecha_Creacion DATE NOT NULL
);

CREATE TABLE Pedido(
  Id_Pedido INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  Id_Cliente INT NOT NULL,
  Id_Pago INT NOT NULL,
  Id_Envio INT NOT NULL,
  Estado BIT DEFAULT 0,
  Fecha DATE NOT NULL,
  TOTAL DECIMAL(12, 2) DEFAULT 0
);

CREATE TABLE Pago(
  Id_Pago INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  Metodo_Pago VARCHAR(50) NOT NULL,
  Estado_Pago VARCHAR(20) NOT NULL,
  Fecha_Pago DATETIME NOT NULL
);

CREATE TABLE Envio(
  Id_Envio INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  Id_Estado_Envio INT NOT NULL,
  Direccion_Envio VARCHAR(100) NOT NULL,
  Ciudad_Envio VARCHAR(255) NOT NULL,
  Fecha_Envio DATETIME NOT NULL 
);

CREATE TABLE Estado_Envio(
  Id_Estado_Envio INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  Nombre VARCHAR(20) NOT NULL,
  Descripcion VARCHAR(255) DEFAULT NULL,
  Codigo_Rastreo VARCHAR(30) DEFAULT NULL
);

CREATE TABLE Marca(
  Id_Marca INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  Nombre VARCHAR(255) NOT NULL
);

CREATE TABLE Producto(
  Id_Producto INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  Id_Marca INT NOT NULL,
  Nombre VARCHAR(100) NOT NULL,
  Descripcion TEXT DEFAULT NULL,
  Precio DECIMAL(12, 2) DEFAULT NULL
);

CREATE TABLE Categoria(
  Id_Categoria INT PRIMARY KEY NOT NULL,
  Nombre VARCHAR(255) NOT NULL,
  CONSTRAINT Categoria_UK_Nombre UNIQUE (Nombre)
);

CREATE TABLE Producto_Categoria(
  Id_Producto_Categoria INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  Id_Producto INT NOT NULL,
  Id_Categoria INT NOT NULL
);

CREATE TABLE Carrito_Producto(
  Id_Carrito_Producto INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  Id_Carrito INT NOT NULL,
  Id_Producto INT NOT NULL,
  Cantidad INT DEFAULT 0,
  Descripcion TEXT DEFAULT NULL
);

CREATE TABLE Producto_Pedido(
  Id_Producto_Pedido INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  Id_Producto INT NOT NULL,
  Id_Pedido INT NOT NULL,
  Cantidad INT DEFAULT 0,
  Descripcion TEXT DEFAULT NULL
);

/* ---- Relationships tables ---- */

ALTER TABLE Cliente ADD CONSTRAINT Cliente_FK_Usuario FOREIGN KEY (Id_Usuario) REFERENCES Usuario(Id_Usuario);

ALTER TABLE Administrador ADD CONSTRAINT Administrador_FK_Usuario FOREIGN KEY (Id_Usuario) REFERENCES Usuario(Id_Usuario);

ALTER TABLE Comentario ADD CONSTRAINT Comentario_FK_Cliente FOREIGN KEY (Id_Cliente) REFERENCES Cliente(Id_Cliente);

ALTER TABLE Carrito ADD CONSTRAINT Carrito_FK_Cliente FOREIGN KEY (Id_Cliente) REFERENCES Cliente(Id_Cliente);

ALTER TABLE Pedido ADD CONSTRAINT Pedido_FK_Cliente FOREIGN KEY (Id_Cliente) REFERENCES Cliente(Id_Cliente);
ALTER TABLE Pedido ADD CONSTRAINT Pedido_FK_Pago FOREIGN KEY (Id_Pago) REFERENCES Pago(Id_Pago);
ALTER TABLE Pedido ADD CONSTRAINT Pedido_FK_Envio FOREIGN KEY (Id_Envio) REFERENCES Envio(Id_Envio);

ALTER TABLE Envio ADD CONSTRAINT Envio_FK_Estado_Envio FOREIGN KEY (Id_Estado_Envio) REFERENCES Estado_Envio(Id_Estado_Envio);

ALTER TABLE Producto ADD CONSTRAINT Producto_FK_Marca FOREIGN KEY (Id_Marca) REFERENCES Marca(Id_Marca);

ALTER TABLE Producto_Categoria ADD CONSTRAINT Producto_Categoria_FK_Producto FOREIGN KEY (Id_Producto) REFERENCES Producto(Id_Producto);
ALTER TABLE Producto_Categoria ADD CONSTRAINT Producto_Categoria_FK_Categoria FOREIGN KEY (Id_Categoria) REFERENCES Categoria(Id_Categoria);

ALTER TABLE Carrito_Producto ADD CONSTRAINT Carrito_Producto_FK_Carrito FOREIGN KEY (Id_Carrito) REFERENCES Carrito(Id_Carrito);
ALTER TABLE Carrito_Producto ADD CONSTRAINT Carrito_Producto_FK_Producto FOREIGN KEY (Id_Producto) REFERENCES Producto(Id_Producto);

ALTER TABLE Producto_Pedido ADD CONSTRAINT Producto_Pedido_FK_Producto FOREIGN KEY (Id_Producto) REFERENCES Producto(Id_Producto);
ALTER TABLE Producto_Pedido ADD CONSTRAINT Producto_Pedido_FK_Pedido FOREIGN KEY (Id_Pedido) REFERENCES Pedido(Id_Pedido);
