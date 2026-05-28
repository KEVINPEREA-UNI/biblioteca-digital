'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('libro_autores', {
      libro_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      autor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('libro_autores');
  }
};