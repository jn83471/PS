'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('UrsProcess', [{

      Name: "QA",
      Status:true,
      createdAt: now,
      updatedAt: now
    }, {
      Name: "Embarques",
      Status:true,
      createdAt: now,
      updatedAt: now
    }], {});
  
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
