const express = require('express');
const nodemailer = require("nodemailer");
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

let smtp_login = process.env.SMTP_LOGIN || '---';
let smtp_password = process.env.SMTP_PASSWORD || '---';

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    // host: "smtp.ethereal.email",
    port: 25,
    tls: {
        rejectUnauthorized: false
    },
    secure: false, // true for 465, false for other ports
    auth: {
      user: smtp_login, // generated ethereal user
      pass: smtp_password, // generated ethereal password
    },
  });

app.get('/', function (req, res) {
  res.send('Hello World!');

});

app.post('/sendMessage', async function (req, res) {
    let {message, contacts, name} = req.body;
    res.send('Ok');
    // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'MY PROFILE PAGE', // sender address
    to: "772316andrew@gmail.com", // list of receivers
    subject: "hr wants me", // Subject line
    //text: "bla bla", // plain text body
    html: `<div><b>name: ${name}</b></div>
           <div><b>contacts: ${contacts}</b></div>
           <div><b>message: ${message}</b></div>`
     // html body
     
  });
  });

let port = process.env.PORT || 3010;

app.listen(port, function () {
  console.log('Example app listening on port 3010!');
});