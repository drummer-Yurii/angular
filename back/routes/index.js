import express from 'express';
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

import sessionGuard from '../guards/session.guard.js';
import adminGuard from '../guards/admin.guard.js';
import { registerConroller, loginConroller, mailVerification } from '../controllers/auth.js';
import { userControllerPut, userControllerGet, userControllerGetAvatar} from '../controllers/user.js';
import { appControllerGet, appControllerPut, appControllerGetFiles} from '../controllers/app.js'
import { postControllerPost, postControllerGet, postControllerDelete, postControllerPut, postControllerFileNames} from '../controllers/post.js'





router.post('/api/auth/register', registerConroller);
router.post('/api/auth/login', loginConroller);
router.post('/api/auth/mail-verification', mailVerification);
router.get('/api/app-info', appControllerGet);
router.get('/api/app-files', appControllerGetFiles);
router.get('/api/avatar', userControllerGetAvatar);
router.get('/api/post', postControllerGet);
router.get('/api/post-file-names/:id', postControllerFileNames);

router.all('/*', sessionGuard); // -----------> GUARD <-------------- //
router.get('/api/user', userControllerGet);
router.put('/api/user', userControllerPut);

router.all('/*', adminGuard); // -----------> GUARD <-------------- //
router.put('/api/app-info', appControllerPut);
router.post('/api/post', postControllerPost);
router.delete('/api/post/:id', postControllerDelete);
router.put('/api/post/:id', postControllerPut);









router.post('/api/test', async (req, res) => {
  const data = req.body;
  res.json({
    ok: true,
    user: req.userSave
  })
});
export default router;
