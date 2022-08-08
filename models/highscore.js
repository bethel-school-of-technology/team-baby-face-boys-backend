'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HighScore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      this.belongsTo(models.User)
    }
  }
  HighScore.init({
    WhackAMole: DataTypes.INTEGER,
    memoryGame: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'HighScore',
  });
  return HighScore;
};