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
      await queryInterface.createTable('MachineEvents', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        MachinesId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Machines',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'NO ACTION'
        },
        Type: {
          type: Sequelize.TINYINT,
          allowNull: false,
        },
        Description: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        Start: {
          type: Sequelize.TIME,
          allowNull: false,
          defaultValue: Sequelize.fn('GETDATE')
        },
        End: {
          type: Sequelize.TIME,
          allowNull: false,
          defaultValue: Sequelize.fn('GETDATE')
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


      await queryInterface.createTable('MachineTime', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        MachinesId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: true,
          references: {
            model: 'Machines',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'NO ACTION'
        },
        h7: {
          type: Sequelize.TINYINT,
          allowNull: false,
          defaultValue: 60
        },
        h8: {
          type: Sequelize.TINYINT,
          allowNull: false,
          defaultValue: 60
        },
        h9: {
          type: Sequelize.TINYINT,
          allowNull: false,
          defaultValue: 60
        },
        h10: {
          type: Sequelize.TINYINT,
          allowNull: false,
          defaultValue: 60
        },
        h11: {
          type: Sequelize.TINYINT,
          allowNull: false,
          defaultValue: 60
        },
        h12: {
          type: Sequelize.TINYINT,
          allowNull: false,
          defaultValue: 60
        },
        h13: {
          type: Sequelize.TINYINT,
          allowNull: false,
          defaultValue: 60
        },
        h14: {
          type: Sequelize.TINYINT,
          allowNull: false,
          defaultValue: 60
        },
        h15: {
          type: Sequelize.TINYINT,
          allowNull: false,
          defaultValue: 60
        },
        h16: {
          type: Sequelize.TINYINT,
          allowNull: false,
          defaultValue: 60
        },
        h17: {
          type: Sequelize.TINYINT,
          allowNull: false,
          defaultValue: 60
        },
        h18: {
          type: Sequelize.TINYINT,
          allowNull: false,
          defaultValue: 60
        },
        h19: {
          type: Sequelize.TINYINT,
          allowNull: false,
          defaultValue: 60
        },
        h20: {
          type: Sequelize.TINYINT,
          allowNull: false,
          defaultValue: 60
        },
        h21: {
          type: Sequelize.TINYINT,
          allowNull: false,
          defaultValue: 60
        },
        h22: {
          type: Sequelize.TINYINT,
          allowNull: false,
          defaultValue: 60
        },
        h23: {
          type: Sequelize.TINYINT,
          allowNull: false,
          defaultValue: 60
        },
        h0: {
          type: Sequelize.TINYINT,
          allowNull: false,
          defaultValue: 60
        },
        h1: {
          type: Sequelize.TINYINT,
          allowNull: false,
          defaultValue: 60
        },
        h2: {
          type: Sequelize.TINYINT,
          allowNull: false,
          defaultValue: 60
        },
        h3: {
          type: Sequelize.TINYINT,
          allowNull: false,
          defaultValue: 60
        },
        h4: {
          type: Sequelize.TINYINT,
          allowNull: false,
          defaultValue: 60
        },
        h5: {
          type: Sequelize.TINYINT,
          allowNull: false,
          defaultValue: 60
        },
        h6: {
          type: Sequelize.TINYINT,
          allowNull: false,
          defaultValue: 60
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

    //await queryInterface.removeColumn('MachineTime', 'MachinesId');
    await queryInterface.dropTable('MachineTime');
    //await queryInterface.removeColumn('MachineEvents', 'MachinesId');
    await queryInterface.dropTable('MachineEvents');
  }
};
