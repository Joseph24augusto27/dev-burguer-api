'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const tableDescription = await queryInterface.describeTable('products');

    if (tableDescription.category) {
      await queryInterface.removeColumn('products', 'category');
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'category', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};