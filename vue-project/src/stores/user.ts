import { defineStore } from "pinia";
import type { User } from "@/interfaces";
import axios from "axios";
import { httpOptions, log } from "@/utils";

// add interface
interface userState {
  user: User | { username: null | string };
  avatar: string;
}
export const useUserStore = defineStore({
  id: "user",
  state: (): userState => ({
    user: {
      username: null,
    },
    avatar: "",
  }),
  getters: {
    isAdmin: (state) => {
      return state.user.username == "admin";
    },
  },
  actions: {
    update(user: User) {
      this.user = user;
    },
    updateAvatar(fileName: string) {
      this.avatar = fileName;
    },
    async getUserData() {
      const answer = await axios.get(
        "http://localhost:3001/api/user",
        httpOptions()
      );
      console.log(answer);
      this.update(answer.data.user);
    },
    async editProfile() {
      console.log("editProfile");
      const answer = await axios.put(
        "http://localhost:3001/api/user",
        this.user,
        httpOptions()
      );
      console.log(answer);
      this.getUserData();
    },
  },
});
