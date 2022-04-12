const {usersModel,usersTemporalModel} = require('../models');
const {matchedData} = require('express-validator');
const {tokenSign,verifyToken} = require('../../utils/handelJwt');
const {encrypt,compare} = require('../../utils/handlePassword');
const {getTemplate,sendEmail} = require('../../utils/handleMail')
const {handleHttpError,handleErrorResponse} = require('../../utils/handleError');
const { uuidv4 } = require('uuid');



/**
 * Controlador para Registrar Usuario
 * @param {*}req 
 * @param {*}res
 */
 const Register =  async (req,res)=>{
   try {
      req = matchedData(req);
      const password = await encrypt(req.password)
      const body = {...req,password}
      const dataUser = await usersTemporalModel.create(body);

      const data = {
        token: await tokenSign(dataUser),
        user: dataUser 
      }


      res.send({data})

  } catch (error) {
      console.log(error);
      handleHttpError(res,"ERROR_REGISTER_USER");
  }
    
}


/**
 * Controlador para Registrar Usuario
 * @param {*}req 
 * @param {*}res
 */
 const RegisterPrueba =  async (req,res)=>{
  try {
    req = matchedData(req);
    const password = await encrypt(req.password)
    const body = {...req,password};
    const email = body.email

     // Verificar que el usuario no exista el
     const user = await usersTemporalModel.findOne({where: { email: body.email }}) || null;

    if(user !== null) {
      return res.json({
        success: false,
        msg:"Usuario ya Existe"
      });
    }

    // Crear Usuario en Bd Temporal
    const dataUser = await usersTemporalModel.create(body);
    const Tk = await tokenSign(dataUser);
    const data = {
      token: Tk,
      user: dataUser 
    }

    // Obtener template
    const template = getTemplate(email,Tk);

    // Enviar el email
    await sendEmail(email,'este es un email de prueba',template);
    console.log('antes de save')
    console.log('despues de save')
    

    res.json({success:true,msg:'registrado correctamente'});

 } catch (error) {
     console.log(error);
     handleHttpError(res,"ERROR_REGISTER_USER");
 }
   
}

/**
 * Controlador para Confirmar  Usuario
 * @param {*}req 
 * @param {*}res
 */
const confirm = async (req, res) => {
  try {

     // Obtener el token
     const { token } = req.params;
     
     // Verificar la data
     const data = await getTokenData(token);

     if(data === null) {
          return res.json({
              success: false,
              msg: 'Error al obtener data'
          });
     }

     console.log(data);

     const { email, code } = data.data;

     // Verificar existencia del usuario
     const user = await User.findOne({ email }) || null;

     if(user === null) {
          return res.json({
              success: false,
              msg: 'Usuario no existe'
          });
     }

     // Verificar el código
     if(code !== user.code) {
          return res.redirect('/error.html');
     }

     // Actualizar usuario
     user.status = 'VERIFIED';
     await user.save();

     // Redireccionar a la confirmación
     return res.redirect('/confirm.html');
      
  } catch (error) {
      console.log(error);
      return res.json({
          success: false,
          msg: 'Error al confirmar usuario'
      });
  }
}


 
/**
 * Controller for login
 * @param {*} req
 * @param {*} res
 */
 const Login = async (req, res) => {
  try {
    const body = matchedData(req);
    console.log(body.email)
    const user = await usersTemporalModel.findOne({where: { email: body.email }});
    if (!user) {
      handleErrorResponse(res, "USER_NOT_EXISTS", 404);
      return;
    }
    const checkPassword = await compare(body.password, user.password);

    if (!checkPassword) {
      handleErrorResponse(res, "PASSWORD_INVALID", 401);
      return;
    }

    const tokenJwt = await tokenSign(user);

    const data = {
      token: tokenJwt,
      user: user,
    };

    res.send({ data });
  } catch (e) {
    handleHttpError(res, e);
  }
};





module.exports = {Login,Register,RegisterPrueba,confirm};
