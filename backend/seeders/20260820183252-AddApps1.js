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
     * 
    */
    const now = new Date();
    await queryInterface.bulkInsert('Apps', [{
      KEY: "LineMonitor",
      status: true,
      createdAt: now,
      updatedAt: now
    },
    {
      KEY: "URS",
      status: true,
      createdAt: now,
      updatedAt: now
    },
    {
      KEY: "HXH",
      status: true,
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
