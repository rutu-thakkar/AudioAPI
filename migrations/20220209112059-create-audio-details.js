"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("audioDetails", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      audioName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      audioFile: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      audioLength: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("audioDetails");
  },
};
