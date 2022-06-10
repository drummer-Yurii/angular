import { log } from '../../colub/high-level/index.js';
import { Post } from '../../models/index.js';
import fs from 'fs';
const fsp = fs.promises;


class PostService {
    constructor() { }
    async post(post) {
        log(post).place()
        log('!!!!!!!!!!!!!!!!')
    }
    // async getInfo() {
    //     const info = await App.find();// отримати обєкт з бази данних
    //     return {
    //         ok: true,
    //         info
    //     }
    // };
    // async edit(msg) {
    //     log(msg).place()
    //     await App.findOneAndUpdate({}, msg);
    //     return { ok: true };
    // };
}

export default new PostService();