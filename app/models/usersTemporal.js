const {sequelize} = require('../../config/mysql');
const {DataTypes} = require('sequelize');

const User = sequelize.define(
    'usuarios_temporales', 
    {
        email:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        password:{
            type: DataTypes.STRING,
        },
    },
    {
        timestamps:true,
    }
);

module.exports = User;