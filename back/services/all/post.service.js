import { log } from '../../colub/high-level/index.js';
import { Post } from '../../models/index.js';
import fs from 'fs';
const fsp = fs.promises;


class PostService {
    constructor() { }
    async get(q) {
        log(q)
        if (!q._id) return await this.getAll();
        if (q._id) return await this.getOne(q);
    };
    getAll = async () => {
        const posts = await Post.find();
        return { ok: true, posts }
    };

    getOne = async (q) => {
        const post = await Post.findOne(q);
        return { ok: true, post }
    };
    async post(post) {
        log(post).place()
        log('!!!!!!!!!!!!!!!!')
        const createdPost = await this.create(post);
        return { ok: true, post: createdPost };
    };
    create = async (o) => await new Post(o).save();
    async edit(_id, post) {
        log(post).place()
        await Post.findOneAndUpdate({ _id }, post);
        return { ok: true };
    };
    async editProcedure(_id, post) {
        // log(post).plase()
        await this.edit(_id, post);
        await this.cleanUpOldFiles(_id, post);
        return { ok: true };
    };
    async cleanUpOldFiles(_id, post) {
        const path = 'uploads/posts/' + _id;
        const files = await fsp.readdir(path);
        const oldFiles = files.filter((f) => {
            const isActual = post.blocks.some((b) => b.file == f);
            let isActualDiper = false
            post.blocks.forEach(b => {
                if(b.fileIdList) {
                    b.fileIdList.forEach(bb => {
                     if(bb.file == f) isActualDiper = true
                    })
                }
            }) 
            return !isActual && !isActualDiper;
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
    async delete(_id) {
        await Post.findOneAndRemove({ _id });
        // remove old post folder
        const path = 'uploads/posts/' + _id;
        await fsp.rm(path, { recursive: true, force: true });
        return { ok: true };
    };
    // async getImg(id) {
    //     const path = 'uploads/posts/' + id;
    //     const files = await fsp.readdir(path);
    //     const img = files.find((f) => f.split('.')[0] == 'post-img');
    //     console.log('IMG', img)
    //     return { ok: true, img };
    // };
    async getFileNames(id) {
        const path = 'uploads/posts/' + id;
        try {
            const files = await fsp.readdir(path);
            return { ok: true, files };
        } catch (error) {
            return { ok: false, files: [] };
        }
    }
}

export default new PostService();