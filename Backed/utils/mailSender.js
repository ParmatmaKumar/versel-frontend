
const nodemailer = require("nodemailer");
const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASSWORD
            }
        })

        let info = await transporter.sendMail({
            from:"Sent Email By Golu Online courses Platform",
            to:`${email}`,
            subject:`${title}`,
            text:`${body}`
        })
    } catch (error) {
        console.error(error);
    }
}
module.exports = mailSender; 