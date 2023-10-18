'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Define sample data to be seeded
    const brands = [
      { name: 'Brand 1', description: 'Description 1', image:"https://res.cloudinary.com/drq2xwi3o/image/upload/v1697625193/E-Commerce/2_g7egru.webp" ,createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
      { name: 'Brand 2', description: 'Description 2', image:"https://res.cloudinary.com/drq2xwi3o/image/upload/v1697625193/E-Commerce/2_g7egru.webp" ,createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
      // Add more sample data as needed
    ];

    // Use queryInterface.bulkInsert to insert data into the table
    await queryInterface.bulkInsert('Brands', brands, {});

   

  },

  down: async (queryInterface, Sequelize) => {
    // Use queryInterface.bulkDelete to remove seeded data (if needed)
    await queryInterface.bulkDelete('Brands', null, {});
  }
};