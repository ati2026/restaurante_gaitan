-- ==========================================================
-- PROYECTO:
-- API REST - Restaurante "Las Carnitas de Don Gaitán"
-- Base de Datos PostgreSQL
-- Autor: Atilio Gaitán
-- ==========================================================

-- ==========================================================
-- TABLA ROLES
-- ==========================================================

CREATE TABLE roles (

    id SERIAL PRIMARY KEY,

    nombre VARCHAR(30) UNIQUE NOT NULL

);

-- ==========================================================
-- TABLA PERMISOS
-- ==========================================================

CREATE TABLE permisos (

    id SERIAL PRIMARY KEY,

    nombre VARCHAR(100) UNIQUE NOT NULL

);

-- ==========================================================
-- TABLA ROLES_PERMISOS
-- ==========================================================

CREATE TABLE roles_permisos (

    rol_id INT NOT NULL,

    permiso_id INT NOT NULL,

    PRIMARY KEY (rol_id, permiso_id),

    FOREIGN KEY (rol_id)
        REFERENCES roles(id),

    FOREIGN KEY (permiso_id)
        REFERENCES permisos(id)

);

-- ==========================================================
-- TABLA USUARIOS
-- ==========================================================

CREATE TABLE usuarios (

    id SERIAL PRIMARY KEY,

    nombre VARCHAR(80) NOT NULL,

    apellido VARCHAR(80),

    correo VARCHAR(120) UNIQUE NOT NULL,

    password VARCHAR(255) NOT NULL,

    telefono VARCHAR(20),

    rol_id INT NOT NULL,

    estado BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (rol_id)
        REFERENCES roles(id)

);

-- ==========================================================
-- TABLA MESAS
-- ==========================================================

CREATE TABLE mesas (

    id SERIAL PRIMARY KEY,

    numero INT UNIQUE NOT NULL,

    capacidad INT NOT NULL,

    ubicacion VARCHAR(80),

    estado VARCHAR(30) DEFAULT 'Disponible',

    activo BOOLEAN DEFAULT TRUE

);

-- ==========================================================
-- TABLA RESERVACIONES
-- ==========================================================

CREATE TABLE reservaciones (

    id SERIAL PRIMARY KEY,

    usuario_id INT NOT NULL,

    mesa_id INT NOT NULL,

    fecha DATE NOT NULL,

    hora TIME NOT NULL,

    personas INT NOT NULL,

    estado VARCHAR(30) DEFAULT 'Pendiente',

    observaciones TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id),

    FOREIGN KEY (mesa_id)
        REFERENCES mesas(id)

);

-- ==========================================================
-- ÍNDICES
-- ==========================================================

CREATE INDEX idx_usuario_correo
ON usuarios(correo);

CREATE INDEX idx_fecha
ON reservaciones(fecha);

CREATE INDEX idx_hora
ON reservaciones(hora);

CREATE INDEX idx_mesa
ON reservaciones(mesa_id);

-- ==========================================================
-- INSERTAR ROLES
-- ==========================================================

INSERT INTO roles(nombre)

VALUES

('ADMIN'),
('CLIENTE');

-- ==========================================================
-- INSERTAR PERMISOS
-- ==========================================================

INSERT INTO permisos(nombre)

VALUES

('VER_MESAS'),

('CREAR_MESA'),

('EDITAR_MESA'),

('ELIMINAR_MESA'),

('CREAR_RESERVA'),

('VER_RESERVAS'),

('CAMBIAR_ESTADO'),

('CANCELAR_RESERVA');

-- ==========================================================
-- PERMISOS ADMIN
-- ==========================================================

INSERT INTO roles_permisos

SELECT

1,

id

FROM permisos;

-- ==========================================================
-- PERMISOS CLIENTE
-- ==========================================================

INSERT INTO roles_permisos

VALUES

(2,1),

(2,5),

(2,8);

-- ==========================================================
-- USUARIO ADMINISTRADOR
-- ==========================================================
-- IMPORTANTE:
-- Reemplazar la contraseña por un hash generado con bcrypt.

INSERT INTO usuarios(

nombre,

apellido,

correo,

password,

telefono,

rol_id

)

VALUES(

'Administrador',

'Sistema',

'admin@dongaitan.com',

'$2b$10$ReemplazarPorHashBcrypt',

'70000000',

1

);

-- ==========================================================
-- MESAS DEL RESTAURANTE
-- ==========================================================

INSERT INTO mesas(

numero,

capacidad,

ubicacion

)

VALUES

(1,2,'Terraza'),

(2,2,'Terraza'),

(3,4,'Terraza'),

(4,4,'Salón Principal'),

(5,4,'Salón Principal'),

(6,6,'Salón Principal'),

(7,6,'VIP'),

(8,6,'VIP'),

(9,8,'Jardín'),

(10,8,'Jardín'),

(11,10,'Eventos'),

(12,12,'Eventos');

-- ==========================================================
-- CLIENTES DE PRUEBA
-- ==========================================================

INSERT INTO usuarios(

nombre,

apellido,

correo,

password,

telefono,

rol_id

)

VALUES

(

'Carlos',

'Pérez',

'carlos@gmail.com',

'$2b$10$ReemplazarPorHashBcrypt',

'71111111',

2

),

(

'María',

'López',

'maria@gmail.com',

'$2b$10$ReemplazarPorHashBcrypt',

'72222222',

2

);

-- ==========================================================
-- RESERVACIONES DE EJEMPLO
-- ==========================================================

INSERT INTO reservaciones(

usuario_id,

mesa_id,

fecha,

hora,

personas,

estado,

observaciones

)

VALUES

(

2,

4,

'2026-07-10',

'18:00',

4,

'Confirmada',

'Cumpleaños'

),

(

3,

7,

'2026-07-11',

'19:30',

6,

'Pendiente',

'Cena Familiar'

);

-- ==========================================================
-- CONSULTAS DE PRUEBA
-- ==========================================================

-- Ver usuarios

SELECT * FROM usuarios;

-- Ver mesas

SELECT * FROM mesas;

-- Ver reservaciones

SELECT * FROM reservaciones;

-- Ver permisos por rol

SELECT

r.nombre AS rol,

p.nombre AS permiso

FROM roles_permisos rp

INNER JOIN roles r
ON rp.rol_id = r.id

INNER JOIN permisos p
ON rp.permiso_id = p.id

ORDER BY r.id;