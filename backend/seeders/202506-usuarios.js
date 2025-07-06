'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Usuarios', [
      { nombre: 'Manuel', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Laura', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Carlos', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Usuarios', null, {});
  }
};
