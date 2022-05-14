const level = '../../';
import { log } from '../../colub/high-level/index.js';
import { error, good, bad } from '../../my_modules/lib.js';
import { authService } from '../../services/index.js';
log(authService).place()
export default async (req, res) => {
  try {
    log('Con: Login', req.body);
    // do
    const result = await authService.login(req.body);
    log(3)
    // send msg
    return (result.ok) ? good({ authToken: result.authToken }, req, res, 'User is login') : bad(null, req, res, 409, result.msg);
  } catch (e) {
    log('Error:', e,);
    error(e, req, res, 500, 'Cannot login ');
  };
};

