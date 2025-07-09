'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UsuarioPeliculas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Usuarios', 
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      peliculaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Peliculas',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      guardado: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      meGusta: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      vista: {
        type: Sequelize.BOOLEAN,
        defaultValue: null // null = no definido, true/false = definido
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UsuarioPeliculas');
  }
};
