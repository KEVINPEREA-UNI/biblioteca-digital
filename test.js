'use strict';
require('dotenv').config();
const servicio = require('./bibliotecaService');

async function main() {
  try {
    console.log('\n📚 1. Libros activos con autores:');
    const libros = await servicio.listarLibrosActivos();
    libros.forEach(l => {
      const autores = l.autores.map(a => a.nombre + ' ' + a.apellido).join(', ');
      console.log(`  - ${l.titulo} | Autores: ${autores} | Copias: ${l.copiasDisponibles}`);
    });

    console.log('\n📋 2. Préstamos activos:');
    const prestamos = await servicio.listarPrestamosActivos();
    prestamos.forEach(p => {
      console.log(`  - Libro: ${p.libro.titulo} | Usuario: ${p.usuario.nombre}`);
    });

    console.log('\n✅ Todo funciona correctamente!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();