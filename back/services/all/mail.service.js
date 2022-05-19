// https://myaccount.google.com/lesssecureapps 
import nodemailer from 'nodemailer';
import { log } from '../../colub/high-level/index.js';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

class MailService {
    constructor() { }
    async init() {
        log('init')
        this.transporter = nodemailer.createTransport({
            port: 2525,
            // secure: false, // true for 587, false for other ports
            // requireTLS: true,
            // service: 'gmail',
            host: 'smtp.elasticemail.com',
            // port: 465,
            // secure: true,

            username: process.env.GMAIL_MAIL,
            apiKey: process.env.GMAIL_PASS
            // tls: {
            //     rejectUnauthorized: false
            // },
        })
        // api key .................пошукати
        // elasticmail example......пошукати і шукати приклад коду

        // this.transporter = nodemailer.createTransport({
        // host: 'smtp.gmail.com',
        //     port: 465,
        //     secure: true,
        //     auth: {
        //         user: process.env.GMAIL_MAIL,
        //         pass: process.env.GMAIL_PASS,
        //     },
        //     tls: {
        //         rejectUnauthorized: false
        //     },
        //     connectionTimeout: 1 * 20 * 1000
        // });
    }
    async send() {
        log('send')
        await this.init();
        const set = {
            from: 'me',
            to: 'drummer2009@ukr.net',
            subject: 'mail confirmation',
            html: `
                 <p>
                 To verify your mail, go to this link. 
                 <a href="" target="_blank">link</a>
                 </p>
            `
        };
        // this.transporter.sendMail(set, this.after);
        this.transporter.sendMail(set, async (err, res) => {
            log(res, 'after', err)
            err
                ? { ok: false, msg: 'Can not send Email!', err }
                : { ok: true, msg: 'Email Sent' };
        });

    }
    async after(err, res) {
        log(err, res)
        if (err) return { ok: false, err }
        else return { ok: true }
    }
}
export default new MailService();

