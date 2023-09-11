CREATE DATABASE ejercicio_10_Usuarios;
USE ejercicio_10_Usuarios;

/* 
1. Crea uan tabla con los siguiente datos:
    a. Cedula
    b. Nombre
    c. Edad
    d. Sexo
    e. Estado Civil
*/

CREATE TABLE usuario (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  edad INT DEFAULT NULL,
  sexo ENUM("M", "F") NOT NULL,
  estado_civil ENUM("casado", "soltero", "") NOT NULL DEFAULT "soltero"
);

/* 2. Insertar 20 registros */

INSERT INTO usuario (nombre, edad, sexo, estado_civil) VALUES
("Maria Magdalena", 26, "F", "casado"),
("Maria De Las Mercedes", 24, "F", "soltero"),
("Juan Ortiz", 55, "M", "casado"),
("Miranda Mendoza", 34, "F", "soltero"),
("Rossa Dias", 16, "F", "soltero"),
("Miguel ", 33, "M", "casado"),
("Emanuel Cervantes", 18, "F", "soltero"),
("Rodolfo Hernandez", 17, "M", "soltero"),
("Yoicer Herrera", 45, "M", "casado"),
("Viriginia Sierra", 17, "F", "soltero"),
("Diana Dias", 32, "F", "casado"),
("Guillermo Narvaez", 47, "M", "casado"),
("Linda Mesa", 36, "F", "casado"),
("Camilo Sexto", 26, "M", "soltero"),
("Marta Caro", 16, "F", "soltero"),
("Xiomara Vergara", 22, "F", "casado"),
("Andres Dario", 20, "M", "soltero"),
("Stephanie Ortiz", 21, "F", "soltero"),
("Sofia Veldez", 37, "F", "casado"),
("Carlos Villagram", 16, "M", "soltero");

/* 3. Realizar consultas para:
    a. Numero total de personas.
    b. Cantidad de mujeres, hombres.
    c. Personas mayores de edad.
    d. Personas menores de edad.
    e. Mujeres menores de edad.
    f. Mujeres mayores de edad.
    g. Hombres menores de edad.
    h. Hombres mayores de edad.
    i. Promedio de edad de hombres.
    j. Promedio de edad de mujeres.
    k. Promedio de edad mujeres menores de edad.
    l. Promedio de edad mujeres mayores de edad.
    m. Promedio de edad de hombres menores de edad.
    n. Promedio de edad de hombres mayores de edad.
*/

SELECT COUNT(*) AS cantidad_personas FROM usuario;

SELECT COUNT(sexo) AS cantidad_mujeres FROM usuario WHERE sexo = "F"; 
SELECT COUNT(sexo) AS cantidad_hombres FROM usuario WHERE sexo = "M";

SELECT nombre AS nombre_persona_mayor, sexo, edad, estado_civil FROM usuario WHERE edad >= 18;
SELECT nombre AS nombre_persona_menor, sexo, edad, estado_civil FROM usuario WHERE edad < 18;

SELECT nombre AS nombre_mujer_mayor, sexo, edad, estado_civil FROM usuario WHERE edad >= 18 AND sexo = "F";
SELECT nombre AS nombre_mujer_menor, sexo, edad, estado_civil FROM usuario WHERE edad < 18 AND sexo = "F";

SELECT nombre AS nombre_hombre_mayor, sexo, edad, estado_civil FROM usuario WHERE edad >= 18 AND sexo = "M";
SELECT nombre AS nombre_hombre_menor, sexo, edad, estado_civil FROM usuario WHERE edad < 18 AND sexo = "M";

SELECT AVG(edad) AS promedio_edad_hombres FROM usuario WHERE sexo = "M";
SELECT AVG(edad) AS promedio_edad_mujeres FROM usuario WHERE sexo = "F";

SELECT AVG(edad) AS promedio_edad_mujeres_menores FROM usuario WHERE sexo = "F" AND edad < 18;
SELECT AVG(edad) AS promedio_edad_mujeres_mayores FROM usuario WHERE sexo = "F" AND edad >= 18;

SELECT AVG(edad) AS promedio_edad_hombres_menores FROM usuario WHERE sexo = "M" AND edad < 18;
SELECT AVG(edad) AS promedio_edad_hombres_mayores FROM usuario WHERE sexo = "M" AND edad >= 18;

/* 4. Crear vista para hombres mayores de edad. */

CREATE VIEW view_hombres_mayores_edad AS
(SELECT nombre AS nombre_hombre_mayor, sexo, edad, estado_civil FROM usuario WHERE edad >= 18 AND sexo = "M");

/* 5. Crear vista para mujeres menores de edad. */

CREATE VIEW view_mujeres_menores_edad AS
(SELECT nombre AS nombre_mujer_menor, sexo, edad, estado_civil FROM usuario WHERE edad < 18 AND sexo = "F");

/* 6. Crear vista para todos los hombres. */

CREATE VIEW view_hombres AS
(SELECT nombre AS nombre_hombre, sexo, edad, estado_civil FROM usuario WHERE sexo = "M");

/* 7. Crear vista para todas las mujeres. */

CREATE VIEW view_mujeres AS
(SELECT nombre AS nombre_mujer, sexo, edad, estado_civil FROM usuario WHERE sexo = "F");
