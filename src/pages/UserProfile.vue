<script>

import NavBar from "@/components/NavBar.vue";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useAuthenStore } from "../stores/auth";
import axios from "axios";
import { ref } from "vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { HalfCircleSpinner } from 'epic-spinners'


export default {
  mounted(){
  setTimeout(() => {
    this.isLoading = true
    this.fetchOneUser()
    this.fetchCourses()
  }, 200)
  
  },
    name: 'UserProfile',
    components: {
    NavBar,
    FontAwesomeIcon,
    HalfCircleSpinner,
  },
  data(){
    return{
      authenStore:useAuthenStore(),
      courses:ref(),
      ProgressIndex:ref([]),
      userData:ref(),
      isLoading:ref(false)
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
          this.isLoading = false
        }
      } catch (error) {
        console.error("Error during getdata:", error);
      }
    },

    userProgress(courseName){
    const userIndex = this.userData.progress
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

  async fetchOneUser(){
    if(this.authenStore.auth){
      const result = await axios.get(`http://localhost:5000/test-elearning-b0646/us-central1/api/user/${this.authenStore.auth.id}`)
    if(result){
      this.userData = result.data
    }
    }
  }

  }
};
</script>



<template>
  <div>
      <NavBar />
      <half-circle-spinner
      :animation-duration="1000"
      :size="60"
      color="#ff1d5e"
      class="loading"
      v-if="isLoading"
    />
      <div class="app" v-if="userData && !isLoading">
  <div class="container">
    <div class="boxs">
        <h1>ข้อมูลผู้ใช้</h1>
        <h3 >Username : {{ userData.username }}</h3>
        <h3>Email : {{ userData.email }}</h3>
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
        <div class="icon-card" :style="{backgroundColor: userData.progress[userProgress(item.name)][subitem.nameLesson][thirditem.nameUnit]? 'rgba(151, 221, 118, 1)' : 'rgba(223, 115, 115, 1) '}">
              <FontAwesomeIcon icon="fa-solid fa-check" v-if="userData.progress[userProgress(item.name)][subitem.nameLesson][thirditem.nameUnit] == true"/>
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

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* ตัวอย่างการกำหนดสไตล์เพิ่มเติมสำหรับ Spinner หากต้องการ */
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
  background-color:#F4F4F4;
  border-top-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
  border-bottom-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
  margin-bottom: 1%;
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



/* responsive */
/* @media screen and (max-width: 2560px) {

  .container {
 margin-left: 450px;
  margin-top: 30px;
  width: auto;
}

.boxs {
  width: 700px;
  height: 400px;
  margin-right: 20px; 
  background-color: #F4F4F4;
  border-top-left-radius: 15px; 
  border-bottom-left-radius: 15px; 
}

.box {
  width: 1800px;
  height: 1200px;
  background-color:#F4F4F4;
  border-top-right-radius: 15px; 
  border-bottom-right-radius: 15px; 
}


.box:last-child {
  margin-right: 0;
}

h1{
    font-size: 45px;
    margin-top: 20px;
    margin-bottom: 35px;
    margin-left: 20px;
    font-weight: 1000;
}

h3{
    font-size: 28px;
    margin-left: 20px;
    
    font-weight: 1000;
}

.button-container{
    text-align: center;
    font-size: 25px;
    font-weight: 1000;
    margin-top: 90px;
    margin-left: 140px;
    color: #ffffff;
    background-color: #02BDCC;
    box-shadow: 0px 5px px rgba(0, 0, 0, 0.4); 
    border-radius: 4px;
    width: 140px;
    height: 40px;
}


.containers {
  display: flex;
  flex-direction: column;
  margin-top: 10px; 
  border-top-right-radius: 15px; 
  border-bottom-right-radius: 15px;
}

.sub-box,
.sub-boxs,
.sub-boxss {
  background-color: #F4F4F4; 
  padding: 5px;
  flex: 1; 
  border-top-right-radius: 15px; 
  border-bottom-right-radius: 15px; 
}



h2 {
  font-size: 35px;
  margin-left: 50px;
  margin-top: 15px;
  margin-bottom: 20px;
  color: #333;
  font-weight: 600;
}

p {
  font-size: 30px;
  margin-left: 55px;
  margin-bottom: 13px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1.7px solid #B0B0B0; 
  width: 90%; 
  
}

i {
  color: #00cc00;
  font-size: 25px;
  
}

}

 */





@media screen and (max-width: 1440px) {
/* .app{
  background-color: #02BDCC;
  
  } */
  .container {
 margin-left: 80px;
  margin-top: 70px;
  width: auto;
}

.boxs {
  width: 700px;
  height: 335px;
  margin-right: 20px; /* ปรับระยะห่างด้านขวาของกล่อง */
  background-color: #F4F4F4;
  border-top-left-radius: 15px; /* กำหนดความโค้งด้านซ้ายของกล่อง */
  border-bottom-left-radius: 15px; /* กำหนดความโค้งด้านซ้ายของกล่อง */
}

.box {
  width: 1800px;
  height: 1100px;
  margin-bottom: 15px;
  background-color:#F4F4F4;
  border-top-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
  border-bottom-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
}

/* ลบระยะห่างของกล่องสุดท้าย */
.box:last-child {
  margin-right: 0;
}

h1{
    font-size: 30px;
    margin-top: 20px;
    margin-bottom: 35px;
    margin-left: 20px;
    font-weight: 1000;
}

h3{
    font-size: 25px;
    margin-left: 20px;
    font-weight: 1000;

}

.button-container{
    text-align: center;
    font-size: 25px;
    font-weight: 1000;
    margin-top: 65px;
    margin-left: 100px;
    color: #ffffff;
    background-color: #02BDCC;
    box-shadow: 0px 5px px rgba(0, 0, 0, 0.4); /* เพิ่มเงาด้านล่างสีดำ */
    border-radius: 4px;
    width: 140px;
    height: 40px;
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
  font-size: 28px;
  margin-left: 50px;
  margin-top: 20px;
  margin-bottom: 15px;
  color: #333;
  font-weight: 600;
}

p {
  font-size: 22px;
  margin-left: 55px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1.7px solid #B0B0B0; /* เพิ่มเส้นกั้นด้านล่าง */
  width: 90%; /* กำหนดความยาวของเส้นกั้น */
  
}

i {
  color: #00cc00;
  font-size: 25px;
  
}

}

@media screen and (max-width: 1024px) {
/* .app{
  background-color: #02BDCC;
  
  } */
  .container {
 margin-left: 80px;
 margin-right: 70px;
  margin-top: 20px;
  width: auto;
}

.boxs {
  /* width: 700px; */
  height: 200px;
  margin-right: 5px; /* ปรับระยะห่างด้านขวาของกล่อง */
  background-color: #F4F4F4;
  border-top-left-radius: 15px; /* กำหนดความโค้งด้านซ้ายของกล่อง */
  border-bottom-left-radius: 15px; /* กำหนดความโค้งด้านซ้ายของกล่อง */
}

.box {
  /* width: 1500px; */
  height: 1000px;
  margin-bottom: 15px;
  background-color:#F4F4F4;
  border-top-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
  border-bottom-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
}

/* ลบระยะห่างของกล่องสุดท้าย */
.box:last-child {
  margin-right: 0;
}

h1{
    font-size: 23px;
    margin-top: 20px;
    margin-bottom: 15px;
    margin-left: 20px;
    font-weight: 1000;
}

h3{
    font-size: 14px;
    margin-left: 20px;
    font-weight: 1000;

}

.button-container{
    text-align: center;
    font-size: 15px;
    font-weight: 1000;
    margin-top: 19px;
    margin-left: 80px;
    color: #ffffff;
    background-color: #02BDCC;
    box-shadow: 0px 5px px rgba(0, 0, 0, 0.4); /* เพิ่มเงาด้านล่างสีดำ */
    border-radius: 4px;
    width: 110px;
    height: 28px;
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
  font-size: 20px;
  margin-left: 40px;
  margin-top: 20px;
  margin-bottom: 15px;
  color: #333;
  font-weight: 600;
}

p {
  font-size: 16px;
  margin-left: 40px;
  margin-bottom: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1.7px solid #B0B0B0; /* เพิ่มเส้นกั้นด้านล่าง */
  width: 90%; /* กำหนดความยาวของเส้นกั้น */
  
}

i {
  color: #00cc00;
  font-size: 25px;
  
}


}

@media screen and (max-width: 820px) {

}

@media screen and (max-width: 768px) {
/* .app{
  display: flex;
  flex-direction: column;
  background-color: #02BDCC;
  
  } */
  .container {
  display: flex;
  flex-direction: column;
 margin-left: 5px;
  margin-top: 20px;
  width: auto;
}

.boxs {
  width: 450px;
  height: 250px;
  margin-left: 145px;
  margin-bottom: 10px; /* ปรับระยะห่างด้านขวาของกล่อง */
  background-color: #F4F4F4;
  border-radius: 20px;
}

.box {
  width: 710px;
  height: 700px;
  margin-left: 25px;
  background-color:#F4F4F4;
  border-radius: 20px;
}

/* ลบระยะห่างของกล่องสุดท้าย */

h1{
    font-size: 20px;
    margin-top: 20px;
    margin-bottom: 15px;
    margin-left: 20px;
    font-weight: 1000;
}

h3{
    font-size: 17px;
    margin-left: 20px;
    line-height: 1.8;
    font-weight: 1000;
}

.button-container{
    text-align: center;
    font-size: 16px;
    font-weight: 1000;
    margin-top: 40px;
    margin-left: 160px;
    color: #ffffff;
    background-color: #02BDCC;
    box-shadow: 0px 5px px rgba(0, 0, 0, 0.4); /* เพิ่มเงาด้านล่างสีดำ */
    border-radius: 4px;
    width: 100px;
    height: 30px;
}

/* กล่องด้านในเก็บข้อมูล */
.containers {
  display: flex;
  flex-direction: column;
  margin-top: 10px; /* ระยะห่างด้านบน */
  
}

.sub-box,
.sub-boxs,
.sub-boxss {
  background-color: #F4F4F4; /* สีพื้นหลังของกล่อง */
  padding: 5px;
  flex: 1; /* กำหนดให้กล่องขยายตามขนาดของพื้นที่ที่มี */
 
}



h2 {
  font-size: 18px;
  margin-left: 50px;
  margin-top: 10px;
  margin-bottom: 8px;
  color: #333;
  font-weight: 600;
}

p {
  font-size: 15px;
  margin-left: 35px;
  margin-bottom: 2px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1.7px solid #B0B0B0; /* เพิ่มเส้นกั้นด้านล่าง */
  width: 90%; /* กำหนดความยาวของเส้นกั้น */
  
}

i {
  color: #00cc00;
  font-size: 18px;
  
}

}

@media screen and (max-width: 426px) {

/* .app{
  display: flex;
  flex-direction: column;
  background-color: #02BDCC;
  
  } */
  .container {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: auto;
}

.boxs {
  width: 400px;
  height: 207px;
  margin-left: 8px;
  background-color: #F4F4F4;
  border-radius: 20px;
}

.box {
  width: 400px;
  height: 800px;
  margin-left: 7px;
  margin-top: 5px;
  background-color:#F4F4F4;
  border-radius: 20px;
}

/* ลบระยะห่างของกล่องสุดท้าย */

h1{
    font-size: 20px;
    margin-top: 20px;
    margin-bottom: 5px;
    margin-left: 20px;
    font-weight: 1000;
}

h3{
    font-size: 17px;
    margin-left: 20px;
    line-height: 1.8;
    font-weight: 1000;
}

.button-container{
    text-align: center;
    font-size: 16px;
    font-weight: 1000;
    margin-top: 18px;
    margin-left: 150px;
    color: #ffffff;
    background-color: #02BDCC;
    box-shadow: 0px 5px px rgba(0, 0, 0, 0.4); /* เพิ่มเงาด้านล่างสีดำ */
    border-radius: 4px;
    width: 100px;
    height: 30px;
}

/* กล่องด้านในเก็บข้อมูล */
.containers {
  display: flex;
  flex-direction: column;
  margin-top: -10px; /* ระยะห่างด้านบน */
}

.sub-box,
.sub-boxs,
.sub-boxss {
  background-color: #F4F4F4; /* สีพื้นหลังของกล่อง */
  padding: 5px;
  flex: 1; /* กำหนดให้กล่องขยายตามขนาดของพื้นที่ที่มี */
  border-radius: 15px;
  
}



h2 {
  font-size: 18px;
  margin-left: 20px;
  margin-top: 10px;
  margin-bottom: 8px;
  color: #333;
  font-weight: 600;
}

p {
  font-size: 15px;
  margin-left: 20px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1.7px solid #B0B0B0; /* เพิ่มเส้นกั้นด้านล่าง */
  width: 90%; /* กำหนดความยาวของเส้นกั้น */
  
}

i {
  color: #00cc00;
  font-size: 22px;
  
}

}

@media screen and (max-width: 376px) {

  .container {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: auto;
}

.boxs {
  width: 350px;
  height: 190px;
  margin-left: 8px;
  background-color: #F4F4F4;
  border-radius: 20px;
}

.box {
  width: 360px;
  height: 600px;
  margin-left: 2px;
  background-color:#F4F4F4;
  border-radius: 20px;
  margin-top: 2px;
}

/* ลบระยะห่างของกล่องสุดท้าย */
.box:last-child {
  margin-right: 0;
}

h1{
    font-size: 20px;
    margin-top: 20px;
    margin-bottom: 5px;
    margin-left: 20px;
    font-weight: 1000;
}

h3{
    font-size: 15px;
    margin-left: 20px;
    line-height: 1.8;
    font-weight: 1000;
}

.button-container{
    text-align: center;
    font-size: 14px;
    font-weight: 1000;
    margin-top: 18px;
    margin-left: 120px;
    color: #ffffff;
    background-color: #02BDCC;
    box-shadow: 0px 5px px rgba(0, 0, 0, 0.4); /* เพิ่มเงาด้านล่างสีดำ */
    border-radius: 4px;
    width: 100px;
    height: 25px;
}

/* กล่องด้านในเก็บข้อมูล */
.containers {
  display: flex;
  flex-direction: column;
  margin-top: -5px; /* ระยะห่างด้านบน */
  border-top-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
  border-bottom-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
}

.sub-box,
.sub-boxs,
.sub-boxss {
  background-color: #F4F4F4; /* สีพื้นหลังของกล่อง */
  padding: 5px;
  flex: 1; /* กำหนดให้กล่องขยายตามขนาดของพื้นที่ที่มี */
}



h2 {
  font-size: 15px;
  margin-left: 20px;
  margin-top: 4px;
  margin-bottom: 4px;
  color: #333;
  font-weight: 600;
}

p {
  font-size: 13px;
  margin-left: 20px;
  margin-bottom: -1px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1.7px solid #B0B0B0; /* เพิ่มเส้นกั้นด้านล่าง */
  width: 90%; /* กำหนดความยาวของเส้นกั้น */
  
}

i {
  color: #00cc00;
  font-size: 18px;
  
}


}



@media screen and (max-width: 320px) {

  .container {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  width: auto;
}

.boxs {
  width: 300px;
  height: 160px;
  margin-left: 8px;
  background-color: #F4F4F4;
  border-radius: 20px;
}

.box {
  width: 310px;
  height: 500px;
  margin-left: 2px;
  background-color:#F4F4F4;
  border-radius: 20px;
  margin-top: 2px;
}

/* ลบระยะห่างของกล่องสุดท้าย */
.box:last-child {
  margin-right: 0;
}

h1{
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 5px;
    margin-left: 20px;
    font-weight: 1000;
}

h3{
    font-size: 12px;
    margin-left: 20px;
    line-height: 1.8;
    font-weight: 1000;
}

.button-container{
    text-align: center;
    font-size: 12px;
    font-weight: 1000;
    margin-top: 8px;
    margin-left: 107px;
    color: #ffffff;
    background-color: #02BDCC;
    box-shadow: 0px 5px px rgba(0, 0, 0, 0.4); /* เพิ่มเงาด้านล่างสีดำ */
    border-radius: 4px;
    width: 80px;
    height: 23px;
}

/* กล่องด้านในเก็บข้อมูล */
.containers {
  display: flex;
  flex-direction: column;
  margin-top: -5px; /* ระยะห่างด้านบน */
}

.sub-box,
.sub-boxs,
.sub-boxss {
  background-color: #F4F4F4; /* สีพื้นหลังของกล่อง */
  padding: 1px;
  flex: 1; /* กำหนดให้กล่องขยายตามขนาดของพื้นที่ที่มี */
}



h2 {
  font-size: 15px;
  margin-left: 20px;
  margin-top: 4px;
  margin-bottom: 4px;
  color: #333;
  font-weight: 600;
}

p {
  font-size: 12px;
  margin-left: 15px;
  margin-bottom: -1px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1.7px solid #B0B0B0; /* เพิ่มเส้นกั้นด้านล่าง */
  width: 90%; /* กำหนดความยาวของเส้นกั้น */
  
}

i {
  color: #00cc00;
  font-size: 16px;
  
}


}




</style>





