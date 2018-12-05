module.exports = function(sequelize, DataTypes){
    var User = sequelize.define("User", {
        fbId:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        role: {
            type: DataTypes.TEXT,
            defaultValue: "user"
        }
    })
    return User;
}