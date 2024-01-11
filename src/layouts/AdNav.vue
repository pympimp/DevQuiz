<!-- eslint-disable no-unused-vars -->
<template>
  <!-- Add this line to your HTML file -->
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@{latest_version}/font/bootstrap-icons.css"
    rel="stylesheet"
  />

  <div class="w-screen h-screen flex">
    <!-- Side bar -->
    <div class="w-[400px] h-full bg-gray-200 text-white" v-show="showSide">
      <div class="h-[50px] bg-gray-900 flex justify-start items-center" style="background-color: #F5FCFF;" >
        <div class="px-[20px]">
          <h3 class="font-bold text-xl" style="color: #000000;" >Menu </h3>
        </div>
      </div>
      <div class="h-[calc(100vh-50px)] py-[20px] bg-gray-400 " style="background-color: #F5FCFF;" >
        <div class="flex flex-col justify-between h-full px-[20px] space-y-[10px]" >
          <div class="flex flex-col justify-between space-y-[10px]">
            <router-link
              to="/Admin/AdminDashboard"
              class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-blue-300 transition duration-400 ease-in-out"  style="color: #000000;"
            >
              
              Dashboard
            </router-link>
            <router-link
              to="/Admin/AdminManageUser"
              class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-blue-300 transition duration-400 ease-in-out"  style="color: #000000;"
            >
              User
            </router-link>
            <router-link
              to="/Admin/ArticleList"
              class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-blue-300 hover:text-gray-800 transition duration-400 ease-in-out"  style="color: #000000;"
            >
              Article
            </router-link>
            <router-link
              to="/Admin/ClassList"
              class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md rounded-b-lg hover:bg-blue-300 hover:text-gray-800 transition duration-400 ease-in-out"  style="color: #000000;"
            >
              Class
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full h-full bg-gray-400" style="background-color: #F5FCFF;" >
      <div
        class="h-[50px] flex items-center shadow-sm px-[20px] w-full py-[10px] z-10 border-b" style="background-color: #F5FCFF;">
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
  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-md" 
  style="background-color: #F5FCFF;"
  placeholder="Search..."
  required
/>
                <router-link to="/" class="flex absolute inset-y-0 right-0 items-center pr-3">

                </router-link>
              </div>
            </form>
          </div>
          <!-- User login -->
          <div class="relative inline-block text-left">
            <router-link to="/login">
              <button 
                class="focus:outline-none text-white font-semibold hover:text-gray-300 px-3 py-2 rounded-md bg-blue-800 hover:bg-blue-900 transition duration-300" style="background-color: #30aade;" 
              >
                Sign out
              </button>
            </router-link>
            
          </div>
        </div>
      </div>
      <router-view></router-view>
    </div>
    <!-- Main  -->
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from 'radix-vue'
import 'bootstrap-icons/font/bootstrap-icons.css';
// import UserList from '@/components/UserList.vue';
// import ArticleList from '@/components/ArticleList.vue';
// import ClassList from '@/components/ClassList.vue';

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
//   components: {
//     UserList
// }
}
</script>


<style scoped>
h1 {
  font-size: 1.5rem;
  font-weight: bold;
}
.admin {
  background-color: rgb(183, 229, 229);
}


.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
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

.box-1 {
  background-color: #ECECEC;
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 5px;
  height: 250px;
  display: flex;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.5); /* เพิ่มเงาให้กับกล่อง */
}

.about-content {
  display: flex;
  align-items: center;
  
}

.about-image {
  width: 300px;
  height: 250px;
  margin-top: 15px;
   /* background-color: #bfffbf; */
   margin-right: 30px;
}


.about-text p {
  font-size: 40px;
  margin-left: 10px;
  /* background-color: #bfffbf; */
  
}

.about-text h1 {
  font-size: 50px;
  margin-left: 190px;
}


.box-2-3-container {
  display: flex;
  margin-bottom: 10px;
  height: 150px;
}

.box-2 {
  flex-grow: 1;
  background-color:#ECECEC;
  padding: 20px;
  margin-right: 10px;
  border-radius: 5px;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.5); /* เพิ่มเงาให้กับกล่อง */
}

.box-2 p {
  font-size: 50px;
}

.box-3 {
  flex-grow: 1;
  background-color: #ECECEC;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.5); /* เพิ่มเงาให้กับกล่อง */
}

.box-3 p {
  font-size: 50px;
}

.box-4 {
  background-color: #ECECEC;
  padding: 20px;
  border-radius: 5px;
  height: 150px;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.5); /* เพิ่มเงาให้กับกล่อง */
}



</style>


