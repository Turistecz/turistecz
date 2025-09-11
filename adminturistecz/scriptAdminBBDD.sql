-- Script para MySQL: creación de la base de datos y tablas de administración

-- Crear base de datos si no existe
CREATE DATABASE IF NOT EXISTS `adminturistecz` 
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_general_ci;

USE `adminturistecz`;

-- Crear tabla de administradores
CREATE TABLE IF NOT EXISTS `admins` (
  `nombre` VARCHAR(255) NOT NULL,
  `correo` VARCHAR(255) NOT NULL,
  `contrasena` VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Insertar datos iniciales en admins
INSERT INTO `admins` (`nombre`, `correo`, `contrasena`) VALUES
('Juan', 'jpardo@ceste.com', '$2y$10$xmuwIMvy5o1Wrq6.KjsNj.VmUkuxfusYBgwrncReZboSdxYVz4YGS'),
('a', 'a@gmail.com', '$2y$10$Gp2az/pOr8OvDMkQ0GUTjuAto05573f20./viT4kXtUpxM99DyHbm'),
('a', 'a1@gmail.com', '$2y$10$enFdp9SYDT7bKFTPGFXBpeQ5miXkPX54aRMHcuQRDSp/t0KyyHde2');

-- Crear tabla de login
CREATE TABLE IF NOT EXISTS `login` (
  `correo` VARCHAR(255) NOT NULL,
  `contrasena` VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
