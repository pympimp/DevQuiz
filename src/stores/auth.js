import { defineStore } from "pinia";
import { authenKey} from "../utils/config";
export const useAuthenStore = defineStore("authenStore", {
  state: () => ({
    auth: undefined,
  }),
  getters: {},
  actions: {
    setAuthen(userData) {
      if (userData && userData.token) {
        localStorage.setItem(authenKey, userData.token);
      }

      this.auth = userData;
      console.log(this.auth)
    },
    logout() {
      this.auth = undefined;
      localStorage.removeItem(authenKey);
    },
  },
});