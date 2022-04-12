require("dotenv").config();
const express = require('express');
const {dbConnectMysql} = require('./config/mysql')
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const router = require('./app/routes/index')


// initial App //
const app = express()
const port = process.env.PORT;




// midedleware //
app.use(express.json());
app.use(express.text());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({limit:'20mb', extended: true }))
app.use(bodyParser.json({limit:'20mb'}))




// routes //
app.get('/', (req, res) => {
    res.send('Welcome to Genomax /*** API-REST ****/ ')
})
app.use('/', router)



//server running //
app.listen(port,() => {
   console.log(`Server Genomax-MD Ready in Port + ${port} `);
})


dbConnectMysql();