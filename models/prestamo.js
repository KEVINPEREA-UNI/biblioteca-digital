'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Prestamo extends Model {
    static associate(models) {
  
      Prestamo.belongsTo(models.Libro, {
        foreignKey: 'libro_id',
        as: 'libro'
      });
      
      Prestamo.belongsTo(models.Usuario, {
        foreignKey: 'usuario_id',
        as: 'usuario'
      });
    }
  }

  Prestamo.init({
    libro_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fechaPrestamo: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    fechaDevolucionEsp: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fechaDevolucionReal: {
      type: DataTypes.DATE,
      allowNull: true  
    }
  }, {
    sequelize,
    modelName: 'Prestamo',
    tableName: 'prestamos',
    timestamps: true
  });

  return Prestamo;
};