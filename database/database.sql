CREATE DATABASE IF NOT EXISTS trims_house CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


USE trims_house;


CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(120) NOT NULL, email VARCHAR(160) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL, role ENUM('cliente','barbero','administrador') NOT NULL DEFAULT 'cliente', created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

ALTER TABLE users MODIFY role ENUM('cliente','barbero','administrador') NOT NULL DEFAULT 'cliente';


CREATE TABLE IF NOT EXISTS barbers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(120) NOT NULL, specialty VARCHAR(160) NOT NULL, image_url VARCHAR(500));


CREATE TABLE IF NOT EXISTS appointments (id INT AUTO_INCREMENT PRIMARY KEY, user_id INT NOT NULL, barber_id INT NOT NULL, service VARCHAR(120) NOT NULL, appointment_date DATE NOT NULL, appointment_time TIME NOT NULL, finish VARCHAR(60) NOT NULL DEFAULT 'Acabado natural', note VARCHAR(160) NULL, status ENUM('pendiente','confirmada','cancelada') DEFAULT 'pendiente', created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES users(id), FOREIGN KEY (barber_id) REFERENCES barbers(id));


INSERT IGNORE INTO barbers (id,name,specialty,image_url) VALUES (1,'Mateo Rios','Fade · Diseño',''),(2,'Diego Santos','Clasico · Barba',''),(3,'Alex Cruz','Color · Textura','');

