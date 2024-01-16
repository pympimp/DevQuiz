<!-- eslint-disable no-undef -->
<script setup>
import axios from 'axios'
import NavBar from '@/components/NavBar.vue'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { ref } from 'vue'
import { useAuthenStore } from '../stores/auth'
import { onMounted } from 'vue'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { useRouter } from 'vue-router'
import { HalfCircleSpinner } from 'epic-spinners'

const InputData = ref({
  email: '',
  username: ''
})

const router = useRouter()
const authenStore = useAuthenStore()
const isLoading = ref(false)

onMounted(async() => {
  isLoading.value = true
  setTimeout(() => {
    if (authenStore.auth) {
      fetchOneUser()
    }
    isLoading.value = false
  }, 800)
})

const UserProfile = () => {
  router.push("/UserProfile")
}

const EditPassword = () => {
  router.push("/EditPassword")
}

const onSubmit = () => {
  Swal.fire({
    title: 'ยืนยันการแก้ไขข้อมูล?',
    text: 'ไม่สามารถย้อนกลับการกระทำนี้ได้',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'ตกลง',
    cancelButtonText: 'ยกเลิก'
  }).then((result) => {
    if (result.isConfirmed) {
      updateUser()
      if (updateUser()) {
        Swal.fire({
          title: 'แก้ไขข้อมูลสำเร็จ',
          icon: 'success'
        })
      }
    }
  })
}

const updateUser = async () => {
  const result = await axios.put(
    `http://localhost:5000/test-elearning-b0646/us-central1/api/user/${authenStore.auth.id}`,
    InputData.value
  )
  if (result) {
    router.push("/UserProfile")
  }
}

const fetchOneUser =async()=>{
      const result = await axios.get(`http://localhost:5000/test-elearning-b0646/us-central1/api/user/${authenStore.auth.id}`)
    if(result){
      InputData.value = ({
        email:result.data.email,
        username:result.data.username
      })
    }
  }

// const fetchOneUser = async()=>{
//   const result = await axios
// }
</script>

<template>
  <div>
    <NavBar />
    <router-link to="/UserProfile">
      <div id="app">
        <a :href="link" class="custom-link">
          <i class="bi bi-backspace-fill"></i>
          <h3 @click="UserProfile">ย้อนกลับ</h3>
        </a>
      </div>
    </router-link>

    <half-circle-spinner
      :animation-duration="1000"
      :size="60"
      color="#ff1d5e"
      class="loading"
      v-if="isLoading"
    />
    <div v-if="!isLoading">
      <h1>แก้ไขข้อมูลผู้ใช้</h1>
      <div class="container">
        <section>
          <div>
            <div class="inputbox">
              <p>Username :</p>
              <input type="user" v-model="InputData.username" required />
              <!-- <label for="">Email</label> -->
            </div>

            <div class="inputbox">
              <p>E-mail :</p>
              <input type="mail" v-model="InputData.email" required />
              <!-- <label for="">Email</label> -->
            </div>

            <div class="password" @click="EditPassword">
              <a href="#"><i class="bi bi-key-fill"></i>Change Password</a>
            </div>

            <button @click="onSubmit()">ยืนยัน</button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');

* {
  box-sizing: border-box;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-icon {
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 2rem;
  color: #ee5684;
  cursor: pointer;
}

section {
  position: relative;
  max-width: 400px;
  background-color: rgb(246, 246, 246);
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  backdrop-filter: blur(55px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 3rem;
}

h1 {
  font-size: 20px;
  color: #ffffff;
  margin-left: 610px;
  margin-top: 125px;
  margin-bottom: 10px;
  font-weight: 600;
}

/* การตกแต่งลิงก์และข้อความ */
.custom-link {
  text-decoration: none;
  display: flex;
  flex-direction: row;
  color: #333; /* สีข้อความ */
  font-family: Arial, sans-serif;
}

i {
  /* ขนาดของไอคอน */
  color: #ec4088;
  font-size: 1.2rem;
  margin-top: 20px;
  margin-left: 20px; /* ระยะห่างของไอคอนกับข้อความ */
  cursor: pointer;
}

h3 {
  font-size: 20px;
  color: #ec4088;
  margin-left: 2px;
  margin-top: 20px;
  cursor: pointer;
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* ตัวอย่างการกำหนดสไตล์เพิ่มเติมสำหรับ Spinner หากต้องการ */
}

/* เพิ่มสไตล์เมื่อผู้ใช้ชี้เมาส์เข้ามา
h3:hover {
  color: #FF0000; 
  text-decoration: underline; 
}

i:hover {
  color: #FF0000;
  text-decoration: underline; 
} */

.inputbox {
  position: relative;
  margin: 30px 0;
  max-width: 310px;
  border-bottom: 2px solid #707070;
}

.inputbox label {
  position: absolute;
  top: 50px;
  left: 2px;
  transform: translateY(-50%);
  color: #707070;
  font-size: 0.85rem;
  pointer-events: none;
  transition: all 0.5s ease-in-out;
}

.inputbox input {
  width: 100%;
  height: 40px;
  background: transparent;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 0 35px 0 5px;
  color: #707070;
}

.inputbox ion-icon {
  position: absolute;
  right: 8px;
  color: #fff;
  font-size: 1.2rem;
  top: 20px;
}

.password {
  margin: 10px 0;
}

.password a {
  text-decoration: none;
  color: #ee5684;
  font-weight: 1000;
}

.password a:hover {
  text-decoration: underline;
  text-decoration-thickness: 1.5px;
  text-underline-offset: 2.5px;
}

.password i {
  font-size: 20px;
  margin-right: 5px;
}

button {
  width: 100%;
  height: 45px;
  border-radius: 10px;
  background-color: #ee5684;
  border: none;
  outline: none;
  cursor: pointer;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.4s ease;
  margin-top: 0.7rem;
}

button:hover {
  background-color: #ae3458;
}

/* ตัวอักษร */
p {
  font-size: 1rem;
  color: #000;
  font-weight: 900;
}

.back-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #ee5684; /* สีของตัวหนังสือ */
}

.back-icon {
  margin-right: 100px; /* ปรับความห่างระหว่างไอคอนกับตัวหนังสือตามต้องการ */
  font-size: 1.5rem;
}

/* responsive */
/*  */

@media screen and (max-width: 1890px) {
}

@media screen and (max-width: 1440px) {
  /* ตัวอักษร */
  p {
    font-size: 20px;
    color: #000;
    font-weight: 900;
  }

  h1 {
    font-size: 30px;
    color: #ffffff;
    margin-left: 530px;
    margin-top: 125px;
    margin-bottom: 10px;
    font-weight: 600;
  }

  button {
    width: 100%;
    height: 45px;
    border-radius: 10px;
    background-color: #ee5684;
    border: none;
    outline: none;
    cursor: pointer;
    color: #ffffff;
    font-size: 1.4rem;
    font-weight: 600;
    transition: all 0.4s ease;
    margin-top: 0.7rem;
  }

  section {
    position: relative;
    width: 400px;
    background-color: rgb(246, 246, 246);
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    backdrop-filter: blur(55px);
    margin-left: 150px;
    padding: 2rem 3rem;
  }
}

@media screen and (max-width: 1024px) {
  /* ตัวอักษร */
  p {
    font-size: 20px;
    color: #000;
    font-weight: 900;
  }

  h1 {
    font-size: 30px;
    color: #ffffff;
    margin-left: 330px;
    margin-top: 35px;
    margin-bottom: 10px;
    font-weight: 600;
  }

  button {
    width: 100%;
    height: 45px;
    border-radius: 10px;
    background-color: #ee5684;
    border: none;
    outline: none;
    cursor: pointer;
    color: #ffffff;
    font-size: 1.4rem;
    font-weight: 600;
    transition: all 0.4s ease;
    margin-top: 0.7rem;
  }

  section {
    position: relative;
    width: 400px;
    background-color: rgb(246, 246, 246);
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    backdrop-filter: blur(55px);
    margin-left: 10px;
    padding: 2rem 3rem;
  }
}

@media screen and (max-width: 820px) {
  /* ตัวอักษร */
  p {
    font-size: 20px;
    color: #000;
    font-weight: 900;
  }

  h1 {
    font-size: 28px;
    color: #ffffff;
    margin-left: 60px;
    margin-top: 125px;
    margin-bottom: 10px;
    font-weight: 600;
  }

  button {
    width: 100%;
    height: 45px;
    border-radius: 10px;
    background-color: #ee5684;
    border: none;
    outline: none;
    cursor: pointer;
    color: #ffffff;
    font-size: 1.4rem;
    font-weight: 600;
    transition: all 0.4s ease;
    margin-top: 0.7rem;
  }

  section {
    position: relative;
    width: 400px;
    background-color: rgb(246, 246, 246);
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    backdrop-filter: blur(55px);
    margin-left: -275px;
    padding: 2rem 3rem;
  }
}

@media screen and (max-width: 768px) {
  p {
    font-size: 20px;
    color: #000;
    font-weight: 900;
  }

  h1 {
    font-size: 25px;
    color: #ffffff;
    margin-left: 200px;
    margin-top: 30px;
    margin-bottom: 10px;
    font-weight: 600;
  }

  button {
    width: 100%;
    height: 45px;
    border-radius: 10px;
    background-color: #ee5684;
    border: none;
    outline: none;
    cursor: pointer;
    color: #ffffff;
    font-size: 1.4rem;
    font-weight: 600;
    transition: all 0.4s ease;
    margin-top: 0.7rem;
  }

  section {
    position: relative;
    width: 400px;
    background-color: rgb(246, 246, 246);
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    backdrop-filter: blur(55px);
    margin-left: 10px;
    padding: 2rem 3rem;
  }
}

@media screen and (max-width: 426px) {
  p {
    font-size: 15px;
    color: #000;
    font-weight: 900;
  }

  h1 {
    font-size: 20px;
    color: #ffffff;
    margin-left: 80px;
    margin-top: 60px;
    margin-bottom: 10px;
    font-weight: 600;
  }

  button {
    width: 100%;
    height: 35px;
    border-radius: 10px;
    background-color: #ee5684;
    border: none;
    outline: none;
    cursor: pointer;
    color: #ffffff;
    font-size: 1.2rem;
    font-weight: 600;
    transition: all 0.4s ease;
    margin-top: 0.7rem;
  }

  section {
    position: relative;
    width: 300px;
    background-color: rgb(246, 246, 246);
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    /* backdrop-filter: blur(55px); */
    margin-left: 10px;
    /* padding: 2rem 3rem; */
  }
}

@media screen and (max-width: 376px) {
  p {
    font-size: 15px;
    color: #000;
    font-weight: 900;
  }

  h1 {
    font-size: 20px;
    color: #ffffff;
    margin-left: 55px;
    margin-top: 60px;
    margin-bottom: 10px;
    font-weight: 600;
  }

  button {
    width: 100%;
    height: 35px;
    border-radius: 10px;
    background-color: #ee5684;
    border: none;
    outline: none;
    cursor: pointer;
    color: #ffffff;
    font-size: 1.2rem;
    font-weight: 600;
    transition: all 0.4s ease;
    margin-top: 0.7rem;
  }

  section {
    position: relative;
    width: 300px;
    background-color: rgb(246, 246, 246);
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    /* backdrop-filter: blur(55px); */
    margin-left: 8px;
    /* padding: 2rem 3rem; */
  }
}

@media screen and (max-width: 320px) {
  p {
    font-size: 15px;
    color: #000;
    font-weight: 900;
  }

  h1 {
    font-size: 20px;
    color: #ffffff;
    margin-left: 25px;
    margin-top: 60px;
    margin-bottom: 10px;
    font-weight: 600;
  }

  button {
    width: 100%;
    height: 35px;
    border-radius: 10px;
    background-color: #ee5684;
    border: none;
    outline: none;
    cursor: pointer;
    color: #ffffff;
    font-size: 1.1rem;
    font-weight: 600;
    transition: all 0.4s ease;
    margin-top: 0.7rem;
  }

  section {
    position: relative;
    width: 290px;
    background-color: rgb(246, 246, 246);
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    /* backdrop-filter: blur(55px); */
    margin-left: 2px;
    /* padding: 2rem 3rem; */
  }
}
</style>
