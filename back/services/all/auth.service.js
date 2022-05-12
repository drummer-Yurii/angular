
const level = '../../';
import { log, randomString } from '../../colub/high-level/index.js';
import userService from './user.service.js';


const registration = async (o) => {
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
const login = async (o) => {
  // var-s
  const { password, username } = o;
  // checking
  if (!password) return { ok: false, msg: 'Password required!' };
  if (!username) return { ok: false, msg: 'Username required!' };
  // do
  const user = await userService.getOne({ username })
  if (!user) return { ok: false, msg: 'can not user' }
  const token = randomString(4);
  const { _id } = user;
  const msg = { token };
  await userService.edit(_id, msg)
  return { ok: true, token }
};

export default { registration, login };
