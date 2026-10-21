'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PriorityHasProcess', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },

      UrsPriorityId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'UrsPriority',
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
        onDelete: 'CASCADE'
      },
      Level: {
        type: Sequelize.TINYINT,
        allowNull: false
      },

    });

    
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.removeColumn('PriorityHasProcess', 'UrsPriorityId');
    await queryInterface.removeColumn('PriorityHasProcess', 'UrsProcessId');
    await queryInterface.dropTable('PriorityHasProcess');
  }
};
