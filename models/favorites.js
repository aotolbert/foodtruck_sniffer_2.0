module.exports = function (sequelize, DataTypes) {
    var Favorite = sequelize.define("Favorite", {});
    Favorite.associate = models => {
        Favorite.belongsTo(models.FoodTruck, {
            foreignKey: {
                allowNull: false
            }
        });
        Favorite.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Favorite;
}