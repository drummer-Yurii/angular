const log = console.log
// const { json } = require('express');
// var express = require('express');
import express from 'express';
var router = express.Router();
let users = [];

//
// DB: connection,reading of users
//
// (async () => {
//   client = redis.createClient();
//   client.on('error', (err) => console.log('Redis Client Error', err));
//   await client.connect();
//   const usersJSON = await client.get('users')
//   try {
//     users = JSON.parse(usersJSON)
//   } catch (error) {
//     log('can not read users from DB')
//   }
//   log(users)
// })();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
const level='../'
const authControllers=`${level}controllers/auth`;
import registerConroler from '../controllers/auth/register.js';
import loginConroler from '../controllers/auth/login.js';

router.post('/api/auth/register',registerConroler);
router.post('/api/auth/login',loginConroler);
import sessionGuard from '../guards/session.guard.js';
router.all('/*', sessionGuard );

router.post('/api/test', async (req, res) => {
  const data = req.body;
  res.json({
    ok: true,
    user: req.userSave
  })
})

router.get('/api/profile', async (req, res) => {
  res.json({
    ok: true,
    user: req.userSave
  })
})
router.put('/api/profile', async (req, res) => {
  const userData = req.body;
  log(userData)
  const token = req.headers.token
  for (let i = 0; i < users.length; i++) {
    if (token == users[i].token) {
      users[i].age = userData.age
      users[i].phone = userData.phone
      users[i].email = userData.email
      users[i].facebookPage = userData.facebookPage
      const newUsersJSON = JSON.stringify(users);
      await client.set('users', newUsersJSON);
      return res.json({
        ok: true,
        msg: 'user was changed',
      })
    }
  }
  return res.json({
    ok: false,
    msg: 'user not found'
  })

  // 1 крок(відредагувати юзера)
  // users-масив-константа зі всіма юзерами
  // перебрати масив і знайти юзера,який відправив запит по юзер нейм!(form)
  // req.user.username-звідси берем імя юзера
  //прописуємо йому нові данні які прийшли
  // 2 крок(зберегти його в базу данних)
})



// module.exports = router;
export default router;
