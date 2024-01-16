<script>

import NavBar from "@/components/NavBar.vue";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useAuthenStore } from "../stores/auth";
import axios from "axios";
import { ref } from "vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


export default {
  mounted(){
    this.fetchCourses()
  },
    name: 'UserProfile',
    components: {
    NavBar,
    FontAwesomeIcon,
   
  },
  data(){
    return{
      authenStore:useAuthenStore(),
      courses:ref(),
      ProgressIndex:ref([])
    }
  },
  methods: {
    EditUser() {
      this.$router.push({ name: "EditUser" });
    },
    async fetchCourses(){
      try {
        const result = await axios.get('http://localhost:5000/test-elearning-b0646/us-central1/api/coures/');
        if(result){
          this.courses = result.data
          console.log("DATA",this.courses)
        }
      } catch (error) {
        console.error("Error during getdata:", error);
      }
    },

    userProgress(courseName){
    const userIndex = this.authenStore.auth.progress
      try {
          const foundIndex = userIndex.findIndex((item) => item.name === courseName);
          if (foundIndex !== -1) {
              return foundIndex
          } else {
              console.log("Not found");
          }
        console.log('content1',this.ProgressIndex)
      }catch(error){
        console.error("Error loading progress data: ", error);
      }
},

  }
};
</script>



<template>
  <div>
      <NavBar />
      <div class="app">
  <div class="container">
    <div class="boxs">
        <h1>ข้อมูลผู้ใช้</h1>
        <h3>Username : {{ authenStore.auth.username }}</h3>
        <h3>Email : {{ authenStore.auth.email }}</h3>
        <div class="button-container">
        <button @click="EditUser" class="button">แก้ไขข้อมูล</button>
      </div>
    </div>
    <div class="box">
        <h1>ประวัติการเรียน</h1>
    <div class="containers">
    <div class="sub-box">
    <div class="sub-item" v-for="(item, index) in courses" :key="index">
      <div v-for="(subitem, subindex) in item.lessons" :key="subindex">
      <h2>{{subitem.nameLesson}} {{ item.name }}</h2>
      <div style="display: flex;flex-direction: row;justify-content: center;" v-for="(thirditem, thirdindex) in subitem.units" :key="thirdindex">
      <div class="row-content"><span>{{ (index + 1) + '.' + (thirdindex + 1) }} {{thirditem.header}}</span> 
        <div class="icon-card" :style="{backgroundColor: authenStore.auth.progress[userProgress(item.name)][subitem.nameLesson][thirditem.nameUnit]? 'rgba(151, 221, 118, 1)' : 'rgba(223, 115, 115, 1) '}">
              <FontAwesomeIcon icon="fa-solid fa-check" v-if="authenStore.auth.progress[userProgress(item.name)][subitem.nameLesson][thirditem.nameUnit] == true"/>
              <FontAwesomeIcon icon="fa-solid fa-xmark" v-else></FontAwesomeIcon>
          </div>
      </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
  </div>
    </div>

    </template>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');


* {
  box-sizing: border-box;
}

.icon-card {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  width: 30px; /* ปรับขนาดตามที่ต้องการ */
  height: 30px; /* ปรับขนาดตามที่ต้องการ */
  border-radius: 50%; /* ทำให้เป็นวงกลม */
  box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.25); /* inner shadow */
}

.row-content{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 18px;
  border-bottom: 1px solid gray;
  padding: 20px;
  width: 80%;
  text-align: center;
}
.container {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.content{
  display: flex;
  flex-direction: row;
  background-color: red;
}

.boxs {
  width: 300px;
  height: 200px;
  margin-right: 20px; /* ปรับระยะห่างด้านขวาของกล่อง */
  background-color: #F4F4F4;
  border-top-left-radius: 15px; /* กำหนดความโค้งด้านซ้ายของกล่อง */
  border-bottom-left-radius: 15px; /* กำหนดความโค้งด้านซ้ายของกล่อง */
}

.box {
  width: 800px;
  height: 600px;
  background-color:#F4F4F4;
  border-top-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
  border-bottom-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
}

/* ลบระยะห่างของกล่องสุดท้าย */
.box:last-child {
  margin-right: 0;
}

h1{
    font-size: 20px;
    margin-top: 20px;
    margin-bottom: 10px;
    margin-left: 20px;
    font-weight: 1000;
}

h3{
    font-size: 15px;
    margin-left: 20px;
    /* line-height: 1.5; */
    font-weight: 1000;
}

.button-container{
    text-align: center;
    font-size: 14px;
    font-weight: 1000;
    margin-top: 20px;
    margin-left: 100px;
    color: #ffffff;
    background-color: #02BDCC;
    box-shadow: 0px 5px px rgba(0, 0, 0, 0.4); /* เพิ่มเงาด้านล่างสีดำ */
    border-radius: 4px;
    width: 90px;
    height: 25px;
}

/* กล่องด้านในเก็บข้อมูล */
.containers {
  display: flex;
  flex-direction: column;
  margin-top: 10px; /* ระยะห่างด้านบน */
  border-top-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
  border-bottom-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
}

.sub-box,
.sub-boxs,
.sub-boxss {
  background-color: #F4F4F4; /* สีพื้นหลังของกล่อง */
  padding: 5px;
  flex: 1; /* กำหนดให้กล่องขยายตามขนาดของพื้นที่ที่มี */
  border-top-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
  border-bottom-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
}



h2 {
  margin-left: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #333;
  font-weight: 600;
}

p {
 
  font-size: 0.9rem;
  margin-left: 80px;
  /* margin-bottom: 1.2px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1.7px solid #B0B0B0; /* เพิ่มเส้นกั้นด้านล่าง */
  width: 80%; /* กำหนดความยาวของเส้นกั้น */
  
}

i {
  color: #00cc00;
  font-size: 1.1em;
  
}


@media only screen and (max-width: 480px) {

}


@media screen and (min-width: 481px) and (max-width: 768px) {

}

@media screen and (min-width: 769px) and (max-width: 1024px) {

}

@media screen and (min-width: 1025px) and (max-width: 1200px) {

}

@media screen and (min-width: 1200px)  {
 
}

</style>





