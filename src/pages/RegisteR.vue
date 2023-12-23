<template>
  <!-- <NavBar/> -->
  <!-- <NavBar/> -->
  <body>
    <router-link to="/"> </router-link>
    <section>
      <div>
        <router-link to="/" class="back-link">
          <span class="bi bi-arrow-left back-icon"></span>
          <!-- <p>back</p> -->
        </router-link>
        <br />
        <h1>Register</h1>
        <div class="inputbox">
          <!-- <ion-icon name="lock-closed-outline"></ion-icon> -->
          <input type="username" required v-model="username"/>
          <label for="">Username</label>
        </div>
        <div class="inputbox">
          <!-- <ion-icon name="mail-outline"></ion-icon> -->
          <input type="email" required v-model="email"/>
          <label for="">Email</label>
        </div>
        <div class="inputbox">
          <!-- <ion-icon name="lock-closed-outline"></ion-icon> -->
          <input type="password" required v-model="password"/>
          <label for="">Password</label>
        </div>
        <!-- ในส่วนการกดสมัครเมื่อสมัครแล้วจะทำฟังก์ชั่น signup -->
        <button @click="signup()">Register</button>
        <div class="register" @click="login()">
          <p>Already have an account? <a href="#">Login</a></p>
          <!-- <p class="more">หมายเหตุ : หากลืมรหัสผ่านโปรดติดต่อผู้ดูแลระบบ</p> -->
        </div>
      </div>
    </section>
  </body>
</template>

<script>
// import NavBar from "@/components/NavBar.vue";
import 'bootstrap-icons/font/bootstrap-icons.css'
import axios from 'axios'

export default {
  name: 'LogIn',
  data(){
    return {
      // ส่วนการเตรียมข้อมูล
      username:'',
      email:'',
      password:'',
      role:'user'
    }
  },
  components: {
    // NavBar,
  },
  methods: {
    login() {
      // เพิ่มโค้ดที่คุณต้องการเมื่อปุ่มถูกคลิก
      this.$router.push({ name: "LogIn" });
    },
    // ฟังก์ชันการสมัคร
    async signup(){
  try {
    // ส่วนของการส่งข้อมูล
    const result = await axios.post("http://localhost:5000/test-elearning-b0646/us-central1/user/register", {
      email: this.email,
      username: this.username,
      password: this.password,
      role: this.role,
    });
    // เมื่อสมัครได้
    if (result) {
      console.log(result.data);
      alert("Sign-up done");
      this.$router.push({ name: "LogIn" });
    }
  } catch (error) {
    // ดักข้อมูลซ้ำและผิดพลาด
    if (error.response && error.response.status === 400 && error.response.data.error === "Email  already exists") {
      alert("Email already exists. Please choose a different one.");
    }if(error.response && error.response.status === 400 && error.response.data.error === "Username  already exists"){
      alert("Username already exists. Please choose a different one.");
    }else{
      console.error("Error during signup:", error);
    }
  }
    }

  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'poppins', sans-serif;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #1f1f1f;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
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
  font-size: 2rem;
  color: #000000;
  text-align: center;
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

button {
  width: 100%;
  height: 45px;
  border-radius: 40px;
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

.register {
  color: #707070;
  /* text-align: center; */
  margin: 10px 0 10px;
}

.register p a {
  text-decoration: none;
  color: #ee5684;
  font-weight: 600;
  text-align: center;
}

.register p a:hover {
  text-decoration: underline;
}

/* .register .more {
    text-decoration: none;
    color: #EE5684;
    font-weight: 600;
    text-align: center;
} */

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

/* เพิ่มสไตล์สำหรับตัวหนังสือเพิ่มเติมตามที่คุณต้องการ */
p {
  font-size: 1rem;
}
</style>
