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
    await queryInterface.bulkInsert('PriorityHasProcess', [{

      UrsPriorityId: 1,
      UrsProcessId: 1,
      Level:0
    }, {
      UrsPriorityId: 1,
      UrsProcessId: 2,
      Level:1
    }
    , {
      UrsPriorityId: 2,
      UrsProcessId: 1,
      Level:0
    }
    , {
      UrsPriorityId: 2,
      UrsProcessId: 2,
      Level:1
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
