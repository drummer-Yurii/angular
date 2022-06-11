import { log } from '../../colub/high-level/index.js';
import { Post } from '../../models/index.js';
import fs from 'fs';
const fsp = fs.promises;


class PostService {
    constructor() { }
      getAll = async () => {
       const posts= await Post.find(); 
       return {ok:true,posts}   
    };

    getOne = async (q) => {
       const post= await Post.findOne(q);
       return{ok:true,post}
    };
    async post(post) {
        log(post).place()
        log('!!!!!!!!!!!!!!!!')
        const createdPost=await this.create(post);
        return { ok: true, post: createdPost};
    };
    create = async (o) => await new Post(o).save();
    async edit(_id, msg) {
        log(msg).place()
        await Post.findOneAndUpdate({ _id }, msg);
        return { ok: true };
    };

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