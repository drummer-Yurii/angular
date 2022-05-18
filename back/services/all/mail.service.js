// https://myaccount.google.com/lesssecureapps 
import nodemailer from 'nodemailer';
import { log } from '../../colub/high-level/index.js';

class MailService{
    constructor(){}
    async init(){
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: '',
                pass: ',
            },
            tls: {
                rejectUnauthorized: false
            },
            connectionTimeout: 1 * 20 * 1000
        });
    }
    async send(){
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
        this.transporter.sendMail(set, this.after);
    }
    async after(err, res){
        log(err, res)
        if (err) return {ok:false, err}
        else return {ok:true}
    }
}
export default new MailService();

