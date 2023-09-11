CREATE DATABASE ejercicio_8_alquiler_pelicula;
USE ejercicio_8_alquiler_pelicula;

CREATE TABLE cliente (
	cod_cliente INT NOT NULL,
    nom_cliente VARCHAR(255) NOT NULL,
    dir_cliente VARCHAR(255) NULL,
    telf_cliente VARCHAR(100) NULL,
    PRIMARY KEY (cod_cliente)
);

CREATE TABLE tipo (
	cod_tipo INT NOT NULL,
    categoria VARCHAR(255) NOT NULL,
    PRIMARY KEY (cod_tipo)
);

CREATE TABLE actor (
	cod_actor INT NOT NULL,
    nom_actor VARCHAR(255) NOT NULL,
    fechanac_actor DATE NOT NULL,
    PRIMARY KEY (cod_actor)
);

CREATE TABLE pelicula (
	cod_pelicula INT NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    cod_tipo INT NOT NULL,
    cod_actor INT NOT NULL,
    PRIMARY KEY (cod_pelicula),
    FOREIGN KEY (cod_tipo) REFERENCES tipo (cod_tipo),
    FOREIGN KEY (cod_actor) REFERENCES actor (cod_actor)
);

CREATE TABLE cassete (
	cod_cassete INT NOT NULL,
    cod_pelicula INT NOT NULL,
    num_copias INT NOT NULL,
    formato VARCHAR(100) NOT NULL,
    PRIMARY KEY (cod_cassete),
    FOREIGN KEY (cod_pelicula) REFERENCES pelicula (cod_pelicula)
);

CREATE TABLE alquiler (
	cod_alquiler INT NOT NULL,
    num_membresia INT NOT NULL,
    fecha_alquiler DATE NOT NULL,
    fecha_devolucion DATE NOT NULL,
    valor_alquiler DOUBLE NOT NULL,
    cantidad INT NOT NULL,
    cod_cliente INT NOT NULL,
    cod_cassete INT NOT NULL,
    PRIMARY KEY (cod_alquiler),
    FOREIGN KEY (cod_cliente) REFERENCES cliente (cod_cliente),
    FOREIGN KEY (cod_cassete) REFERENCES cassete (cod_cassete)
);
