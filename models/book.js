'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.belongsTo(models.Category, {
        foreignKey: {
          name: 'categoryId',
        },
        as: 'category',
      });
      Book.belongsTo(models.User, {
        foreignKey: {
          name: 'userId',
        },
        as: 'user',
      });
      // Book.hasMany(models.Bookmark, {
      //   as: 'bookmarks',
      // });
    }
  }
  Book.init(
    {
      title: DataTypes.STRING,
      publication: DataTypes.STRING,
      categoryId: DataTypes.STRING,
      userId: DataTypes.STRING,
      pages: DataTypes.STRING,
      ISBN: DataTypes.BIGINT,
      aboutBook: DataTypes.STRING(1234),
      file: DataTypes.STRING,
      status: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Book',
    }
  );
  return Book;
};
