// import { log } from '../colub/high-level/index.js';
import { userService } from '../services/index.js';

export default async (req, res, next) => {
    if (req.user?.username != 'admin') return res.json({
        ok: false,
        msg: 'user not admin, then dont have access'
    });
    next();
};