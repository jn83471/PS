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
    await queryInterface.createTable('UrsRequestsFolio', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },

      Qty: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      Verify: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0
      },
      motive: {
        type: Sequelize.STRING,
        allowNull: false
      },
      RequestUserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      AprovedUserBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      FinishUserBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      FinishUserSMTSBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      RecibedUserBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      ClosedUserId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      Process: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0
      },

      ProposedDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      DeliveryDay: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      ClosedDay: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      CancelDay: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      LastProcessDay: {
        type: Sequelize.DATE,
        allowNull: true,
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
      FinishUserSMTSDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      SMTSLastVerificationUser:{
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      SMTSLastVerification: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      hrs: {
        type: Sequelize.DATE,
        allowNull: false,
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
    await queryInterface.addColumn('UrsRequests', 'UrsRequestsFolioId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'UrsRequestsFolio',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('UrsRequests', 'UrsRequestsFolioId');
    await queryInterface.dropTable('UrsRequestsFolio');
  }
};
