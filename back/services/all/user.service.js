const level = '../../';
import { log } from '../../colub/high-level/index.js';
import User from '../../models/user.js';

// getAll: async () => null,
// getByToken: async () => null,
const getOne = async (q) => await User.findOne(q);
const add = async (msg) => {
    const usernameOccupied = await self.getOne({ username: msg.username }); // User already exists  ?
    if (usernameOccupied) return { ok: false, msg: 'User already exists!' };
    await self.create(msg);
    return { ok: true };
};
const create = async (o) => await new User(o).save();
// delAll: async () => null,
const edit = async (_id, msg) => {
    await User.findOneAndUpdate({ _id }, msg);
    return { ok: true };
};
// fake: async () => null,

export default { getOne, create, edit, add };