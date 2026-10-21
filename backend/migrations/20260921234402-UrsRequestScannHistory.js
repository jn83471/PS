'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    try {
      await queryInterface.createTable('UrsRequestScannHistory', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },

        UrsRequestsId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'UrsRequests',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },

        UrsProcessId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'UrsProcess',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'NO ACTION'
        },

        Box: {
          type: Sequelize.STRING,
          allowNull: false
        },
        Qty: {
          type: Sequelize.INTEGER,
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

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn('UrsRequestScannHistory', 'UrsRequestsId');
    await queryInterface.removeColumn('UrsRequestScannHistory', 'UrsProcessId');
    await queryInterface.dropTable('UrsRequestScannHistory');
  }
};
