 Actividad Evaluada: API REST para Gestión de Reservaciones
 
Proyecto Restaurante.
Descripción general.
Tecnologías utilizadas.
Arquitectura del proyecto (árbol de directorios).
Requisitos previos.
Instalación paso a paso.
Configuración del archivo .env.
Creación de la base de datos con restaurante.sql.
Carga de datos iniciales con seed.sql.
Instalación de dependencias (npm install).
Ejecución del servidor (npm run dev o npm start).
Explicación de la autenticación JWT.
Roles disponibles (ADMIN y CLIENTE).
Descripción de todos los endpoints.
Colección de Postman y cómo importarla.
Ejemplos de respuestas de la API.
Autor y licencia.
Recomendaciones adicionales

Para que el proyecto tenga un nivel profesional, también incorporaría:

Registro de eventos y errores con Winston.
Limitación de peticiones con express-rate-limit para prevenir ataques de fuerza bruta.
Validación de entradas mediante express-validator.
Transacciones de PostgreSQL para garantizar que las reservaciones se creen de forma consistente.
Índices en las columnas fecha, hora y mesa_id para acelerar la validación de disponibilidad.
Convenciones RESTful consistentes y respuestas JSON estandarizadas con códigos HTTP adecuados (200, 201, 400, 401, 403, 404, 409 y 500).

Con esta estructura se tendrá una API REST escalable, segura y mantenible que cumple los requisitos de autenticación con JWT, encriptación con bcrypt, manejo de roles y permisos, documentación mediante Postman, y una base de datos SQL lista para integrarse con PostgreSQL.
