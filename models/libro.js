'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Libro extends Model {
    static associate(models) {
      
      Libro.belongsToMany(models.Autor, {
        through: 'libro_autores',
        foreignKey: 'libro_id',
        otherKey: 'autor_id',
        as: 'autores'
      });
      
      Libro.hasMany(models.Prestamo, {
        foreignKey: 'libro_id',
        as: 'prestamos'
      });
    }
  }

  Libro.init({
    titulo: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: { notEmpty: true }
    },
    isbn: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      validate: { notEmpty: true }
    },
    anioPublicacion: {
      type: DataTypes.INTEGER
    },
    copiasDisponibles: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: { min: 0 }   
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Libro',
    tableName: 'libros',
    timestamps: true
  });

  return Libro;
};