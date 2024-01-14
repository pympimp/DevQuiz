<script>
import axios from 'axios';
import NavBar from "@/components/NavBar.vue";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Swal from 'sweetalert2';

export default {
    name: 'EditPAssword',
  components: {
    NavBar,
   
  },
  methods: {
    EditUser() {
      this.$router.push({ name: "EditUser" });
    },

    async login() {
  try {
    const result = await axios.post("http://localhost:5000/test-elearning-b0646/us-central1/user/EditPAssword", {
      OldPassword: this.OldPassword,
      NewPassword: this.NewPassword
    });

    if (result) {
      Swal.fire({
        icon: 'success',
        title: 'Password Changed!',
        text: 'Your password has been changed successfully.'
      });
      
    }
  } catch (error) {
    if (error.response && error.response.status === 401 && error.response.data.error === "wrong password") {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Wrong password'
      });

    } else {
      console.error("Error during signup:", error);
    }
  }
}

  }
};
</script>



<template>
    <div>
      <NavBar />
      <router-link to="/EditUser">
      <div id="app">
          <a :href="link" class="custom-link">
            <i class="bi bi-backspace-fill"></i>
            <h3 @click="EditUser">ย้อนกลับ</h3>
          </a>
      </div>
    </router-link>

      <h1>เปลี่ยนรหัสผ่าน</h1>
      <div class="container">
      <section>
      <form>
        <div class="inputbox">
          <ion-icon name="lock-closed-outline"></ion-icon>
          <p>Old Password : </p>
          <input type="password" required />

        </div>
        <div class="inputbox">
            <p>New Password : </p>
          <ion-icon name="lock-closed-outline"></ion-icon>
          <input type="password" required />
          
        </div>
        
          <h2 class="more">หมายเหตุ : หากลืมรหัสผ่านโปรดติดต่อผู้ดูแลระบบ</h2>
        
          
          <!-- กดแล้วไปหน้าอื่น @click="EditUser()" -->
        <button>ยืนยัน</button>
      </form>
    </section>
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
  margin-left: 600px;
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






/* resopnsive */
@media screen and (max-width: 1440px) {

/* ตัวอักษร */
p{
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
  p{
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
p{
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

  p{
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

 p{
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
  font-weight:  600;
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

  p{
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
  font-weight:  600;
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

  p{
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
  font-weight:  600;
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





