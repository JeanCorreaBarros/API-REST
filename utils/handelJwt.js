const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;


/**
 * Firmar Token
 * Debes de pasar el Objeto del usuario
 * @param {*}user
 */
const tokenSign = async (user) => {
    const sign =  jwt.sign(
        {
            email:user.email
        },
        JWT_SECRET,
        {
          expiresIn:"2h" 
        }
    );
    return sign
}

/**
 * verificar token
 * Debes de pasar el Token de Session el JWT
 */
const verifyToken = async (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt,JWT_SECRET);
        
    } catch (error) {
        return null;
        
    }
}

module.exports = {tokenSign, verifyToken};