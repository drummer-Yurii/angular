import { log } from '../../colub/high-level/index.js';
import { Post } from '../../models/index.js';
import fs from 'fs';
const fsp = fs.promises;


class PostService {
    constructor() { }
    async get (q) {
        log(q)
        if(!q._id) return await this.getAll();
        if(q._id) return await this.getOne(q);
    };
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
    async delete(_id) {
        await Post.findOneAndRemove({_id});
        return { ok: true };
    };

    async getImg(id) {
        const path =  'uploads/posts/' + id;
       const files = await fsp.readdir( path );
       const img = files.find((f)=> f.split('.')[0] == 'post-img');
       console.log('IMG', img)
       
        return { ok: true, img };
    };
}

export default new PostService();