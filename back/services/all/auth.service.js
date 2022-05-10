
const level = '../../';
const { log } = require(`${level}my_modules/staff`);
const userService = require('./user.service')

const self = {
  registration: async (o) => {
    // var-s
    const { password, username, firstName, lastName } = o;
    // checking
    if (!password) return { ok: false, msg: 'Password required!' };
    if (!username) return { ok: false, msg: 'Username required!' };
    // do
    const user = await userService.getOne({ username })
    if (!user) {
      const result = await userService.add({
        password,
        username,
        firstName,
        lastName,
      });
      if (!result.ok) return { ok: false, msg: result.msg };
    };
    return { ok: true }
  },
  login: async (o) => {
    // var-s
    const { password, username } = o;
    // checking
    if (!password) return { ok: false, msg: 'Password required!' };
    if (!username) return { ok: false, msg: 'Username required!' };
    // do
    const user = await userService.getOne({ username })
    if (!user) return { ok: false, msg: 'can not user' }
    const token = 'try to go'
    const { _id } = user;
    const msg = { token };
    await userService.edit(_id, msg)
    return { ok: true, token }
  }
}
module.exports = self;