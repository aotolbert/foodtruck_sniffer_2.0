module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        fbId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        role: {
            type: DataTypes.TEXT,
            defaultValue: "user"
        }

    });
    User.associate = models => {
        User.hasMany(models.Favorite, {
            onDelete: "cascade"
        });
    };
    return User;
}