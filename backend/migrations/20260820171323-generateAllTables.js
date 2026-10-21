'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
      await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('Codes', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false
      },

      key: {
        type: Sequelize.STRING,
        allowNull: false
      },

      cryServer: {
        type: Sequelize.STRING,
        allowNull: true
      },

      fgsServer: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false // revisa tu modelo, tienes ''
      },

      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },

      type: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1
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

    await queryInterface.createTable('Departament', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false
      },

      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
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

    await queryInterface.createTable('Plants', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false
      },

      defaultCode: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Codes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      type: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1
      },

      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },

      APPKEY: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
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

    await queryInterface.createTable('Clients', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false
      },

      defaultCode: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Codes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
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

    await queryInterface.createTable('Machine', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },

      PlantId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Plants',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },

      CodesId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Codes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
      },

      ClientsId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Clients',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
      },

      machineCode: {
        type: Sequelize.STRING,
        allowNull: false
      },

      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
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

    await queryInterface.createTable('AgroupmentMachines', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },

      machine: {
        type: Sequelize.STRING,
        allowNull: false
      },

      machineToChange: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      Decription: {
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

    await queryInterface.createTable('Apps', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },

      KEY: {
        type: Sequelize.STRING,
        allowNull: false
      },

      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
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

    await queryInterface.createTable('Plans', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },

      machine: {
        type: Sequelize.STRING,
        allowNull: false
      },

      Capacity: {
        type: Sequelize.DECIMAL(18, 6),
        allowNull: false,
        defaultValue: 0
      },

      Line: {
        type: Sequelize.STRING,
        allowNull: false
      },

      Program: {
        type: Sequelize.STRING,
        allowNull: false
      },

      Shift: {
        type: Sequelize.STRING,
        allowNull: false
      },

      PartNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },

      Customer: {
        type: Sequelize.STRING,
        allowNull: false
      },

      LevenDesign: {
        type: Sequelize.STRING,
        allowNull: false
      },

      Shortpart: {
        type: Sequelize.STRING,
        allowNull: false
      },

      Kmh: {
        type: Sequelize.DECIMAL(18, 6),
        allowNull: false
      },

      d1: { type: Sequelize.INTEGER, allowNull: false },
      d2: { type: Sequelize.INTEGER, allowNull: false },
      d3: { type: Sequelize.INTEGER, allowNull: false },
      d4: { type: Sequelize.INTEGER, allowNull: false },
      d5: { type: Sequelize.INTEGER, allowNull: false },
      d6: { type: Sequelize.INTEGER, allowNull: false },
      d7: { type: Sequelize.INTEGER, allowNull: false },
      d8: { type: Sequelize.INTEGER, allowNull: false },
      d9: { type: Sequelize.INTEGER, allowNull: false },
      d10: { type: Sequelize.INTEGER, allowNull: false },
      d11: { type: Sequelize.INTEGER, allowNull: false },
      d12: { type: Sequelize.INTEGER, allowNull: false },
      d13: { type: Sequelize.INTEGER, allowNull: false },
      d14: { type: Sequelize.INTEGER, allowNull: false },
      d15: { type: Sequelize.INTEGER, allowNull: false },
      d16: { type: Sequelize.INTEGER, allowNull: false },
      d17: { type: Sequelize.INTEGER, allowNull: false },
      d18: { type: Sequelize.INTEGER, allowNull: false },
      d19: { type: Sequelize.INTEGER, allowNull: false },
      d20: { type: Sequelize.INTEGER, allowNull: false },
      d21: { type: Sequelize.INTEGER, allowNull: false },
      d22: { type: Sequelize.INTEGER, allowNull: false },
      d23: { type: Sequelize.INTEGER, allowNull: false },
      d24: { type: Sequelize.INTEGER, allowNull: false },
      d25: { type: Sequelize.INTEGER, allowNull: false },
      d26: { type: Sequelize.INTEGER, allowNull: false },
      d27: { type: Sequelize.INTEGER, allowNull: false },
      d28: { type: Sequelize.INTEGER, allowNull: false },
      d29: { type: Sequelize.INTEGER, allowNull: false },
      d30: { type: Sequelize.INTEGER, allowNull: false },
      d31: { type: Sequelize.INTEGER, allowNull: false },

      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
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
    await queryInterface.createTable('Rols', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false
      },

      display: {
        type: Sequelize.STRING,
        allowNull: false
      },

      ShowGenaralReports: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },

      CreateUsers: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },

      ResetPasswords: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },

      changeLayoutMachines: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },

      CreatePlants: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },

      CreateClients: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },

      CreatePlans: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },

      CreateCodes: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },

      UseDiferentDepartments: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },

      Level: {
        type: Sequelize.TINYINT,
        allowNull: false
      },

      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
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
    await queryInterface.createTable('Smhcas', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },

      ShortPart: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },

      Kmh: {
        type: Sequelize.DECIMAL(18, 6),
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

    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },

      Name: {
        type: Sequelize.STRING,
        allowNull: false
      },

      Email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },

      Password: {
        type: Sequelize.STRING,
        allowNull: false
      },

      RolId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Rols',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      DepartmentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Departament',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      PlantId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Plants',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      Lang:{
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1
      },
      TimeZone:{
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1
      },

      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
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

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('Codes');
    await queryInterface.dropTable('Departament');
    await queryInterface.dropTable('Plants');
    await queryInterface.dropTable('Clients');
    await queryInterface.dropTable('Machine');
    await queryInterface.dropTable('AgroupmentMachines');
    await queryInterface.dropTable('Apps');
    await queryInterface.dropTable('Rols');
    await queryInterface.dropTable('Smhcas');
    await queryInterface.dropTable('Users');
  }
};
