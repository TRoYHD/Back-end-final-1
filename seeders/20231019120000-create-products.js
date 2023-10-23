'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Define sample data to be seeded
    const products = [
      {
        name: 'Product 1',
        description: 'Description 1',
        color: 'Red',
        price: 50.0,
        discount: 10,
        rating: 4.5,
        isLimited: true,
        category_id: 1, // Replace with the appropriate category ID
        brand_id: 1, // Replace with the appropriate brand ID
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        name: 'Product 2',
        description: 'Description 2',
        color: 'Blue',
        price: 70.0,
        discount: 5,
        rating: 4.2,
        isLimited: false,
        stock: 15,
        category_id: 2, // Replace with the appropriate category ID
        brand_id: 2, // Replace with the appropriate brand ID
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        name: 'Product 3',
        description: 'Description 1',
        color: 'greem',
        price: 50.0,
        discount: 10,
        rating: 4.5,
        isLimited: true,
        stock: 15,
        category_id: 1, // Replace with the appropriate category ID
        brand_id: 1, // Replace with the appropriate brand ID
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      // Add more sample products as needed
    ];

    // Use queryInterface.bulkInsert to insert data into the table
    await queryInterface.bulkInsert('Products', products, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Use queryInterface.bulkDelete to remove seeded data (if needed)
    await queryInterface.bulkDelete('Products', null, {});
  }
};
