<template>
  <div class="h-[calc(97vh-50px)] bg-gray-50 p-[20px]">
    <div class="top-sec">
      <h1>Manage User</h1>
      <router-link to="AdminAddUser">
        <button class="btn"><i class="fa fa-plus"></i></button>
      </router-link>
    </div>
    <div class="border border-gray-300 rounded-md p-[20px] h-full">

      <!-- หัวข้อ -->
      <ul class="grid-list">
        <li class="grid-item col-1" style="font-weight: bold;">Number</li>
        <li class="grid-item col-4" style="font-weight: bold;">Username</li>
        <li class="grid-item col-3" style="font-weight: bold;">Email</li>
        <li class="grid-item col-2" style="font-weight: bold;">Role</li>
        <li class="grid-item col-3" style="font-weight: bold;">Tools</li>
      </ul>

      <!-- ตัวอย่างรายชื่อ -->
      <ul class="grid-list" v-for="(item, index) in user" :key="index">
        <li class="grid-item col-1">{{ index + 1 }}</li>
        <li class="grid-item col-4">{{ item.username }}</li>
        <li class="grid-item col-3">{{ item.email }}</li>
        <li class="grid-item col-2">{{ item.role }}</li>
        <li class="grid-item col-3">
          <router-link :to="`/Admin/AdminEditUser/${item.id}`"><i class="bi bi-pencil"></i></router-link>
          <i class="bi bi-trash" style="color: rgb(163, 22, 22); cursor: pointer;" @click="beforeDelete(item.id)"></i>
        </li>
      </ul>

    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const user = ref([]);

const fetchData = async () => {
  try {
    const result = await axios.get('http://localhost:5000/test-elearning-b0646/us-central1/api/admin');
    if (result) {
      user.value = result.data
      console.log("data", user.value)
    }
  } catch (error) {
    console.error("Error during getdata:", error);
  }
};

const beforeDelete =(id)=>{
  Swal.fire({
        title: "ยืนยันลบข้อมูลผู้ใช้?",
        text: "ไม่สามารถย้อนกลับการกระทำนี้ได้",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ลบ",
        cancelButtonText: "ยกเลิก"
      }).then((result) => {
        if (result.isConfirmed) {
          deleteUser(id)
          if(deleteUser()){
            Swal.fire({
            title: "ลบข้อมูลผู้ใช้สำเร็จ",
            icon: "success"
          });
          }
        }
      });
}

const deleteUser = async (id) => {
  try {
    const result = await axios.delete(`http://localhost:5000/test-elearning-b0646/us-central1/api/admin/delete/${id}`);
    if(result){
      fetchData();  
    }
  }
  catch (error) {
    console.error("Error during getdata:", error);
  }
}

onMounted(() => {
  fetchData();
});
</script>



<style scoped>
.top-sec {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

btn {
  width: fit-content;
  height: fit-content;
  margin-bottom: 20px;
}

h1 {
  font-size: 1.5rem;
  font-weight: bold;
}

.admin {
  background-color: rgb(183, 229, 229);
}

.grid-list {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
}

.grid-item {
  /* background-color: #f2f2f2; */
  padding: 10px;
  text-align: center;
  color: black;
}

.col-1 {
  flex-basis: calc(5% - 10px);
}

.col-4 {
  flex-basis: calc(45% - 10px);
}

.col-2 {
  flex-basis: calc(10% - 10px);
}

.col-3 {
  flex-basis: calc(20% - 10px);
}

.bi {
  padding: 3vh;
}

button {
  width: fit-content;
  height: fit-content;
  background-color: #EC4088;
  /* สีพื้นหลัง */
  color: white;
  /* สีตัวอักษร */
  border: none;
  /* ไม่มีเส้นขอบ */
  border-radius: 15px;
  /* มุมทรงกลม */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  /* เงา */
  padding: 10px 20px;
  /* การเว้นระยะขอบของปุ่ม */
  cursor: pointer;
  /* เปลี่ยนรูปลูกศรเป็นหลังคา */

}

button:hover {
  background-color: #D32F6A;
  /* สีพื้นหลังเมื่อ hover */
}

button i {
  width: fit-content;
  height: fit-content;
}

.btn {
  margin-bottom: 0.5vh;
}

/* Customize as needed for other column sizes */
</style>
