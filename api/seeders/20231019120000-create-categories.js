'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = [
      {
        name: 'Category 1',
        description: 'Description for Category 1',
        image: 'https://example.com/category1.jpg',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        name: 'Category 2',
        description: 'Description for Category 2',
        image: 'https://example.com/category2.jpg',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      // Add more categories as needed
    ];

    await queryInterface.bulkInsert('Categories', categories, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
