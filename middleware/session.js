const {handleHttpError} = require("../utils/handleError")
const {verifyToken} = require("../utils/handelJwt")



const authMiddleware = async(req,res,next) => {
    try {
        if(!req.headers.authorization){
            handleHttpError(res,"NOT_TOKEN",401);
            return;

        }

        const token = req.headers.authorization.split("").pop();
        const dataToken = await verifyToken(token);

        if(!dataToken.email){
            handleHttpError(res,"ERROR_EMAIL_TOKEN",401);
            return;
        }

        next();
        
    } catch (error) {
        handleHttpError(res,"NOT_SESSION",401)
        
    }

}

module.exports = {authMiddleware};