<template>
  <div
    class="custom-background text-gray-100 py-3.5 px-6 shadow md:flex justify-between items-center"
  >
    <div class="flex items-center cursor-pointer">
      <span class="text-green-500 text-xl mr-1">
        <!-- <i class="bi bi-xbox"></i> -->
        <!-- <img src="images/removeLogo.png" alt="" class="w-15 h-10"> -->
      </span>
      <p style="font-weight: bold; color: white" @click="main">DevQuiz</p>
      <!-- <h1 class="text-hl">Xbox</h1> -->
    </div>

    <span @click="MenuOpen()" class="absolute md:hidden right-6 top-1.5 cursor-pointer text-4xl">
      <i :class="[open ? 'bi bi-x' : 'bi bi-filter-left']"></i>
    </span>

    <ul
      class="md:flex md:items-center md:px-0 px-3 md:pb-0 pb-6 md:static absolute md:w-auto w-full duration-700 ease-in"
      :class="[open ? 'left-0' : 'left-[-100%]']"
    >
      <li class="md:mx-4 md:my-0 my-6" v-for="link in Links" :key="link.name">
        <a :href="link.link" class="text-xl hover:text-blue-400">{{ link.name }}</a>
      </li>
      <button
        class="hover:bg-white duration-300 font-md text-white rounded py-2 px-5 custom-button"
        @click="logout"
      >
        <p>ออกจากระบบ</p>
      </button>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    let open = ref(false)
    let Links = [
      { name: 'แดชบอร์ด', link: '/AdminDashboard' },
      { name: 'รายชื่อผู้ใช้', link: '/AdminManageUser' },
      { name: 'การจัดการ', link: '#' }
      // { name: "เกี่ยวกับเรา", link: "#" },
    ]

    function MenuOpen() {
      open.value = !open.value
    }
    return { Links, open, MenuOpen }
  },
  methods: {
    main() {
      this.$router.push({ name: 'HomePage' })
    },
    logout() {
      localStorage.removeItem("Token");
      if(!localStorage.getItem("Token")){
      this.$router.push({ name: 'LogIn' })
      }
    เพิ่
  }
}
</script>

<style scoped>
/* import font มาใช้ */
@import url('https://fonts.googleapis.com/css2?family=Prompt&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai+Looped&family=Oswald&display=swap');

::v-deep .custom-button {
  font-family: 'Noto Sans Thai Looped', 'Oswald', sans-serif;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* เลือก font มาใช้ โดยกำหนดให้อันแรกเป็นฟอนต์หลัก และอันสองเป็นฟอนต์รอง*/
* {
  font-family: 'Prompt', sans-serif;
}

.custom-background {
  background-color: transparent; /* เปลี่ยนสีพื้นหลังของ div ที่มีคลาส custom-background */
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.1);
}

/* ul {
      background-color: #EC4088;
    } */

.custom-button {
  background-color: #ee5684;
}
</style>
