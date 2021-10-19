const nodemailer = require("nodemailer");
const constants = require("./constant");

const getDayName = (index) => {
  return [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][index];
};

const getMonthName = (index) => {
  return [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][index];
};

// --------------------------------------------------
function buildDate() {
  let today = new Date();
  let dow = getDayName(today.getDay());
  let date = today.getDate();
  let month = getMonthName(today.getMonth());

  return `${dow}, ${date} ${month}`;
}

// ---------------------------------------------------
async function sendMail({ from, to, subject, html }) {
  let transporter = nodemailer.createTransport({
    host: "smtp.aol.com",
    port: "587",
    auth: {
      service: "aol",
      user: "professorhoover@aol.com",
      pass: constants.pass,
    },
  });
  await transporter.sendMail({ from, to, subject, html });
}

module.exports = { sendMail, buildDate };
