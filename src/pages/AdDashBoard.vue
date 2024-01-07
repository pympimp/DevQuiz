<template>
  <!-- Add this line to your HTML file -->
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@{latest_version}/font/bootstrap-icons.css"
    rel="stylesheet"
  />

  <div class="w-screen h-screen flex">
    <!-- Side bar -->
    <div class="w-[400px] h-full bg-gray-200 text-white" v-show="showSide">
      <div class="h-[50px] bg-gray-900 flex justify-start items-center">
        <div class="px-[20px]">
          <h3 class="font-bold text-xl">Menu</h3>
        </div>
      </div>
      <div class="h-[calc(100vh-50px)] bg-gray-800 py-[20px]">
        <div class="flex flex-col justify-between h-full px-[20px] space-y-[10px]">
          <div class="flex flex-col justify-between space-y-[10px]">
            <router-link
              to="/AdminDashboard"
              class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800 transition duration-400 ease-in-out"
            >
              <i class="fa-regular fa-image"></i>
              Dashboard
            </router-link>
            <router-link
              to="/AdminManageUser"
              class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-300 hover:text-gray-800 transition duration-400 ease-in-out"
            >
              User
            </router-link>
            <router-link
              to="/AdminManageArticle"
              class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-300 hover:text-gray-800 transition duration-400 ease-in-out"
            >
              Article
            </router-link>
            <router-link
              to="/AdminManageClass"
              class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md rounded-b-lg hover:bg-gray-300 hover:text-gray-800 transition duration-400 ease-in-out"
            >
              Class
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full h-full bg-gray-400">
      <div
        class="h-[50px] bg-gray-100 flex items-center shadow-sm px-[20px] w-full py-[10px] z-10 border-b"
      >
        <!-- Hambuger menu -->
        <div class="cursor-pointer w-[30px]" @click="toggleSideBar">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-[25px] h-[25px]">
            <path
              d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
            />
          </svg>
        </div>
        <!-- Search bar -->

        <div class="w-[calc(100%-30px)] flex">
          <div class="w-[calc(100%-200px)] flex justify-center">
            <!-- Search bar -->
            <form class="flex items-center w-[500px]">
              <label for="voice-search" class="sr-only">Search</label>
              <div class="relative w-full">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    class="w-5 h-auto text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="voice-search"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search..."
                  required
                />
                <router-link to="/" class="flex absolute inset-y-0 right-0 items-center pr-3">
                  <!-- <svg aria-hidden="true" class="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clip-rule="evenodd"></path>
                    </svg> -->
                </router-link>
              </div>
            </form>
          </div>
          <!-- User login -->
          <div class="relative inline-block text-left">
            <router-link to="/login">
              <button 
                class="focus:outline-none text-white font-semibold hover:text-gray-300 px-3 py-2 rounded-md bg-blue-800 hover:bg-blue-900 transition duration-300"
              >
                Sign out
              </button>
            </router-link>
            
            
          </div>
        </div>
      </div>
      <div class="h-[calc(97vh-50px)] bg-gray-50 p-[20px]">
        <h1>Dashboard</h1>
        <div class="border border-gray-300 rounded-md p-[20px] h-full">
          <!-- หัวข้อ -->
          
        </div>
      </div>
    </div>
    <!-- Main  -->
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from 'radix-vue'
import 'bootstrap-icons/font/bootstrap-icons.css';

export default {
  data() {
    return {
      showDropDown: false,
      showSide: true
    }
  },
  methods: {
    // hide show side bar
    toggleSideBar() {
      this.showSide = !this.showSide
    },
    // toggle user
    toggleDrop() {
      this.showDropDown = !this.showDropDown
    }
  },
  components: {
    // FontAwesomeIcon,
  }
}
</script>






<template>
  <div>
    <AdNav />
    <div class="container">
      <div class="buttons">
        <h1>เมนู</h1>

        <router-link to="/AdminManageArticle" class="button">
          <button
            @click="scrollToAdditionalBox('Dashboard')"
            class="scroll-button"
            :style="{ backgroundColor: currentContent === 'Dashboard' ? '#EE5684' : '#1F1F1F' }">
            <img src="/images/html.png" alt="Image" class="button-image" />
            <p>แดชบอร์ด</p>
          </button>
        </router-link>

        <router-link to="/AdminManageArticle" class="button">
          <button
            @click="scrollToAdditionalBox('Userlist')"
            class="scroll-button"
            :style="{ backgroundColor: currentContent === 'Userlist' ? '#EE5684' : '#1F1F1F' }">
            <img src="/images/css.png" alt="Image" class="button-image" />
            <p>รายชื่อผู้ใช้</p>
          </button>
        </router-link>

        <router-link to="/AdminManageArticle" class="button">
          <button
            @click="scrollToAdditionalBox('Managearticles')"
            class="scroll-button"
            :style="{ backgroundColor: currentContent === 'Managearticles' ? '#EE5684' : '#1F1F1F' }">
            <img src="/images/javascript.png" alt="Image" class="button-image" />
            <p>จัดการบทความ</p>
          </button>
        </router-link>

        <router-link to="/AdminManageArticle" class="button">
          <button
            @click="scrollToAdditionalBox('Manageexercises')"
            class="scroll-button"
            :style="{ backgroundColor: currentContent === 'Manageexercises' ? '#EE5684' : '#1F1F1F' }">
            <img src="/images/javascript.png" alt="Image" class="button-image" />
            <p>จัดกการแบบฝึกหัด</p>
          </button>
        </router-link>

      </div>

      <!-- <BoxArticie v-if="currentContent && languageData[currentContent]" :contentData="languageData[currentContent]" /> -->
      <BoxAddash v-if="currentContent === 'Dashboard'" :contentData="languageData.Dashboard" />
      <BoxAddash v-if="currentContent === 'Userlist'" :contentData="languageData.Userlist" />
      <BoxAddash v-if="currentContent === 'Managearticles'" :contentData="languageData.Managearticles" />
      <BoxAddash v-if="currentContent === 'Manageexercises'" :contentData="languageData.Manageexercises" />
      <!-- <div v-else class="container-no-data">
        <h1>No Data</h1>
      </div> -->
    </div>
  </div>
</template>


<style scoped>
h1 {
  font-size: 1.5rem;
  font-weight: bold;
}
.admin {
  background-color: rgb(183, 229, 229);
}

.button-image {
  transform: translateY(10%);
  width: 40px;
  height: 40px;
  margin-left: 65px;
  /* background-color: aqua; */
}

.scroll-button {
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  margin-left: -40px;
  margin-bottom: 25px;
  width: 300px;
  height: 50px;
  background-color: #1f1f1f;
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);  */
  border-radius: 50px;
  cursor: pointer;
}

.scroll-button:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  background-color: #ee5684;
}

p {
  font-size: 20px;
  margin-left: 120px;
  transform: translateY(-105%);
  font-weight: bolder;
  text-align: left;
  color: #fffdfd;
  /* background-color: aqua; */
}

.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

/* หากต้องการให้เปิดมาแล้วเป็นกล่องเปล่าๆ */
.container-no-data {
  background-color: #f5f5f5;
  margin-top: 50px;
  margin-right: 50px;
  width: 1000px;
  height: 1000px;
}
.container-no-data h1 {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
}

.grid-item {
  /* background-color: #f2f2f2; */
  padding: 10px;
  text-align: center;
}

.col-1 {
  flex-basis: calc(5% - 10px);
}

.col-4 {
  flex-basis: calc(45% - 10px);
}
.col-2 {
  flex-basis: calc(10% - 10px);
}

.col-3 {
  flex-basis: calc(20% - 10px);
}

.bi{
  padding: 3vh;
}

/* Customize as needed for other column sizes */
</style>
