CREATE DATABASE RETOS;
USE RETOS;

CREATE TABLE dictionary (
    id INT AUTO_INCREMENT PRIMARY KEY,
    original VARCHAR(50) NOT NULL,
    translated VARCHAR(50) NOT NULL
);

INSERT INTO dictionary (original, translated) VALUES ('name', 'nombre');
INSERT INTO dictionary (original, translated) VALUES ('height', 'altura');
INSERT INTO dictionary (original, translated) VALUES ('mass', 'peso');
INSERT INTO dictionary (original, translated) VALUES ('hair_color', 'colorCabello');
INSERT INTO dictionary (original, translated) VALUES ('skin_color', 'colorPiel');
INSERT INTO dictionary (original, translated) VALUES ('eye_color', 'colorOjos');
INSERT INTO dictionary (original, translated) VALUES ('gender', 'genero');
INSERT INTO dictionary (original, translated) VALUES ('homeworld', 'mundoNatal');

CREATE TABLE people (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    altura VARCHAR(50) NOT NULL,
    peso VARCHAR(50) NOT NULL,
    color_cabello VARCHAR(50) NOT NULL,
    color_piel VARCHAR(50) NOT NULL,
    color_ojos VARCHAR(50) NOT NULL,
    genero VARCHAR(50) NOT NULL,
    mundo_natal VARCHAR(50) NOT NULL
);