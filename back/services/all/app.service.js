const level = '../../';
import { log } from '../../colub/high-level/index.js';
import { App } from '../../models/index.js';
import mailService from './mail.service.js';
import fs from 'fs';
const fsp = fs.promises;

async function init(){
    const appInfoArray = await App.find()
    const isFirstStart = appInfoArray.length==0
    if(isFirstStart) await new App({the:'app'}).save();
}
init()
class AppService {
    constructor() { }
    getInfo() {
        return {
            ok: true,
            info: { companyName: 'salut' }
        }
    };
    async edit(msg) {
        log(msg).place()
        await App.findOneAndUpdate({}, msg);
        return { ok: true };
    };
}

export default new AppService();