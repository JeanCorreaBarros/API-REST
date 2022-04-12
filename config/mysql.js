const  {Sequelize} = require('sequelize');

const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;


const sequelize = new Sequelize(database,username,password,{
    host,
    dialect: "mysql"
});

const dbConnectMysql = async () => {
    try {
        await sequelize.authenticate();
        console.log('******** CONEXION CORRECTA ********') 
    } catch (e) {
        console.log('Error de Conexion') 
    }
}

module.exports = {sequelize,dbConnectMysql}