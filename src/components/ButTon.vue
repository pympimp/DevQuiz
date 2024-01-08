<template>
  <button class="hover:bg-white duration-300 font-md text-white rounded py-2 px-5 custom-button" @click="signout()" v-if='authenKey'>
    <p>ออกจากระบบ</p>
  </button>
  <button class="hover:bg-white duration-300 font-md text-white rounded py-2 px-5 custom-button" @click="login()" v-if="!authenKey">
    <p>เข้าสู่ระบบ</p>
  </button>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai+Looped&family=Oswald&display=swap');

/* Use ::v-deep (or /deep/) to increase specificity and override Tailwind styles */
::v-deep .custom-button {
  font-family: 'Noto Sans Thai Looped', 'Oswald', sans-serif;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.custom-button p {
  font-size: 17px;
}
</style>

<script>
import { useAuthenStore } from "../stores/auth";
import { authenKey } from "../utils/config";
  export default {
    data(){
      return{
        authenStore:useAuthenStore(),
        authenKey:localStorage.getItem(authenKey)
      }
    },
    methods: {
      login() {
        this.$router.push({ name: "LogIn"});
      },
      signout(){
        this.authenStore.logout()
        this.$router.push({ name: "LogIn"});
      }
    }
  }
</script>
