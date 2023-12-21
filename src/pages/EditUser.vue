<script>
import NavBar from "@/components/NavBar.vue";
import 'bootstrap-icons/font/bootstrap-icons.css';


export default {
    name: 'EditUser',
  components: {
    NavBar,
   
  },
  methods: {
    HomePage() {
      this.$router.push({ name: "HomePage" });
    },

    EditPassword() {
      this.$router.push({ name: "EditPassword" });
    },

  }
};
</script>



<template>
    <div>
      <NavBar />
      <h3>ย้อนกลับ</h3>
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

        <button @click="HomePage">ยืนยัน</button>
      </form>
    </section>
  </div>
  </div>
</template>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');

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

h3 {
    font-size: 20px;
    color: #ffffff;
    margin-left: 40px;
    margin-top: 20px;
}


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




</style>





