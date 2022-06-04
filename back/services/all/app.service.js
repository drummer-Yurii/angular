const level = '../../';
import { log } from '../../colub/high-level/index.js';
import { App } from '../../models/index.js';
import mailService from './mail.service.js';
import fs from 'fs';
const fsp = fs.promises;

class AppService {
    constructor() { }
    getInfo() {
        return {
            ok: true,
            info: { companyName: 'salut' }
        }
    }
}

export default new AppService();