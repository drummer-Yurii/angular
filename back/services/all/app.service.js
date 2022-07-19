const level = '../../';
import { log } from '../../colub/high-level/index.js';
import { App } from '../../models/index.js';
import mailService from './mail.service.js';
import fs from 'fs';
const fsp = fs.promises;

async function init() {
    const appInfoArray = await App.find()
    const isFirstStart = appInfoArray.length == 0
    if (isFirstStart) await new App({ the: 'app' }).save();
}
init()
class AppService {
    constructor() { }
    async getInfo() {
        const info = await App.findOne();// отримати обєкт з бази данних
        return {
            ok: true,
            info
        }
    };
    async edit(msg) {
        log(msg).place()
        await App.findOneAndUpdate({}, msg);
        return { ok: true };
    };
    async getFiles() {
        const path = 'uploads/app/';
        try {
            const files = await fsp.readdir(path);
            return { ok: true, files };
        } catch (error) {
            return { ok: false, files: [] };
        }
    };
}


export default new AppService();