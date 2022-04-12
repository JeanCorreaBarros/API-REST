const express = require('express');
const Routes = express.Router();
const {Login,Register,RegisterPrueba} = require('../controllers/auth');
const {validatorRegister,validatorlogin  }= require('../../validators/auth');


/**
 * Crear un Registro
 * //TODO http://localhost:3001/auth/register
 */
Routes.post('/register',validatorRegister ,Register);
Routes.post('/signup',validatorRegister ,RegisterPrueba);

/** 
 * Ingresar al Dashboard
 * //TODO http://localhost:3001/auth/login
*/
Routes.post('/login',validatorlogin,Login)


module.exports = Routes