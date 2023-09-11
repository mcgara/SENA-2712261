CREATE DATABASE ejercicio_11_Colegio;
USE ejercicio_11_Colegio;


CREATE TABLE InformeEnc(
  Periodo_Academico INT NOT NULL,
  Id_Estudiante INT NOT NULL, 
  Id_Curso INT NOT NULL,
  Fecha DATE NOT NULL,
  Periodo INT NOT NULL,
  PRIMARY KEY (Periodo_Academico, Id_Estudiante, Id_Curso),
  CONSTRAINT InformeEnc_UK_Periodo UNIQUE (Periodo)
);

CREATE TABLE InformeDet(
  Periodo_Academico INT NOT NULL,
  Id_Estudiante INT NOT NULL, 
  Id_Asignatura INT NOT NULL, 
  Id_Logro INT NOT NULL, 
  Valoracion VARCHAR(20) NOT NULL,
  PRIMARY KEY (Periodo_Academico, Id_Estudiante, Id_Asignatura, Id_Logro)
);

CREATE TABLE Logro(
  Id_logro INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  Descripcion TEXT NOT NULL
);

CREATE TABLE Matricula(
  Id_Matricula INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  Id_Estudiante INT NOT NULL,
  FechMatricula DATE NOT NULL,
  Periodo INT NOT NULL,
  EstadoMatricula CHAR(1) NOT NULL,
  Seguro CHAR(1) NOT NULL,
  Id_Grado INT NOT NULL,
  Documentos CHAR(1) NOT NULL
);

CREATE TABLE Estudiante(
  Id_Estudiante INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  TipoDocumento CHAR(2) NOT NULL,
  NumDocumento VARCHAR(15) NOT NULL,
  Nombres VARCHAR(50) NOT NULL,
  Apellidos VARCHAR(50) NOT NULL,
  FechaNac DATE NOT NULL,
  Sexo CHAR(1) NOT NULL,
  Dir_Estudiante VARCHAR(80) DEFAULT NULL,
  Telefono VARCHAR(15) DEFAULT NULL,
  Correo VARCHAR(50) DEFAULT NULL
);

CREATE TABLE Acudiente(
  Id_Estudiante INT NOT NULL,
  TipoDocumento CHAR(2) NOT NULL,
  NumDocumento VARCHAR(15) PRIMARY KEY NOT NULL,
  Nombres VARCHAR(50) NOT NULL,
  Apellidos VARCHAR(50) NOT NULL,
  Dir_Acudiente VARCHAR(80) DEFAULT NULL,
  Tel_Acudiente VARCHAR(15) DEFAULT NULL,
  Correo VARCHAR(50) DEFAULT NULL,
  CONSTRAINT Acudiente_UK_NumDocumento UNIQUE (NumDocumento)
);

CREATE TABLE Estudiante_Acudiente(
  Id_Estudiante INT NOT NULL,
  NumDocumento INT NOT NULL,
  PRIMARY KEY (Id_Estudiante, NumDocumento)
);

CREATE TABLE Grado(
  Id_Grado INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  Descripcion VARCHAR(30) DEFAULT NULL,
  Id_Jornada INT NOT NULL
);

CREATE TABLE Jornada(
  Id_Jornada INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  Descripcion VARCHAR(30) DEFAULT NULL
);

CREATE TABLE Curso(
  Id_Curso INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  Id_Grado INT NOT NULL,
  Descripcion VARCHAR(30) DEFAULT NULL,
  Id_Profesor INT NOT NULL
);

CREATE TABLE Profesor(
  Id_Profesor INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  Nombres VARCHAR(50) NOT NULL,
  Apellidos VARCHAR(50) NOT NULL,
  Direccion VARCHAR(80) DEFAULT NULL,
  Telefono VARCHAR(50) DEFAULT NULL,
  Correo VARCHAR(60) DEFAULT NULL
);

CREATE TABLE Asignatura(
  Id_Asignatura INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  Descripcion VARCHAR(60) NOT NULL
);

CREATE TABLE Curso_Asignatura(
  Id_Curso INT NOT NULL,
  Id_Asignatura INT NOT NULL,
  Intencidad_Horaria INT NOT NULL,
  Id_Profesor INT NOT NULL,
  PRIMARY KEY (Id_Curso, Id_Asignatura, Id_Profesor)
);


/* ---- Relationships tables ---- */

ALTER TABLE Matricula ADD CONSTRAINT Matricula_FK_Estudiante FOREIGN KEY (Id_Estudiante) REFERENCES Estudiante(Id_Estudiante);
ALTER TABLE Matricula ADD CONSTRAINT Matricula_FK_Periodo FOREIGN KEY (Periodo) REFERENCES InformeEnc(Periodo);
ALTER TABLE Matricula ADD CONSTRAINT Matricula_FK_Grado FOREIGN KEY (Id_Grado) REFERENCES Grado(Id_Grado);

ALTER TABLE InformeEnc ADD CONSTRAINT InformeEnc_FK_Estudiante FOREIGN KEY (Id_Estudiante) REFERENCES Matricula(Id_Estudiante);
ALTER TABLE InformeEnc ADD CONSTRAINT InformeEnc_FK_Curso FOREIGN KEY (Id_Curso) REFERENCES Curso(Id_Curso);

ALTER TABLE InformeDet ADD CONSTRAINT InformeDet_FK_Periodo_Academico FOREIGN KEY (Periodo_Academico) REFERENCES InformeEnc(Periodo_Academico);
ALTER TABLE InformeDet ADD CONSTRAINT InformeDet_FK_Estudiante FOREIGN KEY (Id_Estudiante) REFERENCES InformeEnc(Id_Estudiante);
ALTER TABLE InformeDet ADD CONSTRAINT InformeDet_FK_Logro FOREIGN KEY (Id_Logro) REFERENCES Logro(Id_Logro);
ALTER TABLE InformeDet ADD CONSTRAINT InformeDet_FK_Asignatura FOREIGN KEY (Id_Asignatura) REFERENCES Asignatura(Id_Asignatura);

ALTER TABLE Acudiente ADD CONSTRAINT Acudiente_FK_Estudiante FOREIGN KEY (Id_Estudiante) REFERENCES Estudiante(Id_Estudiante);

ALTER TABLE Grado ADD CONSTRAINT Grado_FK_Jornada FOREIGN KEY (Id_Jornada) REFERENCES Jornada(Id_Jornada);

ALTER TABLE Curso ADD CONSTRAINT Curso_FK_Grado FOREIGN KEY (Id_Grado) REFERENCES Grado(Id_Grado);
ALTER TABLE Curso ADD CONSTRAINT Curso_FK_Profesor FOREIGN KEY (Id_Profesor) REFERENCES Profesor(Id_Profesor);

ALTER TABLE Curso_Asignatura ADD CONSTRAINT Curso_Asignatura_FK_Asignatura FOREIGN KEY (Id_Asignatura) REFERENCES Asignatura(Id_Asignatura);
ALTER TABLE Curso_Asignatura ADD CONSTRAINT Curso_Asignatura_FK_Profesor FOREIGN KEY (Id_Profesor) REFERENCES Profesor(Id_Profesor);
ALTER TABLE Curso_Asignatura ADD CONSTRAINT Curso_Asignatura_FK_Curso FOREIGN KEY (Id_Curso) REFERENCES Curso(Id_Curso);
