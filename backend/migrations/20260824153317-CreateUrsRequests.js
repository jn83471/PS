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
    await queryInterface.createTable('UrsRequests', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      CodeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Codes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      PartNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      CustomerPartNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Customer: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Qty: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      Scann: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      Reason: {
        type: Sequelize.STRING,
        allowNull: false
      },
      
      Process: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0
      },
      UrsPriorityId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'UrsPriority',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('GETDATE')
      },

      ProposedDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('GETDATE')
      }
    });
    
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('UrsRequests');

  }
};
