import { log } from '../colub/high-level/index.js';
import { userService } from '../services/index.js';
export default async (req, res, next) => {
    const authToken = req.headers.token;
    log(authToken).place()
    // const user = await userService.getOne({ token });
    const user = await userService.getByToken( authToken );
    log(user).place()
    if (!user) return res.json({
        ok: false,
        msg: 'user dont have access'
    });
    req.user = user;
    req.userSave = {
        age: req.user.age,
        phone: req.user.phone,
        email: req.user.email,
        facebookPage: req.user.facebookPage,
        username: req.user.username
    };
    next();
};