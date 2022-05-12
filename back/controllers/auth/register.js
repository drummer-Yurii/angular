const level = '../../';
// const { log, pro, lex } = require(`${level}my_modules/staff`);
import {log} from '../../colub/high-level/index.js';
import  { error, good, bad } from  '../../my_modules/lib.js';
import  auth  from '../../services/all/auth.service.js';

export default async (req, res) => {
  try {
    log('Con: Register', req.body).place();
    // do
    const result = await auth.registration(req.body);
    // send msg
    return (result.ok) ? good(null, req, res, 'User is registered') : bad(null, req, res, 409, result.msg);
  } catch (e) {
    log('Error:', e,);
    error(e, req, res, 500, 'Cannot register ');
  };
};

