import express from 'express';
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

import sessionGuard from '../guards/session.guard.js';
import { registerConroller, loginConroller, mailVerification } from '../controllers/auth.js';
import { userControllerPut, userControllerGet, userControllerGetAvatar} from '../controllers/user.js';
import { appControllerGet, appControllerPut} from '../controllers/app.js'
import { postControllerPost, postControllerGet, postControllerGetImg, postControllerDelete, postControllerPut} from '../controllers/post.js'





router.post('/api/auth/register', registerConroller);
router.post('/api/auth/login', loginConroller);
router.post('/api/auth/mail-verification', mailVerification);
router.all('/*', sessionGuard);

router.put('/api/user', userControllerPut);
router.get('/api/user', userControllerGet);
router.get('/api/avatar', userControllerGetAvatar);

router.get('/api/app-info', appControllerGet);
router.put('/api/app-info', appControllerPut);

router.post('/api/post', postControllerPost);
router.get('/api/post', postControllerGet);
router.get('/api/post-img/:id', postControllerGetImg)
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
