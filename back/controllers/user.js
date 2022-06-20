const level = '../../';
import { log } from '../colub/high-level/index.js';
import { error, good, bad } from '../my_modules/lib.js';
import { userService } from '../services/index.js';

const userControllerPut = async (req, res) => {
  try {
    log('Con: UserPut', req.body).place();
    // do
    const result = await userService.edit(req.user._id, req.body);
    // send msg
    return (result.ok) ? good(null, req, res, 'User is registered') : bad(null, req, res, 409, result.msg);
  } catch (e) {
    log('Error:', e,);
    error(e, req, res, 500, 'Cannot register ');
  };
};
const userControllerGet = async (req, res) => {
  try {
    log('Con: UserGet', req.body).place();
    // do
    res.json({
      ok: true,
      user: req.userSave
    });
  } catch (e) {
    log('Error:', e,);
    error(e, req, res, 500, 'Cannot register ');
  };
};
const userControllerGetAvatar = async (req, res) => {
  try {
    log('Con: userControllerGetAvatarExtention').place();
    // do
    const result = await userService.getAvatar(req.user.username);
    // send msg
    return (result.ok) ? good(result, req, res, 'The user avatar extention') : bad(null, req, res, 409, result.msg);
  } catch (e) {
    log('Error:', e,);
    error(e, req, res, 500, 'Cannot get user avatart extention ');
  };
};
export { userControllerPut, userControllerGet, userControllerGetAvatar }

// class RegisterController extends Controller {
//   conName = 'Register';
//   successMsg = 'User is registered';
//   unSuccessMsg = 'Cannot register!';
//   errMsg = `Error! ${this.unSuccessMsg}`;
//   constructor() { super() }
//   do = async _ => this.result = await AuthService.registration(this.req.body);
//   fork = _ => this.result.ok ? this.successDTO : this.unSuccessDTO
// }

// class ChangePasswordController extends Controller {
//   conName = 'Change password';
//   successMsg = 'Password changed';
//   unSuccessMsg = 'Cannot change password!';
//   errMsg = `Error! ${this.unSuccessMsg}`;
//   constructor() { super() }
//   do = async _ => this.result = await AuthService.changePassword(this.req.body, this.req.user._id, this.req.user.password);
//   fork = _ => this.result.ok ? this.successDTO : this.unSuccessDTO
// }