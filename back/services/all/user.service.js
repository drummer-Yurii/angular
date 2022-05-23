const level = '../../';
import { log } from '../../colub/high-level/index.js';
import { User } from '../../models/index.js';
import cryptoService from './crypto.service.js';
import mailService from './mail.service.js';

class UserService {
    constructor() { }

    // getAll: async () => null,
    // const getByToken = async (token) => await getOne({token});
    // async getByToken(authToken) {
    //     log(authToken).place()
    //     return await getOne({authToken})
    // };
    getOne = async (q) => await User.findOne(q);
    async add(newUser) {
        const usernameOccupied = await this.getOne({ username: newUser.username }); // User already exists  ?
        if (usernameOccupied) return { ok: false, msg: 'User already exists!' };
        const emailOccupied = await this.getOne({ email: newUser.email }); // User already exists  ?
        if (emailOccupied) return { ok: false, msg: 'Email already exists!' };
        const hash =  cryptoService.hash(newUser.password)
        log(hash).place()
        newUser.password = hash;
        await this.create(newUser);
        await mailService.send('mailVerification');
        return { ok: true };
    };
    create = async (o) => await new User(o).save();
    // delAll: async () => null,
    async edit(_id, msg) {
        log(msg).place()
        await User.findOneAndUpdate({ _id }, msg);
        return { ok: true };
    };
    // fake: async () => null,
}

export default new UserService();