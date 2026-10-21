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
    await queryInterface.bulkInsert('AppsPermisions', [{
      AppsId: 2,
      KEY: "Request",
      createdAt: now,
      updatedAt: now
    }, {
      AppsId: 2,
      KEY: "VERIFICATE",
      createdAt: now,
      updatedAt: now
    },
    {
      AppsId: 2,
      KEY: "SCANN",
      createdAt: now,
      updatedAt: now
    }
  ,
    {
      AppsId: 2,
      KEY: "ADDUSERS",
      createdAt: now,
      updatedAt: now
    }
  ,
    {
      AppsId: 2,
      KEY: "VERIFICATEFIRST",
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
