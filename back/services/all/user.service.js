const level = "../../";
import { log } from "../../colub/high-level/index.js";
import { User } from "../../models/index.js";
import cryptoService from "./crypto.service.js";
import mailService from "./mail.service.js";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const fsp = fs.promises;

class UserService {
  constructor() {}

  // getAll: async () => null,
  // const getByToken = async (token) => await getOne({token});
  // async getByToken(authToken) {
  //     log(authToken).place()
  //     return await getOne({authToken})
  // };
  getOne = async (q) => await User.findOne(q);
  async add(newUser) {
    const usernameOccupied = await this.getOne({ username: newUser.username }); // User already exists  ?
    log(usernameOccupied).place();
    if (usernameOccupied) return { ok: false, msg: "User already exists!" };
    const emailOccupied = await this.getOne({ email: newUser.email }); // User already exists  ?
    if (emailOccupied) return { ok: false, msg: "Email already exists!" };
    const hash = cryptoService.hash(newUser.password);
    log(hash).place();
    newUser.password = hash;
    await this.create(newUser);
    await mailService.send("mailVerification");
    return { ok: true, msg: "User is registered" };
  }
  create = async (o) => await new User(o).save();
  // delAll: async () => null,
  async edit(_id, msg) {
    log(msg).place();
    await User.findOneAndUpdate({ _id }, msg);
    return { ok: true, msg: "User was changed" };
  }
  async getAvatar(username) {
    if (username == undefined) {
      return { ok: false, avatar: 'no avatar'}
    }
    const path = "uploads/users/" + username;
    // fs.writeFile("books.txt", 'data', (err) => {
    //     if (err)
    //         console.log(err);
    //     else {
    //         console.log("File written successfully\n");
    //         console.log("The written has the following contents:");
    //         console.log(fs.readFileSync("books.txt", "utf8"));
    //     }
    // });
    const files = await fsp.readdir(path);
    const avatar = files.find((f) => f.split(".")[0] == "avatar");
    console.log("AVATAR", avatar);

    return { ok: true, avatar };
  }

  // fake: async () => null,
}

export default new UserService();
