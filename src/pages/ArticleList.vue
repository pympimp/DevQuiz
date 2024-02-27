<template>
  <half-circle-spinner
            :animation-duration="1000"
            :size="60"
            color="#ff1d5e"
            class="loading"
            v-if="isLoading"
          />
    <div class="h-[calc(97vh-50px)] bg-gray-50 p-[20px]" v-if="!isLoading">
        <h1>Manage Article / Class</h1>
        <div class="border border-gray-300 rounded-md p-[20px] h-full">
          <!-- หัวข้อ -->
          <ul class="grid-list" >
            <li class="grid-item col-1" style="font-weight: bold;">ID</li>
            <li class="grid-item col-3"></li>
            <li class="grid-item col-4" style="font-weight: bold;">Articles / Class</li>
            <li class="grid-item col-3" style="font-weight: bold;"></li>
          </ul>
          
          <!-- ตัวอย่างรายชื่อ -->
          <ul class="grid-list" v-for="(item, index) in course" :key="index">
            <li class="grid-item col-1">{{ index + 1 }}</li>
            <li class="grid-item col-3" style="display: flex; justify-self: center;"><img :src="item.img" alt="html icon" style="width: 10%;"></li>
            <li class="grid-item col-4" > {{item.fullname }}</li>
            <router-link :to="`/Admin/AdminManageArticle/${item.courseId}`">
            <li class="grid-item col-3"><i class="bi bi-caret-right-fill" ></i></li>
          </router-link>
          </ul>
  
          <!-- <ul class="grid-list">
            <li class="grid-item col-1">2</li>
            <li class="grid-item col-3"><img src="\images\css.png" alt="css icon" style="width: 2vh;"></li>
            <li class="grid-item col-4">CSS (Cascading Style Sheets)</li>
            <router-link to="/Admin/AdminManageArticle">
            <li class="grid-item col-3"><i class="bi bi-caret-right-fill"></i></li>
          </router-link>
          </ul>
  
          <ul class="grid-list">
            <li class="grid-item col-1">3</li>
            <li class="grid-item col-3"><img src="\images\javascript.png" alt="css icon" style="width: 2vh;"></li>
            <li class="grid-item col-4">JavaScript</li>
            <router-link to="/Admin/AdminManageArticle">
            <li class="grid-item col-3"><i class="bi bi-caret-right-fill"></i></li>
          </router-link>
          </ul> -->
  
        </div>
      </div>
  </template>
  
  <script setup>
  import axios from "axios";
import { ref, onMounted } from "vue";
import { HalfCircleSpinner } from 'epic-spinners'
import { authenKey } from '../utils/config'
import { useRouter } from "vue-router";
import { useAuthenStore } from "../stores/auth";

const authenStore = useAuthenStore()
const isLoading = ref(false)
const router = useRouter()

const course = ref({
  classID: '',
  name: '',
  fullname: '',
  discription: '',
  img: ''
})

const fetchData = async () => {
  isLoading.value = true
  try {
    const result = await axios.get('https://functions-khaki-gamma.vercel.app/coures/');
    if (result) {
      course.value = result.data
      console.log("data", course.value)
      isLoading.value = false
    }
  } catch (error) {
    console.error("Error during getdata:", error);
  }
};

onMounted(() => {
  setTimeout(()=>{
    if (!localStorage.getItem(authenKey)) {
        router.push({ name: 'LogIn' })
  }if(authenStore.auth.role !== 'admin'){
    router.push("/")
  }
  },800)
  fetchData();
});
  </script>
  
  <style scoped>
  h1 {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .loading {
  position: absolute;
  top: 50%;
  left: 60%;
  transform: translate(-50%, -50%);
}
  .admin {
    background-color: rgb(183, 229, 229);
  }
  
  .grid-list {
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
  