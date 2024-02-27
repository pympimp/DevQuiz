<script>
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useAuthenStore } from '../stores/auth'
import axios from 'axios'
import { ref } from 'vue'
import { authenKey } from '../utils/config';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { HalfCircleSpinner } from 'epic-spinners'

export default {
  mounted() {
    if(!localStorage.getItem(authenKey)){
      this.$router.push({ name: "LogIn" });
    };
    setTimeout(() => {
      this.isLoading = true
      this.fetchOneUser()
      this.fetchCourses()
    }, 200)
  },
  name: 'UserProfile',
  components: {
    FontAwesomeIcon,
    HalfCircleSpinner
  },
  data() {
    return {
      authenStore: useAuthenStore(),
      courses: ref(),
      ProgressIndex: ref([]),
      userData: ref(),
      isLoading: ref(false)
    }
  },
  methods: {
    EditUser() {
      this.$router.push({ name: 'EditUser' })
    },
    async fetchCourses() {
      try {
        const result = await axios.get(
          'https://functions-khaki-gamma.vercel.app/coures/'
        )
        if (result) {
          this.courses = result.data
          this.isLoading = false
        }
      } catch (error) {
        console.error('Error during getdata:', error)
      }
    },

    userProgress(courseName) {
      const userIndex = this.userData.progress
      try {
        const foundIndex = userIndex.findIndex((item) => item.name === courseName)
        if (foundIndex !== -1) {
          return foundIndex
        } else {
          console.log('Not found')
        }
        console.log('content1', this.ProgressIndex)
      } catch (error) {
        console.error('Error loading progress data: ', error)
      }
    },

    async fetchOneUser() {
      if (this.authenStore.auth) {
        const result = await axios.get(
          `https://functions-khaki-gamma.vercel.app/user/${this.authenStore.auth.id}`
        )
        if (result) {
          this.userData = result.data
        }
      }
    }
  }
}
</script>

<template>
  <div>
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
          <h3>Username : {{ userData.username }}</h3>
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
                  <h2>{{ subitem.nameLesson }} {{ item.name }}</h2>
                  <div
                    style="display: flex; flex-direction: row; justify-content: center"
                    v-for="(thirditem, thirdindex) in subitem.units"
                    :key="thirdindex"
                  >
                    <div class="row-content">
                      <span>{{ index + 1 + '.' + (thirdindex + 1) }} {{ thirditem.header }}</span>
                      <div
                        class="icon-card"
                        :style="{
                          backgroundColor: userData.progress[userProgress(item.name)][
                            subitem.nameLesson
                          ][thirditem.nameUnit]
                            ? 'rgba(151, 221, 118, 1)'
                            : 'rgba(223, 115, 115, 1) '
                        }"
                      >
                        <FontAwesomeIcon
                          icon="fa-solid fa-check"
                          v-if="
                            userData.progress[userProgress(item.name)][subitem.nameLesson][
                              thirditem.nameUnit
                            ] == true
                          "
                        />
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
  /* margin: 0;
  padding: 0; */
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

.row-content {
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
  width: auto;
 
  
  
}

.content {
  display: flex;
  flex-direction: row;
  background-color: red;
}

.boxs {
  width: 320px;
  height: 200px;
  margin-right: 20px; /* ปรับระยะห่างด้านขวาของกล่อง */
  background-color: #f4f4f4;
  border-top-left-radius: 15px; /* กำหนดความโค้งด้านซ้ายของกล่อง */
  border-bottom-left-radius: 15px; /* กำหนดความโค้งด้านซ้ายของกล่อง */
}

.box {
  width: 850px;
  background-color: #f4f4f4;
  border-top-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
  border-bottom-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
  margin-bottom: 1%;
}

/* ลบระยะห่างของกล่องสุดท้าย */
.box:last-child {
  margin-right: 0;
}

h1 {
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
  margin-left: 20px;
  font-weight: 1000;
}

h3 {
  font-size: 15px;
  margin-left: 20px;
  /* line-height: 1.5; */
  font-weight: 1000;
}

.button-container {
  text-align: center;
  font-size: 14px;
  font-weight: 1000;
  margin-top: 50px;
  margin-left: 100px;
  color: #ffffff;
  background-color: #02bdcc;
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
  background-color: #f4f4f4; /* สีพื้นหลังของกล่อง */
  padding: 5px;
  flex: 1; /* กำหนดให้กล่องขยายตามขนาดของพื้นที่ที่มี */
  border-top-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
  border-bottom-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
}

h2 {
  font-size: 19px;
  margin-left: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #333;
  font-weight: 600;
}



@media only screen and (max-width: 480px) {
  
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
  font-size: 1rem;
  width: 1.5rem; /* ปรับขนาดตามที่ต้องการ */
  height: 1.5rem; /* ปรับขนาดตามที่ต้องการ */
  border-radius: 50%; /* ทำให้เป็นวงกลม */
  box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.25); /* inner shadow */
}

.row-content {
  display: flex;
  flex-direction: row;
  font-size: 0.9rem;
  border-bottom: 1px solid gray;
  padding: 2%;
  width: 95%;
  text-align: center;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 40px;
}

.content {
  display: flex;
  flex-direction: row;
}

.boxs {
  width: 320px;
  height: 170px;
  margin-right: 20px; /* ปรับระยะห่างด้านขวาของกล่อง */
  background-color: #f4f4f4;
  border-radius: 2%; /* กำหนดความโค้งด้านซ้ายของกล่อง */
  
}

.box {
  width: 440px;
  background-color: #f4f4f4;
  border-top-right-radius: 5px; /* กำหนดความโค้งด้านขวาของกล่อง */
  border-top-left-radius: 5px; /* กำหนดความโค้งด้านขวาของกล่อง */
  border-bottom-right-radius: 5px; /* กำหนดความโค้งด้านขวาของกล่อง */
  border-bottom-left-radius: 5px; /* กำหนดความโค้งด้านขวาของกล่อง */
}

/* ลบระยะห่างของกล่องสุดท้าย */
.box:last-child {
  margin-top: 2%;
}

h1 {
  font-size: 1.3rem;
  margin-top: 20px;
  margin-bottom: 10px;
  margin-left: 20px;
  font-weight: 1000;
}

h3 {
  font-size: 0.9rem;
  margin-left: 20px;
  /* line-height: 1.5; */
  font-weight: 1000;
}

.button-container {
  text-align: center;
  font-size: 14px;
  font-weight: 1000;
  margin-top: 10%;
  color: #ffffff;
  background-color: #02bdcc;
  box-shadow: 0px 5px px rgba(0, 0, 0, 0.4); /* เพิ่มเงาด้านล่างสีดำ */
  border-radius: 4px;
  width: 90px;
  height: 25px;
}

/* กล่องด้านในเก็บข้อมูล */
.containers {
  display: flex;
  flex-direction: column;
  background-color: #02bdcc;
  margin-top: 5px; /* ระยะห่างด้านบน */
 
}

.sub-box,
.sub-boxs,
.sub-boxss {
  background-color: #f4f4f4; /* สีพื้นหลังของกล่อง */
  padding: 1px;
  flex: 1; /* กำหนดให้กล่องขยายตามขนาดของพื้นที่ที่มี */
}

h2 {
  font-size: 1.1rem;
  margin-left: 10px;
  margin-top: 5%;
  margin-bottom: 10px;
  color: #333;
  font-weight: 600;
}



}

@media screen and (min-width: 481px) and (max-width: 768px) {
  
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
  font-size: 1rem;
  width: 1.5rem; /* ปรับขนาดตามที่ต้องการ */
  height: 1.5rem; /* ปรับขนาดตามที่ต้องการ */
  border-radius: 50%; /* ทำให้เป็นวงกลม */
  box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.25); /* inner shadow */
}

.row-content {
  display: flex;
  flex-direction: row;
  font-size: 0.9rem;
  border-bottom: 1px solid gray;
  padding: 2%;
  width: 85%;
  text-align: center;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 40px;
}

.content {
  display: flex;
  flex-direction: row;
}

.boxs {
  width: 350px;
  height: 170px;
  margin-right: 20px; /* ปรับระยะห่างด้านขวาของกล่อง */
  background-color: #f4f4f4;
  border-radius: 2%; /* กำหนดความโค้งด้านซ้ายของกล่อง */
  
}

.box {
  width: 550px;
  background-color: #f4f4f4;
  border-top-right-radius: 5px; /* กำหนดความโค้งด้านขวาของกล่อง */
  border-top-left-radius: 5px; /* กำหนดความโค้งด้านขวาของกล่อง */
  border-bottom-right-radius: 5px; /* กำหนดความโค้งด้านขวาของกล่อง */
  border-bottom-left-radius: 5px; /* กำหนดความโค้งด้านขวาของกล่อง */
}

/* ลบระยะห่างของกล่องสุดท้าย */
.box:last-child {
  margin-top: 2%;
}

h1 {
  font-size: 1.3rem;
  margin-top: 20px;
  margin-bottom: 10px;
  margin-left: 20px;
  font-weight: 1000;
}

h3 {
  font-size: 0.9rem;
  margin-left: 20px;
  /* line-height: 1.5; */
  font-weight: 1000;
}

.button-container {
  text-align: center;
  margin-left: 125px;
  font-size: 14px;
  font-weight: 1000;
  margin-top: 10%;
  color: #ffffff;
  background-color: #02bdcc;
  box-shadow: 0px 5px px rgba(0, 0, 0, 0.4); /* เพิ่มเงาด้านล่างสีดำ */
  border-radius: 4px;
  width: 90px;
  height: 25px;
}

/* กล่องด้านในเก็บข้อมูล */
.containers {
  display: flex;
  flex-direction: column;
  background-color: #02bdcc;
  margin-top: 5px; /* ระยะห่างด้านบน */
 
}

.sub-box,
.sub-boxs,
.sub-boxss {
  background-color: #f4f4f4; /* สีพื้นหลังของกล่อง */
  padding: 1px;
  flex: 1; /* กำหนดให้กล่องขยายตามขนาดของพื้นที่ที่มี */
}

h2 {
  font-size: 1.2rem;
  margin-left: 10%;
  margin-top: 5%;
  margin-bottom: 10px;
  color: #333;
  font-weight: 600;
}

}

@media screen and (min-width: 769px) and (max-width: 1024px) {
  
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

.row-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 0.9rem;
  border-bottom: 1px solid gray;
  padding: 3.5%;
  width: 95%;
  text-align: center;
}
.container {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.content {
  display: flex;
  flex-direction: row;
  background-color: red;
}

.boxs {
  width: 340px;
  height: 200px;
  margin-right: 20px; /* ปรับระยะห่างด้านขวาของกล่อง */
  background-color: #f4f4f4;
  border-top-left-radius: 15px; /* กำหนดความโค้งด้านซ้ายของกล่อง */
  border-bottom-left-radius: 15px; /* กำหนดความโค้งด้านซ้ายของกล่อง */
}

.box {
  width: 650px;
  background-color: #f4f4f4;
  border-top-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
  border-bottom-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
  margin-bottom: 1%;
}

/* ลบระยะห่างของกล่องสุดท้าย */
.box:last-child {
  margin-right: 0;
}

h1 {
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
  margin-left: 20px;
  font-weight: 1000;
}

h3 {
  font-size: 15px;
  margin-left: 20px;
  /* line-height: 1.5; */
  font-weight: 1000;
}

.button-container {
  text-align: center;
  font-size: 14px;
  font-weight: 1000;
  margin-top: 20px;
  margin-left: 100px;
  color: #ffffff;
  background-color: #02bdcc;
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
  background-color: #f4f4f4; /* สีพื้นหลังของกล่อง */
  padding: 5px;
  flex: 1; /* กำหนดให้กล่องขยายตามขนาดของพื้นที่ที่มี */
  border-top-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
  border-bottom-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
}

h2 {
  font-size: 19px;
  margin-left: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #333;
  font-weight: 600;
}

}

@media screen and (min-width: 1025px) and (max-width: 1200px) {

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

.row-content {
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
  margin-left: 5%;
  display: flex;
  justify-content: center;
  margin-top: 40px;
  width: auto;
 
  
  
}

.content {
  display: flex;
  flex-direction: row;
  background-color: red;
}

.boxs {
  width: 320px;
  height: 200px;
  margin-right: 20px; /* ปรับระยะห่างด้านขวาของกล่อง */
  background-color: #f4f4f4;
  border-top-left-radius: 15px; /* กำหนดความโค้งด้านซ้ายของกล่อง */
  border-bottom-left-radius: 15px; /* กำหนดความโค้งด้านซ้ายของกล่อง */
}

.box {
  width: 850px;
  background-color: #f4f4f4;
  border-top-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
  border-bottom-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
  margin-bottom: 1%;
}

/* ลบระยะห่างของกล่องสุดท้าย */
.box:last-child {
  margin-right: 0;
}

h1 {
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
  margin-left: 20px;
  font-weight: 1000;
}

h3 {
  font-size: 15px;
  margin-left: 20px;
  /* line-height: 1.5; */
  font-weight: 1000;
}

.button-container {
  text-align: center;
  font-size: 14px;
  font-weight: 1000;
  margin-top: 15%;
  margin-left: 100px;
  color: #ffffff;
  background-color: #02bdcc;
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
  background-color: #f4f4f4; /* สีพื้นหลังของกล่อง */
  padding: 5px;
  flex: 1; /* กำหนดให้กล่องขยายตามขนาดของพื้นที่ที่มี */
  border-top-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
  border-bottom-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
}

h2 {
  font-size: 19px;
  margin-left: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #333;
  font-weight: 600;
}
}

@media screen and (min-width: 1200px) {
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

.row-content {
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
  width: auto;
 
  
  
}

.content {
  display: flex;
  flex-direction: row;
  background-color: red;
}

.boxs {
  width: 320px;
  height: 200px;
  margin-right: 20px; /* ปรับระยะห่างด้านขวาของกล่อง */
  background-color: #f4f4f4;
  border-top-left-radius: 15px; /* กำหนดความโค้งด้านซ้ายของกล่อง */
  border-bottom-left-radius: 15px; /* กำหนดความโค้งด้านซ้ายของกล่อง */
}

.box {
  width: 850px;
  background-color: #f4f4f4;
  border-top-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
  border-bottom-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
  margin-bottom: 1%;
}

/* ลบระยะห่างของกล่องสุดท้าย */
.box:last-child {
  margin-right: 0;
}

h1 {
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
  margin-left: 20px;
  font-weight: 1000;
}

h3 {
  font-size: 15px;
  margin-left: 20px;
  /* line-height: 1.5; */
  font-weight: 1000;
}

.button-container {
  text-align: center;
  font-size: 14px;
  font-weight: 1000;
  margin-top: 15%;
  margin-left: 100px;
  color: #ffffff;
  background-color: #02bdcc;
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
  background-color: #f4f4f4; /* สีพื้นหลังของกล่อง */
  padding: 5px;
  flex: 1; /* กำหนดให้กล่องขยายตามขนาดของพื้นที่ที่มี */
  border-top-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
  border-bottom-right-radius: 15px; /* กำหนดความโค้งด้านขวาของกล่อง */
}

h2 {
  font-size: 19px;
  margin-left: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #333;
  font-weight: 600;
}
}
</style>
