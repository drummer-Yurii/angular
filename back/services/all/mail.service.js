import { log } from '../../colub/high-level/index.js';
import elasticemail from 'elasticemail';


class MailService {
    constructor() { }
    async init() {
        this.client = elasticemail.createClient({
            username: 'uriirybachok@gmail.com',
            apiKey: process.env.NODEMAILER_API_KEY
        });
        log('init')

    }
    async send(name) {
        log('send')
        await this.init();
        switch (name) {
            case 'mailVerification':
                var msg = {
                    from: 'uriirybachok@gmail.com',
                    from_name: 'Urii',
                    to: 'drummer2009@ukr.net',
                    subject: 'Hello',
                    body_text: 'Hello World!'
                };

                this.client.mailer.send(msg, function (err, result) {
                    if (err) {
                        return console.error(err);
                    }

                    console.log(result);
                }); break;
        }


    }
    async after(err, res) {
        log(err, res)
        if (err) return { ok: false, err }
        else return { ok: true }
    }
}
export default new MailService();

