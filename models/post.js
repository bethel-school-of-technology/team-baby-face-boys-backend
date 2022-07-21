'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User)
    }
  }
  Post.init({
    postId: {
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    postTitle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postBody: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};