'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const now = new Date();
    await queryInterface.bulkInsert('UrsPriority', [{
      name: "Hand Carry",
      Level: 1,
      createdAt: now,
      updatedAt: now
    },
    {
      name: "Regular",
      Level: 0,
      createdAt: now,
      updatedAt: now
    },
    {
      name: "Troca Especial",
      Level: 0,
      createdAt: now,
      updatedAt: now
    },
    {
      name: "Charter",
      Level: 0,
      createdAt: now,
      updatedAt: now
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

  }
};
