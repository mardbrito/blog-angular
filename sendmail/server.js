const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(3001, () => {
  console.log("The server started on port 3001 !!!!!!");
});

app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Wellcome <br><br>😃👻😃👻😃👻😃👻😃</h1>"
  );
});

app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, info => {
    console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
    res.send(info);
  });
});

async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'diamond.treutel63@ethereal.email',
      pass: 'TD3u9z2KK54nxQ9EQr'
    }
  });

  let mailOptions = {
    from: '"Marcelo Brito - Dev"<diamond.treutel63@ethereal.email>', // sender address
    to: 'diamond.treutel63@ethereal.email', // list of receivers
    subject: `"Wellcome ${user.name}"`, // Subject line
    html: `<h1>Hi ${user.name}</h1><br>
    <p>${user.message}</p>`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}
