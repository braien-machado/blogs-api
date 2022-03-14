const User = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, { tableName: 'Users', timestamps: false });

  user.associate = (models) => {
    user.hasMany(models.BlogPost, {
      foreignKey: 'userId', as: 'posts',
    });
  };

  return user;
};

module.exports = User;