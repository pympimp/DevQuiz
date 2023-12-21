<script>
import NavBar from "@/components/NavBar.vue";
import 'bootstrap-icons/font/bootstrap-icons.css';


export default {
    name: 'EditPAssword',
  components: {
    NavBar,
   
  },
  methods: {
    HomePage() {
      this.$router.push({ name: "HomePage" });
    },
  }
};
</script>



<template>
    <div>
      <NavBar />
      <h3>ย้อนกลับ</h3>
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

h3 {
    font-size: 20px;
    color: #ffffff;
    margin-left: 40px;
    margin-top: 20px;
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





