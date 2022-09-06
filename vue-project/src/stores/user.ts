import { defineStore } from "pinia";
import type { User } from "@/interfaces";
import axios from "axios";
import { httpOptions, log } from "@/utils";
import { useAppStore } from "@/stores/app";

// add interface
interface userState {
  user: User | { username: null | string };
  avatar: string;
  serverUrl: string,
  apiUrl: string,
}
export const useUserStore = defineStore({
  id: "user",
  state: (): userState => {
    const appStore = useAppStore()
    return ({
      serverUrl: appStore.serverUrl,
      apiUrl: appStore.apiUrl,
      user: {
        username: null,
      },
      avatar: "",
    })
  } ,
  getters: {
    isAdmin: (state) => {
      return state.user?.username == "admin";
    },
  },
  actions: {
    update(user: User) {
      this.user = user;
    },
    async getAvatar() {
      const answer = await axios
        .get(this.apiUrl+'/avatar',
          httpOptions())
      this.updateAvatar(answer.data.result?.avatar)
      log(answer)
    },
    updateAvatar(fileName: string) {
      this.avatar = fileName;
    },
    async getUserData() {
      const answer = await axios.get(
        this.apiUrl+"/user",
        httpOptions()
      );
      console.log(answer);
      this.update(answer.data.user);
    },
    async editProfile() {
      console.log("editProfile");
      const answer = await axios.put(
        this.apiUrl+"/user",
        this.user,
        httpOptions()
      );
      console.log(answer);
      this.getUserData();
    },
  },
});
