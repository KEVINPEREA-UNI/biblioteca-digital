'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Autor extends Model {
    static associate(models) {
      // R2 - Relación N:M con Libro
      Autor.belongsToMany(models.Libro, {
        through: 'libro_autores',
        foreignKey: 'autor_id',
        otherKey: 'libro_id',
        as: 'libros'
      });
    }
  }

  Autor.init({
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: { notEmpty: true }
    },
    apellido: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: { notEmpty: true }
    },
    nacionalidad: {
      type: DataTypes.STRING(80)
    }
  }, {
    sequelize,
    modelName: 'Autor',
    tableName: 'autores',
    timestamps: true
  });

  return Autor;
};