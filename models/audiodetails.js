"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class audioDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  audioDetails.init(
    {
      audioName: DataTypes.STRING,
      audioFile: DataTypes.STRING,
      audioLength: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "audioDetails",
    }
  );
  return audioDetails;
};
