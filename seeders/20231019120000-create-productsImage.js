'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const productImages = [
      {
        product_id: 1,
        image: 'https://res.cloudinary.com/drq2xwi3o/image/upload/v1697625193/E-Commerce/2_g7egru.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 2,
        image: 'https://res.cloudinary.com/drq2xwi3o/image/upload/v1697625193/E-Commerce/2_g7egru.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more objects with your custom URLs as needed
    ];

    await queryInterface.bulkInsert('Product_Images', productImages, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Product_Images', null, {});
  }
};
