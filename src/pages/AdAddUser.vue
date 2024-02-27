<template>
  <div class="h-[calc(97vh-50px)] bg-gray-50 p-[20px]">
    <router-link to="/Admin/AdminManageUser" class="back-link">
      <i class="fa fa-arrow-left"></i> <p>Back</p>
    </router-link>

    <div class="border border-gray-300 rounded-md p-[20px] h-full">
      <h1>Add User</h1>
      <div>
        <h3>Username :</h3>
        <input type="text" v-model="formData.username">

        <h3>Email :</h3>
        <input type="text" v-model="formData.email">

        <h3>Password :</h3>
        <input type="password" v-model="formData.password">

        <br>

        <button @click="submitForm">Submit</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import axios from "axios";
import { ref } from "vue";
import { useRoute,useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { authenKey } from '../utils/config';
import { useAuthenStore } from "../stores/auth";

const authenStore = useAuthenStore()
// eslint-disable-next-line no-unused-vars
const user = ref([]);
const router = useRouter()
// eslint-disable-next-line no-unused-vars
const route = useRoute()

onMounted(()=>{
  setTimeout(()=>{
    if (!localStorage.getItem(authenKey)) {
        router.push({ name: 'LogIn' })
  }if(authenStore.auth.role !== 'admin'){
    router.push("/")
  }
  },800)
})

const formData = ref({
  username: '',
  email: '',
  password: '',
  role: 'user'
});

const submitForm = async () => {
  try {
    const result = await axios.post('http://172.16.49.120:3000/admin/createUser', formData.value);
    if (result) {
      // If successful, update the user list and clear the form
      formData.value.username = '';
      formData.value.email = '';
      formData.value.password = '';
      Swal.fire({
        title: "เพิ่มผู้ใช้สำเร็จ!",
        // text: "You clicked the button!",
        icon: "success",

      });
      router.push('/Admin/AdminManageUser');
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "เกิดข้อผิดพลาด",
      text: "โปรดลองใหม่อีกครั้ง",
    });
  }
};
</script>

    <style scoped>
    h1 {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 1vh;
    }
    h3 {
    font-size: 1rem;
    color: #089DAA;
    font-weight: bold;
  }
    input {
  width: 25%;
  border-radius: 15px;
  box-shadow: 0 6px 6px rgba(0, 0, 0, 0.1); /* กำหนดเงา */
  border: none; /* กำหนดไม่มีเส้นขอบ */
  margin: 5px; /* กำหนดการเว้นระยะขอบของ input */
}

button {
  background-color: #EC4088; /* สีพื้นหลัง */
  color: white; /* สีตัวอักษร */
  border: none; /* ไม่มีเส้นขอบ */
  border-radius: 15px; /* มุมทรงกลม */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* เงา */
  padding: 10px 20px; /* การเว้นระยะขอบของปุ่ม */
  cursor: pointer; /* เปลี่ยนรูปลูกศรเป็นหลังคา */
  margin-left: 31vh;
  margin-top: 1.5vh;
}
    
    button:hover {
      background-color: #D32F6A; /* สีพื้นหลังเมื่อ hover */
    }
    
    .back-link {
      text-decoration: none;
      color: #333;
      display: flex;
      align-items: center;
      margin-bottom: 1vh;
    }
    
    .back-link i {
    color: #D32F6A;
      font-size: 2vh;
    }
    
    .back-link p {
      color: #D32F6A;
      font-weight: bolder;
      margin-left: 2vh;
      font-size: 2vh;
    }

    @media only screen and (max-width: 480px) {
    input {
  width: 90%;
}

button {
  margin-left: 0;
  margin-top: 5%;
}
}

@media screen and (min-width: 481px) and (max-width: 768px) {
  input {
  width: 50%;
}

button {
  margin-left: 0;
  margin-top: 2%;
}
}

@media screen and (min-width: 769px)  {
  input {
  width: 30%;
}

button {
  margin-left: 0;
}
}

    </style>