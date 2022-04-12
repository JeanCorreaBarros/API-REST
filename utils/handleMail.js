const nodemailer = require("nodemailer");

const mail = {
    user:'jeancorrea1000@gmail.com',
    pass:'dhcgtibzarjjnwbv'
}

 // create reusable transporter object using the default SMTP transport
 let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: mail.user, // generated ethereal user
      pass: mail.pass, // generated ethereal password
    },
  });

const sendEmail = async (email,subject,html) => {
    try {
            // send mail with defined transport object
        await transporter.sendMail({
            from: 'Nexus-It', // sender address
            to: email, // list of receivers
            subject, // Subject line
            text: "Hi! Community", // plain text body
            html, // html body
        });
          
    }catch (error){
          console.log('algo no esta bien con el email',error);
      }
}

const getTemplate = (email,token) => {
    return`
    <head>
       <link rel="stylesheet" href="./style.css">
    </head>

    <div id="email___content">
       <img src="https://i.imgur.com/eboNR82.png" alt="">
       <h2>Hola ${ email }</h2>
       <p>Para confirmar tu cuenta, ingresa al siguiente enlace</p>
       <a
        href="http://localhost:3001/user/confirm/${ token }"
        target="_blank"
        >Confirmar Cuenta</a>
    </div>
    `
    
};


module.exports = {getTemplate,sendEmail};

