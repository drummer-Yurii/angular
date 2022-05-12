const level = '../../';
import {log} from '../../colub/high-level/index.js';
import  { error, good, bad } from  '../../my_modules/lib.js';
import  auth  from '../../services/all/auth.service.js';
log(auth.login).place()
export default async (req, res) => {
  try {
    log('Con: Login', req.body);
    // do
    const result = await auth.login(req.body);
    // send msg
    return (result.ok) ? good({ token: result.token }, req, res, 'User is login') : bad(null, req, res, 409, result.msg);
  } catch (e) {
    log('Error:', e,);
    error(e, req, res, 500, 'Cannot login ');
  };
};

