import nodemailer from "nodemailer";
import dotenv from 'dotenv';

dotenv.config();

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            }
        });
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject: `Активация аккаунта на ${process.env.API_URL}`,
            text: '',
            html:
                `
                    <div>
                        <h1>Для активации аккаунта перейдите по ссылке</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        });
    }
}

export default new MailService();