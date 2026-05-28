'use strict';
const { Op } = require('sequelize');
const { sequelize } = require('./models');
const { Libro, Autor, Usuario, Prestamo } = require('./models');


async function registrarLibro(datosLibro, autorIds) {
  const libro = await Libro.create(datosLibro);
  const autores = await Autor.findAll({ where: { id: autorIds } });
  await libro.setAutores(autores);
  return libro;
}


async function listarLibrosActivos() {
  return await Libro.findAll({
    where: { activo: true },
    include: [{ model: Autor, as: 'autores', through: { attributes: [] } }]
  });
}


async function registrarPrestamo(libroId, usuarioId, fechaDevolucionEsp) {
  const t = await sequelize.transaction();
  try {

    const libro = await Libro.findByPk(libroId, { transaction: t });
    if (!libro) throw new Error('Libro no encontrado');
    if (libro.copiasDisponibles <= 0) throw new Error('No hay copias disponibles');

    const prestamo = await Prestamo.create({
      libro_id: libroId,
      usuario_id: usuarioId,
      fechaPrestamo: new Date(),
      fechaDevolucionEsp
    }, { transaction: t });

    
    await libro.decrement('copiasDisponibles', { by: 1, transaction: t });

    await t.commit();
    return prestamo;
  } catch (error) {
    await t.rollback();
    throw error;
  }
}


async function registrarDevolucion(prestamoId) {
  const t = await sequelize.transaction();
  try {
    const prestamo = await Prestamo.findByPk(prestamoId, { transaction: t });
    if (!prestamo) throw new Error('Prestamo no encontrado');
    if (prestamo.fechaDevolucionReal) throw new Error('Este prestamo ya fue devuelto');

    await prestamo.update({ fechaDevolucionReal: new Date() }, { transaction: t });

    const libro = await Libro.findByPk(prestamo.libro_id, { transaction: t });
    await libro.increment('copiasDisponibles', { by: 1, transaction: t });

    await t.commit();
    return prestamo;
  } catch (error) {
    await t.rollback();
    throw error;
  }
}


async function listarPrestamosActivos() {
  return await Prestamo.findAll({
    where: { fechaDevolucionReal: null },
    include: [
      { model: Libro,    as: 'libro'   },
      { model: Usuario,  as: 'usuario' }
    ]
  });
}

module.exports = {
  registrarLibro,
  listarLibrosActivos,
  registrarPrestamo,
  registrarDevolucion,
  listarPrestamosActivos
};