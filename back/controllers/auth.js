const level = '../../';
import { log } from '../colub/high-level/index.js';
import { error, good, bad } from '../my_modules/lib.js';
import { authService, mailService } from '../services/index.js';

const registerConroller = async (req, res) => {
  try {
    log('Con: Register', req.body).place();
    // do
    const result = await authService.registration(req.body);
    // send msg
    return (result.ok) ? good(null, req, res, 'User is registered') : bad(null, req, res, 409, result.msg);
  } catch (e) {
    log('Error:', e,);
    error(e, req, res, 500, 'Cannot register ');
  };
};
const loginConroller = async (req, res) => {
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
const mailVerification = async (req, res) => {
  try {
    log('Con: mailVerification');
    const result = await mailService.send();
    res.json({ ok: 'hz' });
  } catch (e) {
    log('Error:', e,);
    error(e, req, res, 500, 'Cannot send mail');
  }
}
export { registerConroller, loginConroller, mailVerification}