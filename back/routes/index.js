import express from 'express';
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

import sessionGuard from '../guards/session.guard.js';
import { registerConroller, loginConroller } from '../controllers/auth.js';
import { userControllerPut, userControllerGet } from '../controllers/user.js';


router.post('/api/auth/register', registerConroller);
router.post('/api/auth/login', loginConroller);
router.all('/*', sessionGuard);
router.put('/api/user', userControllerPut);
router.get('/api/user', userControllerGet);


router.post('/api/test', async (req, res) => {
  const data = req.body;
  res.json({
    ok: true,
    user: req.userSave
  })
});
export default router;
