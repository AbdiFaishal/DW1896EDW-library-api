'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'Categories',
      [
        {
          name: 'Fantasy',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Sci-Fi',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Documentary',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Mystery',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Education',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Romance',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
