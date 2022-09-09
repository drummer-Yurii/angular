const level = '../../';
import { log } from 'high-level';
import { App } from '../../models/index.js';
import mailService from './mail.service.js';
import fs from 'fs';
import { cleanUpOldFiles } from '../../my_modules/fs-utils.js';
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
        const app = await App.findOneAndUpdate({}, msg);
        return { ok: true, app };
    };

    async editProcedure(msg) {
        const result = await this.edit(msg);
        await cleanUpOldFiles({
            path: 'uploads/about-page/',
            actualFiles: result.app.pages.about.articles.map((a) => a.fileName).filter(fn => !!fn)
        });
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