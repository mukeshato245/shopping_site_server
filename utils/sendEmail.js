const nodemailer = require('nodemailer')

exports.sendEmail = async(mailOptions) => {

    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER, // generated ethereal user
            pass: process.env.SMTP_PASS, // generated ethereal password
        },
    });
    
    let info = await transporter.sendMail({
        from: mailOptions.from,
        to: mailOptions.to,
        subject: mailOptions.subject,
        text: mailOptions.text,
        html: mailOptions.html
    });

    if(!info){
        console.log("Failed to send email")
    }
    else{
        console.log("Email send successfully")
    }
}