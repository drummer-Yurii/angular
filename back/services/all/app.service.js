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
        const app = await App.findOneAndUpdate({}, msg);
        return { ok: true, app };
    };

    async editProcedure(msg) {
        // log(post).plase()
        // const app = await (await this.edit(msg)).app;
        const result = await this.edit(msg);
        await this.cleanUpOldFiles(result.app);
        return { ok: true };
    };

    async cleanUpOldFiles(app) {
        const path = 'uploads/about-page/';
        const files = await fsp.readdir(path);
        const oldFiles = files.filter((f) => {
            const isActual = app.pages.about.articles.some((a) => a.fileName == f);
            return !isActual;
        });
        log('oldFiles', oldFiles);
        oldFiles.forEach((f)=>{
            const pathToFile = path + '/' + f  
            try {
                fs.unlink(pathToFile, () => {
                    console.log('deleted', pathToFile);
                });
            } catch (error) {
                console.log('can not deleted', pathToFile);
            }
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