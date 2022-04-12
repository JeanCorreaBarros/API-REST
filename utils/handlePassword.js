const bcrypt = require('bcryptjs');


/**
 * Contraseña Sin encriptar
 * @param {*} passwordPlain 
 */
const encrypt = async (passwordPlain)=>{
    const hash = await bcrypt.hash(passwordPlain,8)
    return hash
}

/**
 * Pasar Contraseña sin encriptar y pasar contraseña encriptada
 * @param {*} passwordPlain 
 * @param {*} hashPassword 
 */
const compare = async (passwordPlain, hashPassword)=>{
    return await bcrypt.compare(passwordPlain, hashPassword)
    
}

module.exports = {encrypt,compare};