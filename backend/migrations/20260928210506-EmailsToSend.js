'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('EmailsToSend', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },

        Key: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        Emails: {
          type: Sequelize.STRING,
          allowNull: false
        },

        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('GETDATE')
        },

        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('GETDATE')
        }

      });
    } catch (error) {
      console.log('ERROR COMPLETO');
      console.dir(error, { depth: null });

      console.log('PARENT');
      console.log(error.parent);
      console.log('ORIGINAL');
      console.log(error.original);
      console.log('MESSAGE');
      console.log(error.message);
      throw error;
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('EmailsToSend');
  }
};
