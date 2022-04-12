const {usersModel} = require('../models');

/**
 * Obtener lista de Usuarios
 * @param {*}req 
 * @param {*}res
 */
const getUsers = async  (req,res)=>{
    const data = await usersModel.findAll({});
    res.send(data)
}
 
/**
 * Obtener un usuarios por id
 * @param {*}req 
 * @param {*}res
 */
const getUser =  async (req,res)=>{
    const id = req.params
    const user = await usersModel.findByPk(id);
    res.send(user)
}

/**
 * Crear Usuario en Tabla Usuarios
 * @param {*}req 
 * @param {*}res
 */
const createUser =  async (req,res) => {
    const {body} = req
    const data = await usersModel.create(body)
    res.send({data})
}

/**
 * Actualizar Usuario por Id
 * @param {*}req 
 * @param {*}res
 */
const updateUser = (req,res)=>{}


/**
 * Eliminar Usuario por Id
 * @param {*}req 
 * @param {*}res
 */
const deleteUser = (req,res)=>{}

 


module.exports = {getUsers,getUser,createUser,updateUser,deleteUser};
