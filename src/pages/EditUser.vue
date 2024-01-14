<!-- eslint-disable no-undef -->
<script>
import axios from 'axios';
import NavBar from "@/components/NavBar.vue";
import 'bootstrap-icons/font/bootstrap-icons.css';


export default {
    name: 'EditUser',
  components: {
    NavBar,
   
  },

  // mounted(){
  //   if(localStorage.getItem("Token")){
  //     this.$router.push({ name: "UserProfile" });
  //   }
  // },

  methods: {
    UserProfile() {
      this.$router.push({ name: "UserProfile" });
    },

    EditPassword() {
      this.$router.push({ name: "EditPassword" });
    },

    async login() {
  try {
    const result = await axios.post("http://localhost:5000/test-elearning-b0646/us-central1/user/UserProfile", {
      username: this.username,
      Email: this.Email
    });

    if (result) {
      let successMessage = "Data changed successfully:";
      
      if (this.username && !this.Email) {
        successMessage += " Username";
      } else if (!this.username && this.Email) {
        successMessage += " Email";
      } else if (this.username && this.Email) {
        successMessage += " Username and Email";
      } else {
        // No data changes made
        // Display an error or do something else as required
        console.error("No data changes made");
        return;
      }

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: successMessage
      });

      // Your localStorage and router redirection logic here...
    }
  } catch (error) {
    if (error.response && error.response.status === 401 && error.response.data.error === "wrong username") {
      alert("Wrong username");
    } else {
      console.error("Error during change:", error);
    }
  }
}
  }

};
</script>



<template>
    <div>
      <NavBar />
      <div id="app">
          <a :href="link" class="custom-link">
            <i class="bi bi-backspace-fill"></i>
            <h3 @click="UserProfile">ย้อนกลับ</h3>
          </a>
      </div>
      <h1>แก้ไขข้อมูลผู้ใช้</h1>
      <div class="container">
      <section>
      <form>
        <div class="inputbox">
          <p>Username : </p>
          <ion-icon name="user-outline"></ion-icon>
          <input type="user" required />
          <!-- <label for="">Email</label> -->
        </div>

        <div class="inputbox">
          <p>E-mail : </p>
          <ion-icon name="mail-outline"></ion-icon>
          <input type="mail" required />
          <!-- <label for="">Email</label> -->
        </div>

        <div class="password" @click="EditPassword">
           <a href="#"><i class="bi bi-key-fill"></i>Change Password</a>
        </div>

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
p{
    font-size: 1rem;
    color: #000;
    font-weight: 900;
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




/* responsive */
/*  */


@media screen and (max-width: 1890px) {


}

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





