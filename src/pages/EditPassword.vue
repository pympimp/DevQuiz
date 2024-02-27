<script setup> 
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Swal from 'sweetalert2';
import { useAuthenStore } from '../stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { authenKey } from '../utils/config';

const authenStore = useAuthenStore()
const oldPassword = ref();
const newPassword = ref();
const router = useRouter();

onMounted(()=>{
  if (!localStorage.getItem(authenKey)) {
        router.push({ name: 'LogIn' })
      }
})

    const EditUser=()=> {
      this.$router.push({ name: "EditUser" });
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
    }
  })
}

const updateUser = async () => {
  if(oldPassword.value === authenStore.auth.password){
    const result = await axios.put(`https://functions-khaki-gamma.vercel.app/user/${authenStore.auth.id}`,{
      password:newPassword.value
    })
    if(result){
      authenStore.logout()
      Swal.fire({
          title: 'แก้ไขข้อมูลสำเร็จ',
          icon: 'success'
        },router.push("/login"))
    }
  }else{
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Invalid Password',
      showConfirmButton: false,
      timer: 1500
    })
  }
}

</script>



<template>
    <div>
      <router-link to="/EditUser">
      <div id="app">
          <a :href="link" class="custom-link">
            <i class="bi bi-backspace-fill"></i>
            <h3 @click="EditUser">ย้อนกลับ</h3>
          </a>
      </div>
    </router-link>

    <div class="contai">
        <div class="containers">
      <h1>เปลี่ยนรหัสผ่าน</h1>
    </div>
      <div class="container">
      <section>
      <div>
        <div class="inputbox">
          <p>Old Password : </p>
          <input type="password" required v-model="oldPassword"/>

        </div>
        <div class="inputbox">
            <p>New Password : </p>
          <input type="password" required v-model="newPassword"/>
        </div>
        
          <h2 class="more">หมายเหตุ : หากลืมรหัสผ่านโปรดติดต่อผู้ดูแลระบบ</h2>
        
          
          <!-- กดแล้วไปหน้าอื่น @click="EditUser()" -->
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

.contai{
  display: flex;
  flex-direction: column;
  /* background-color: #ae3458; */
  margin: auto;
  width: 360px;
}

.containers h1{
  display: flex;
  align-items: flex-start;
  width: 50%;
  /* background-color: #333; */
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
  margin-top: 120px;
  margin-bottom: 10px;
  font-weight: 600;
}

.inputbox {
  position: relative;
  margin: 30px 0;
  max-width: 310px;
  border-bottom: 2px solid #707070;
}

.inputbox label {
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  color: #707070;
  font-size: 0.85rem;
  pointer-events: none;
  transition: all 0.5s ease-in-out;
}

input:focus ~ label,
input:valid ~ label {
  top: -5px;
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


h2 {
  font-size: 12px;
  text-decoration: none;
  color: #707070;
  margin-bottom: 20px;
  
}


/* ตัวอักษร */
p{
    font-size: 1rem;
    color: #000;
    font-weight: 900;
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
  color: #EC4088;
  font-size: 1.2rem;
  margin-top: 20px;
  margin-left: 20px; /* ระยะห่างของไอคอนกับข้อความ */
  cursor: pointer;
}

h3 {
  font-size: 20px;
    color: #EC4088;
    margin-left: 2px;
    margin-top: 20px;
    cursor: pointer;
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





.back-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #EE5684; /* สีของตัวหนังสือ */
}

.back-icon {
  margin-right: 100px; /* ปรับความห่างระหว่างไอคอนกับตัวหนังสือตามต้องการ */
  font-size: 1.5rem;
}




/* reponsive */
@media only screen and (max-width: 480px) {
  .contai{
  display: flex;
  flex-direction: column;
  /* background-color: #ae3458; */
  margin: auto;
  width: 300px;
}

.containers h1{
  display: flex;
  align-items: flex-start;
  width: 50%;
  /* background-color: #333; */
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
  max-width: 300px;
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
  margin-top: 120px;
  margin-bottom: 10px;
  font-weight: 600;
}



h2 {
  font-size: 0.7rem;
  text-decoration: none;
  color: #707070;
  margin-bottom: 20px;
  
}


/* ตัวอักษร */
p{
    font-size: 1rem;
    color: #000;
    font-weight: 900;
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
  color: #EC4088;
  font-size: 1.2rem;
  margin-top: 20px;
  margin-left: 20px; /* ระยะห่างของไอคอนกับข้อความ */
  cursor: pointer;
}

h3 {
  font-size: 20px;
    color: #EC4088;
    margin-left: 2px;
    margin-top: 20px;
    cursor: pointer;
}
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





