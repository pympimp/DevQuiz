import { defineStore } from "pinia";
import { authenKey,Id_Key} from "../utils/config";
export const useAuthenStore = defineStore("authenStore", {
  state: () => ({
    auth: undefined,
  }),
  getters: {},
  actions: {
    setAuthen(userData) {
      if (userData && userData.token) {
        localStorage.setItem(authenKey, userData.token);
        localStorage.setItem(Id_Key,userData.uid)
      }

      this.auth = userData;
      console.log(this.auth)
    },
    logout() {
      this.auth = undefined;
      localStorage.removeItem(authenKey);
      localStorage.removeItem(Id_Key)
    },
  },
});