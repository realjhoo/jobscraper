let nodemailer = require("nodemailer");
const cron = require("node-cron");
let constants = require("./constant");

// --------------------------------------------------------
function buildDate() {
  let date = new Date();
  let yr = date.getFullYear();
  let day = ("0" + date.getDay()).slice(-2);
  let month = ("0" + (date.getMonth() + 1)).slice(-2);

  return yr + "." + month + "." + day;
}

// --------------------------------------------------------
let transporter = nodemailer.createTransport({
  host: "smtp.aol.com",
  port: "587",
  auth: {
    service: "aol",
    user: "professorhoover@aol.com",
    pass: constants.pass,
  },
});

// --------------------------------------------------------
let mailOptions = {
  from: "professorhoover@aol.com",
  to: "jerry.hoover@ymail.com",
  subject: "Magic email for " + buildDate(),
  html: "<h2>Hi there!<h2><p>I <em>cannot</em> believe this worked</p>",
};

// --------------------------------------------------------
transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Mail sent! Response code: " + info.response);
  }
});
