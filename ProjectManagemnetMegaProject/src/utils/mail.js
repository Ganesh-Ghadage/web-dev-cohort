import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASSWORD,
    },
});

async function sendVerifyMail(email, token) {

    const options = {
        from: process.env.MAILTRAP_EMAIL,
        to: email, // list of receivers
        subject: "Verify your mail",
        text: `Plase click on below like to verify your email: ${process.env.BASE_URl}/api/v1/user/verify/${token}`, 
    }

    const info = await transporter.sendMail(options)

    // console.log(info)

    return info
}


export { sendVerifyMail }