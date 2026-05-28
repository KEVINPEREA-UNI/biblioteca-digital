# Biblioteca Digital - Sistema ORM con Node.js + Sequelize

## Descripcion
Sistema de gestion de biblioteca digital implementado con Node.js y Sequelize ORM, conectado a PostgreSQL en Neon.

## Tecnologias
- Node.js
- Sequelize ORM
- PostgreSQL (Neon)

## Instalacion

1. Clonar el repositorio
2. Instalar dependencias:
   npm install
3. Crear archivo .env con la URL de Neon:
   DATABASE_URL=tu_url_de_neon
4. Ejecutar migraciones:
   npx sequelize-cli db:migrate
5. Ejecutar seeds:
   npx sequelize-cli db:seed:all
6. Probar el sistema:
   node test.js

## Estructura del proyecto
- models/       -> Entidades ORM (Autor, Libro, Usuario, Prestamo)
- migrations/   -> Control de versiones del esquema
- seeders/      -> Datos de prueba
- config/       -> Configuracion de base de datos
- bibliotecaService.js -> Operaciones CRUD
- test.js       -> Pruebas del sistema

## Operaciones disponibles
1. Registrar un libro con sus autores
2. Listar libros activos con autores (sin N+1)
3. Registrar un prestamo con transaccion
4. Registrar una devolucion con transaccion
5. Consultar prestamos activos