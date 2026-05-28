'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert({ tableName: 'autores', schema: 'public' }, [
      { nombre: 'Gabriel', apellido: 'Garcia Marquez', nacionalidad: 'Colombiano', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Isabel',  apellido: 'Allende',        nacionalidad: 'Chilena',    createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Jorge',   apellido: 'Luis Borges',    nacionalidad: 'Argentino',  createdAt: new Date(), updatedAt: new Date() }
    ]);

    await queryInterface.bulkInsert({ tableName: 'libros', schema: 'public' }, [
      { titulo: 'Cien Años de Soledad',     isbn: '978-0060883287', anioPublicacion: 1967, copiasDisponibles: 3, activo: true, createdAt: new Date(), updatedAt: new Date() },
      { titulo: 'El Amor en los Tiempos',   isbn: '978-0307389732', anioPublicacion: 1985, copiasDisponibles: 2, activo: true, createdAt: new Date(), updatedAt: new Date() },
      { titulo: 'La Casa de los Espiritus', isbn: '978-1501117015', anioPublicacion: 1982, copiasDisponibles: 4, activo: true, createdAt: new Date(), updatedAt: new Date() },
      { titulo: 'Eva Luna',                 isbn: '978-0553274554', anioPublicacion: 1987, copiasDisponibles: 1, activo: true, createdAt: new Date(), updatedAt: new Date() },
      { titulo: 'Ficciones',                isbn: '978-0802130303', anioPublicacion: 1944, copiasDisponibles: 2, activo: true, createdAt: new Date(), updatedAt: new Date() }
    ]);

    await queryInterface.bulkInsert({ tableName: 'libro_autores', schema: 'public' }, [
      { libro_id: 1, autor_id: 1, createdAt: new Date(), updatedAt: new Date() },
      { libro_id: 2, autor_id: 1, createdAt: new Date(), updatedAt: new Date() },
      { libro_id: 3, autor_id: 2, createdAt: new Date(), updatedAt: new Date() },
      { libro_id: 4, autor_id: 2, createdAt: new Date(), updatedAt: new Date() },
      { libro_id: 5, autor_id: 3, createdAt: new Date(), updatedAt: new Date() }
    ]);

    await queryInterface.bulkInsert({ tableName: 'usuarios', schema: 'public' }, [
      { nombre: 'Carlos Perez',   email: 'carlos@email.com', activo: true, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Maria Gonzalez', email: 'maria@email.com',  activo: true, createdAt: new Date(), updatedAt: new Date() }
    ]);

    await queryInterface.bulkInsert({ tableName: 'prestamos', schema: 'public' }, [
      { libro_id: 1, usuario_id: 1, fechaPrestamo: new Date(), fechaDevolucionEsp: new Date(Date.now() + 7*24*60*60*1000), fechaDevolucionReal: null, createdAt: new Date(), updatedAt: new Date() },
      { libro_id: 3, usuario_id: 2, fechaPrestamo: new Date(), fechaDevolucionEsp: new Date(Date.now() + 7*24*60*60*1000), fechaDevolucionReal: null, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete({ tableName: 'prestamos',     schema: 'public' }, null, {});
    await queryInterface.bulkDelete({ tableName: 'libro_autores', schema: 'public' }, null, {});
    await queryInterface.bulkDelete({ tableName: 'usuarios',      schema: 'public' }, null, {});
    await queryInterface.bulkDelete({ tableName: 'libros',        schema: 'public' }, null, {});
    await queryInterface.bulkDelete({ tableName: 'autores',       schema: 'public' }, null, {});
  }
};