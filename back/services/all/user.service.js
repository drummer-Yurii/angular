const level = '../../';
import { log } from '../../colub/high-level/index.js';
import { User } from '../../models/index.js';
class UserService {
    constructor() { }

    // getAll: async () => null,
    // const getByToken = async (token) => await getOne({token});
    // async getByToken(authToken) {
    //     log(authToken).place()
    //     return await getOne({authToken})
    // };
    getOne = async (q) => await User.findOne(q);
    async add(msg) {
        const usernameOccupied = await getOne({ username: msg.username }); // User already exists  ?
        if (usernameOccupied) return { ok: false, msg: 'User already exists!' };
        await self.create(msg);
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