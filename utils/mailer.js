const nodemailer = require("nodemailer");

async function mailer (to, subject, toTextBody, toHtmlBody) {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: Boolean(process.env.SMTP_SECURE),
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });
        console.log("args==>", to, subject, toTextBody, toHtmlBody);

        let info = await transporter.sendMail({
            from: '"reusic 👻" <noreply.reusic@gmail.com>', // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: toTextBody, // plain text body
            html: toHtmlBody, // html body
        });
        return info
    } catch (error) {
        console.log("NODE MAIL ERROR ==>", error);
        return error
    }
}



module.exports = { mailer };