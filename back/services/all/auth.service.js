
const level = '../../';
const { log } = require(`${level}my_modules/staff`);
const userService = require('./user.service')

const self = {
  registration: async (o) => {
    // var-s
    const { password, username, firstName, lastName } = o;
    // checking
    if (!password) return { ok: false, err: 'Password required!' };
    if (!username) return { ok: false, err: 'Username required!' };
    // do
    const user = await userService.getOne({ username })
    if (!user) {
      const result = await userService.add({
        password,
        username,
        firstName,
        lastName,
      });
      if (!result.ok) return { ok: false, err: result.err };
    };
    return { ok: true }
  }
}
module.exports = self;