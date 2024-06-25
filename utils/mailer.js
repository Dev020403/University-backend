const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'devkapadia123@gmail.com',
        pass: 'tzkx sakx wixz gavz'
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
