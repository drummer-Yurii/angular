const level = '../../';
import { log } from '../colub/high-level/index.js';
import { error, good, bad } from '../my_modules/lib.js';
import { postService } from '../services/index.js';

const postControllerGet = async (req, res) => {
  try {
    log('Con: postConrollerGet').place();
    // do
    const result = await postService.getAll();
    // send msg
    return (result.ok) ? good(result, req, res, 'Posts') : bad(null, req, res, 409, result.msg);
  } catch (e) {
    log('Error:', e,);
    error(e, req, res, 500, 'Cannot get posts ');
  };
};
// const appControllerPut = async ( req, res) => {
//   try {
//     log('Con: appControllerPut').place();
//     const result = await appService.edit(req.body);
//     return (result.ok) ? good(result, req, res, 'App was edited') : bad(null, req, res, 409, result.msg);
//   } catch (e) {
//     log('Error:', e,);
//     error(e, req, res, 500, 'Cannot edit app info ');
//   };
// };
const postControllerPost = async ( req, res) => {
  try {
    log('Con: postControllerPost').place();
    const result = await postService.post(req.body);
    return (result.ok) ? good(result, req, res, 'Post was edited') : bad(null, req, res, 409, result.msg);
  } catch (e) {
    log('Error:', e,);
    error(e, req, res, 500, 'Cannot post');
  };
};

export {postControllerPost, postControllerGet}
