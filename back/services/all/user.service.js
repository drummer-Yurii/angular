const level = '../../';
const { log } = require(`${level}my_modules/staff`);
log('heyyy')
// const { User } = require(`${level}models`);
const User = require(`${level}models/user.js`);
const self = {
    getAll: async () => null,
    getByToken: async () => null,
    getOne: async (q) => await User.findOne(q),
    add: async (msg) => {
        console.log('user add')
        const usernameOccupied = await self.getOne({ username: msg.username }); // User already exists  ?
        if (usernameOccupied) return { ok: false, msg: 'User already exists!' };
        // const userInfo = {
        //     username: msg.username,
        //     password: msg.password,
        //     firstName: msg.firstName,
        //     lastName: msg.lastName
        // };
        await self.create(msg);
        return { ok: true };
    },
    create: async (o) => await new User(o).save(),
    delAll: async () => null,
    edit: async () => null,
    fake: async () => null,
};
module.exports = self;