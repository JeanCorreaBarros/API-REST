const {sequelize} = require('../../config/mysql');
const {DataTypes} = require('sequelize');

const User = sequelize.define(
    'usuarios', 
    {
        email:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        name:{
            type: DataTypes.STRING,
        },
        photo_perfil: {
            type: DataTypes.STRING,
        },
        password:{
            type: DataTypes.STRING,
        },
        user_perfil: {
            type: DataTypes.NUMBER,
        }
    },
    {
        timestamps:true,
    }
);

module.exports = User;