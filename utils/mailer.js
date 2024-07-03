const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'devkapadia123@gmail.com',
        pass: process.env.PASS_CODE
    }
});

const sendMail = (to, subject, text) => {
    const mailOptions = {
        from: 'devkapadia123@gmail.com',
        to,
        subject,
        text
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendMail;
