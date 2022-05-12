import {log} from '../colub/high-level/index.js';
export default async (req, res, next) => {
    const token = req.headers.token
    log(token).place()
    const user = users.find((user) => token == user.token)
    log(123, user)
    if (!user) return res.json({
        ok: false,
        msg: 'user dont have access'
    })
    req.user = user
    req.userSave = {
        age: req.user.age,
        phone: req.user.phone,
        email: req.user.email,
        facebookPage: req.user.facebookPage,
        username: req.user.username
    }
    log(135, req.user)
    next()
};