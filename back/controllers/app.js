const level = '../../';
import { log } from '../colub/high-level/index.js';
import { error, good, bad } from '../my_modules/lib.js';
import { appService } from '../services/index.js';

const appControllerGet = async (req, res) => {
  try {
    log('Con: appConrollerGet').place();
    // do
    const result = await appService.getInfo();
    // send msg
    return (result.ok) ? good(result, req, res, 'App info') : bad(null, req, res, 409, result.msg);
  } catch (e) {
    log('Error:', e,);
    error(e, req, res, 500, 'Cannot get app info ');
  };
};
const appControllerPut = async ( req, res) => {
  try {
    log('Con: appControllerPut').place();
    const result = await appService.edit(req.body);
    return (result.ok) ? good(result, req, res, 'App was edited') : bad(null, req, res, 409, result.msg);
  } catch (e) {
    log('Error:', e,);
    error(e, req, res, 500, 'Cannot edit app info ');
  };
};

export {appControllerGet, appControllerPut}
