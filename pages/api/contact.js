const nodemailer = require("nodemailer");

export default async function(req, res) {
    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
            user: process.env.NEXT_PUBLIC_SMTP_AUTH_USER,
            pass: process.env.NEXT_PUBLIC_SMTP_AUTH_PASSWORD,
        },
        secure: true,
    })

    const mailData = {
        from: `${process.env.NEXT_PUBLIC_SMTP_AUTH_USER}`,
        to: 'christopher.szab@gmail.com',
        subject: `Message from ${req.body.fullName}`,
        text: `${req.body.message}`,
        html: `<div>${req.body.message}</div>`
    }

    transporter.sendMail(mailData, (err, info) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else {
            return res.status(200).json({ success: 'Čoskoro o nás budete počuť.' });
        }
    })
}