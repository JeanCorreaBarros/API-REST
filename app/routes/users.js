const express = require('express');
const usersRouter = express.Router();
const {getUsers,getUser,createUser,deleteUser} = require('../controllers/users');


usersRouter.get('/',getUsers )
usersRouter.get('/',getUser )
usersRouter.post('/',createUser)
usersRouter.delete('/',deleteUser)





module.exports = usersRouter