CREATE DATABASE ejercicio_12_Tienda;
USE ejercicio_12_Tienda;

CREATE TABLE Categoria(
  Id_Categoria INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  Nombre VARCHAR(50) NOT NULL,
  Descripcion VARCHAR(255) DEFAULT NULL,
  Estado BIT DEFAULT 0,
  CONSTRAINT Categoria_UK_Nombre UNIQUE (Nombre)
);

CREATE TABLE Articulo(
  Id_Articulo INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  Id_Categoria INT NOT NULL,
  Codigo VARCHAR(50) NOT NULL,
  Nombre VARCHAR(100) NOT NULL,
  Precio_Venta DECIMAL(11, 2) NOT NULL,
  Stock INT DEFAULT 0,
  Descripcion VARCHAR(255),
  Imagen VARCHAR(20),
  Estado BIT DEFAULT 0
);

CREATE TABLE Detalle_Ingreso(
  Id_detalle_ingreso INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  Id_Ingreso INT NOT NULL,
  Id_Articulo INT NOT NULL,
  Cantidad INT DEFAULT 0,
  Precio DECIMAL(11, 2) NOT NULL
);

CREATE TABLE Ingreso(
  Id_Ingreso INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  Id_Proveedor INT NOT NULL,
  Id_Usuario INT NOT NULL,
  Tipo_Comprobante VARCHAR(20) NOT NULL,  
  Serie_Comprobante VARCHAR(7) NOT NULL,
  Num_Comprobante VARCHAR(10) NOT NULL,
  Fecha DATETIME NOT NULL,
  Impuesto DECIMAL(4, 2) DEFAULT 0,
  Total DECIMAL(11, 2) NOT NULL,
  Estado VARCHAR(20) NOT NULL
);

CREATE TABLE Detalle_Venta(
  Id_Detalle_Venta INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  Id_Venta INT NOT NULL,
  Id_Articulo INT NOT NULL,
  Cantidad INT DEFAULT 0,
  Precio DECIMAL(11, 2) NOT NULL,
  Descuento DECIMAL(11, 2) DEFAULT 0
);

CREATE TABLE Persona(
  Id_Persona INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  Tipo_Persona VARCHAR(20) NOT NULL,
  Nombre VARCHAR(100) NOT NULL,
  Tipo_Documento VARCHAR(20) NOT NULL,
  Num_Documento VARCHAR(20) NOT NULL,
  Direccion VARCHAR(70) DEFAULT NULL,
  Telefono VARCHAR(20) DEFAULT NULL,
  Email VARCHAR(50) DEFAULT NULL 
);

CREATE TABLE Usuario(
  Id_Usuario INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  Id_Rol INT NOT NULL,
  Nombre VARCHAR(100) NOT NULL,
  Tipo_Documento VARCHAR(20) NOT NULL,
  Num_Documento VARCHAR(20) NOT NULL,
  Direccion VARCHAR(70) DEFAULT NULL,
  Telefono VARCHAR(20) DEFAULT NULL,
  Email VARCHAR(50) DEFAULT NULL,
  Clave VARBINARY(800) DEFAULT NULL,
  Estado BIT DEFAULT 0
);

CREATE TABLE Venta(
  Id_Venta INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  Id_Cliente INT NOT NULL,
  Id_Usuario INT NOT NULL,
  Tipo_Comprobante VARCHAR(20) NOT NULL,
  Serie_Comprobante VARCHAR(7) NOT NULL,
  Num_Comprobante VARCHAR(50) NOT NULL,
  Fecha DATETIME NOT NULL,
  Impuesto DECIMAL(4, 2) DEFAULT 0,
  Total DECIMAL(11, 2) NOT NULL,
  Estado VARCHAR(20) NOT NULL
);

CREATE TABLE Rol(
  Id_Rol INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  Nombre VARCHAR(30) NOT NULL,
  Descripcion VARCHAR(255) DEFAULT NULL,
  Estado BIT DEFAULT 0
);


/* ---- Relationships tables ---- */

ALTER TABLE Articulo ADD CONSTRAINT Articulo_FK_Categoria FOREIGN KEY (Id_Categoria) REFERENCES Categoria(Id_Categoria);

ALTER TABLE Detalle_Ingreso ADD CONSTRAINT Detalle_Ingreso_FK_Articulo FOREIGN KEY (Id_Articulo) REFERENCES Articulo(Id_Articulo);
ALTER TABLE Detalle_Ingreso ADD CONSTRAINT Detalle_Ingreso_FK_Ingreso FOREIGN KEY (Id_Ingreso) REFERENCES Ingreso(Id_Ingreso);

ALTER TABLE Detalle_Venta ADD CONSTRAINT Detalle_Venta_FK_Articulo FOREIGN KEY (Id_Articulo) REFERENCES Articulo(Id_Articulo);
ALTER TABLE Detalle_Venta ADD CONSTRAINT Detalle_Venta_FK_Venta FOREIGN KEY (Id_Venta) REFERENCES Venta(Id_Venta);

ALTER TABLE Ingreso ADD CONSTRAINT Ingreso_FK_Proveedor FOREIGN KEY (Id_Proveedor) REFERENCES Persona(Id_Persona);
ALTER TABLE Ingreso ADD CONSTRAINT Ingreso_FK_Usuario FOREIGN KEY (Id_Usuario) REFERENCES Usuario(Id_Usuario);

ALTER TABLE Usuario ADD CONSTRAINT Usuario_FK_Rol FOREIGN KEY (Id_Rol) REFERENCES Rol(Id_Rol);

ALTER TABLE Venta ADD CONSTRAINT Venta_FK_Usuario FOREIGN KEY (Id_Usuario) REFERENCES Usuario(Id_Usuario);
ALTER TABLE Venta ADD CONSTRAINT Venta_FK_Cliente FOREIGN KEY (Id_Cliente) REFERENCES Persona(Id_Persona);
