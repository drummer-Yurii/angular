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
    async register(data) {
      console.log(data);
      const answer = await axios.post(
        this.apiUrl+"/auth/register",
        data
      );
      console.log(answer);
      answer.data.ok ? alert(answer.data.msg) : alert('!!!'+answer.data.msg);
    },
    async login(data) {
      const answer = await axios.post(
        this.apiUrl+"/auth/login",
        data
      );
      console.log(answer);
      answer.data.ok ? alert(answer.data.msg2) : alert(!!!+answer.data.msg2);
      const authToken = answer.data.result.authToken;
      localStorage.setItem("authToken", authToken);
      await this.getUserData();
      if (this.user.username == "admin")
        this.$router.push("/admin/main");
      else this.$router.push("/");
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
