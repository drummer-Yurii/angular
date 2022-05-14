
const level = '../../';
import { log, randomString } from '../../colub/high-level/index.js';
import userService from './user.service.js';

class AuthService{
  constructor(){}
  async registration(o) {
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
  };
  async login(o) {
    // var-s
    const { password, username } = o;
    log(o).place()
    // checking
    if (!password) return { ok: false, msg: 'Password required!' };
    if (!username) return { ok: false, msg: 'Username required!' };
    log('if').place()
    // do
    const user = await userService.getOne({ username })
    log(user)
    if (!user) return { ok: false, msg: 'can not user' }
    const authToken = randomString(4);
    const { _id } = user;
    const msg = { authToken };
    await userService.edit(_id, msg)
    return { ok: true, authToken }
  };
  
};
export default new AuthService();