const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'YOUR_EMAIL@gmail.com',
    pass: 'YOUR_EMAIL_PASSWORD',
  },
});

exports.sendEmail = functions.https.onCall((data, context) => {
  const email = data.email;
  const subject = data.subject;
  const message = data.message;

  const mailOptions = {
    from: 'YOUR_EMAIL@gmail.com',
    to: email,
    subject: subject,
    text: message,
  };

  return mailTransport.sendMail(mailOptions)
    .then(() => {
      return { success: true };
    })
    .catch((error) => {
      console.error('There was an error while sending the email:', error);
      return { success: false, error: error };
    });
});
