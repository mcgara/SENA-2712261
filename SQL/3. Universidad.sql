CREATE DATABASE ejercicio_3_Universidad;
USE ejercicio_3_Universidad;


CREATE TABLE DECANOS(
  CEDULA INT PRIMARY KEY,
  NOMBRES VARCHAR(100),
  APELLIDOS VARCHAR(100),
  CELULAR VARCHAR(100)
);


CREATE TABLE FACULTAD(
  NUMERO INT PRIMARY KEY,
  NOMBRE VARCHAR(100),
  UBICACION VARCHAR(100),
  CEDULA INT,
  FOREIGN KEY (CEDULA) REFERENCES DECANOS(CEDULA)
);


CREATE TABLE DOCENTES(
  CEDULA INT PRIMARY KEY,
  NOMBRES VARCHAR(100),
  APELLIDO VARCHAR(100),
  TITULO VARCHAR(100),
  NUMERO INT,
  FOREIGN KEY (NUMERO) REFERENCES FACULTAD(NUMERO)
);

CREATE TABLE ASIGNATURAS(
  CEDULA INT PRIMARY KEY,
  NOMBRES VARCHAR(100),
  Nro_CREDITOS INT
);

CREATE TABLE CURSO(
  Nro_ID INT PRIMARY KEY,
  CEDULA INT,
  CODIGO INT,
  FOREIGN KEY (CEDULA) REFERENCES DOCENTES(CEDULA),
  FOREIGN KEY (CODIGO) REFERENCES ASIGNATURAS(CODIGO)
);

CREATE TABLE ESTUDIANTE(
  Nro_ID INT PRIMARY KEY,
  NOMBRES VARCHAR(100),
  APELLIDO VARCHAR(100),
  DIRECCION VARCHAR(100)
);

CREATE TABLE INSCRIPCION(
  Nro_INSCRIPCION INT PRIMARY KEY,
  CODIGO INT,
  Nro_ID INT,
  PERIODO INT,
  FOREIGN KEY (CODIGO) REFERENCES CURSO(CODIGO), 
  FOREIGN KEY (Nro_ID) REFERENCES ESTUDIANTE(Nro_ID)
);
