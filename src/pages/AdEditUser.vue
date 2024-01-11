<template>
  <div class="h-[calc(97vh-50px)] bg-gray-50 p-[20px]">
    <router-link to="/Admin/AdminManageUser" class="back-link">
      <i class="fa fa-arrow-left"></i>
      <p>Back</p>
    </router-link>

    <div class="border border-gray-300 rounded-md p-[20px] h-full">
      <h1>Edit User</h1>

      <div>
        <h2>ID: {{ user.id }}</h2>
        <h3>Username:</h3>
        <input type="text" v-model="user.username" />

        <h3>Email:</h3>
        <input type="text" v-model="user.email" />

        <h3>Password:</h3>
        <input type="password" v-model="user.password" />

        <br />

        <button @click="handleSubmit">Submit</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRoute,useRouter } from 'vue-router'

const user = ref({
  id: '',
  username: '',
  email: '',
  password: ''
})

const router = useRouter()
const route = useRoute()

const fetchData = async () => {
  try {
    const userId = route.params.Id

    if (userId) {
      const result = await axios.get(
        `http://localhost:5000/test-elearning-b0646/us-central1/api/user/${userId}`
      )

      if (result.data) {
        user.value = result.data
      }
    } else {
      console.error('User ID is undefined')
    }
  } catch (error) {
    console.error('Error during getdata:', error)
  }
}

const handleSubmit = () => {
  // Handle form submission or any other logic
  // editUser();
  editUser()
  console.log(user.value)
}

const editUser = async () => {
  const userId = user.value.id
  try {
    const result = await axios.put(
      `http://localhost:5000/test-elearning-b0646/us-central1/api/admin/edit/${userId}`,
      {
        username: user.value.username,
        email: user.value.email,
        password: user.value.password
      }
    )
    if (result) {
      fetchData();
      alert("Update Successed!")
      router.push('/Admin/AdminManageUser');
    }
  } catch (error) {
    console.error('Error during getdata:', error)
  }
}

onMounted(() => {
  if (route.params.Id) {
    fetchData()
  }
})
</script>

<style scoped>
h1 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1vh;
}
h3 {
  font-size: 1rem;
  color: #089daa;
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
  background-color: #ec4088; /* สีพื้นหลัง */
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
  background-color: #d32f6a; /* สีพื้นหลังเมื่อ hover */
}

.back-link {
  text-decoration: none;
  color: #333;
  display: flex;
  align-items: center;
  margin-bottom: 1vh;
}

.back-link i {
  color: #d32f6a;
  font-size: 2vh;
}

.back-link p {
  color: #d32f6a;
  font-weight: bolder;
  margin-left: 2vh;
  font-size: 2vh;
}
</style>
