module.exports = function(sequelize, DataTypes){
    var User = sequelize.define("User", {
        fbid:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        favorites:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        role: {
            type: DataTypes.TEXT,
            defaultValue: "user"
        }
    })
    return User;
}