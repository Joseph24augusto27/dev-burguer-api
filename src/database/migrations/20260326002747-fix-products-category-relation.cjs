'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 🔥 1. Verifica se a coluna "category" ainda existe e remove
    const table = await queryInterface.describeTable('products');

    if (table.category) {
      await queryInterface.removeColumn('products', 'category');
    }

    // 🔥 2. Verifica se "category_id" NÃO existe e cria
    if (!table.category_id) {
      await queryInterface.addColumn('products', 'category_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'categories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('products');

    // 🔁 Volta o estado anterior

    if (table.category_id) {
      await queryInterface.removeColumn('products', 'category_id');
    }

    if (!table.category) {
      await queryInterface.addColumn('products', 'category', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
  },
};