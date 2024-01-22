<template>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.17.0/font/bootstrap-icons.css"
    rel="stylesheet"
  />
  <div class="h-[calc(auto)] bg-gray-50 p-[20px] overflow-auto">
    <div @click="goback()" class="back-link">
      <!-- <i class="bi bi-arrow-left"></i> -->
      <i class="fa fa-arrow-left"></i>
      <p>Back</p>
    </div>

    <div class="border border-gray-300 rounded-md p-[20px] h-full">
      <div class="container">
      <h1>Edit Article</h1>
      <div>
        <h3>บทความ</h3>
        <div v-if="Data">
        {{ Data.nameUnit }}<input type="text" v-model="InputData.header" />
        <h3>Description</h3>
        <textarea v-model="InputData.discription" class="body" style="height: 100px;width: 53%;"></textarea>
      
        <h3>แบบฝึกหัด</h3>
        <textarea v-model="InputData.question" class="body" style="height: 100px;width: 53%;"></textarea>

        <h3>รูปแบบโค้ด</h3>
        <textarea v-model="InputData.body" class="body" style="height: 100px;width: 53%;"></textarea>

        <h3>คำตอบ</h3>
        <div class="answer-container">
          <div class="input-answer">
        <h4>แท็กเปิด</h4>
        <input type="text" v-model="InputData.answer[0]" />
      </div>
      <div class="input-answer">
        <h4>แท็กปิด</h4>
        <input type="text" v-model="InputData.answer[1]" />
      </div>
      </div>
      </div>
        <br />

        <button type="submit" @click="submit()">Submit</button>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import {getCurrentInstance, ref } from 'vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
const router = getCurrentInstance().appContext.config.globalProperties.$router;
const Data = ref();
const route = useRoute()
const coursesId = ref()
const lessonId = ref()
const unitId = ref()
const InputData = ref({
  header:'',
  question:'',
  body:'',
  discription:'',
  answer:[],
})

onMounted(()=>{
  if(route.params.coursesId && route.params.lessonId && route.params.unitId)
  coursesId.value = route.params.coursesId
  lessonId.value = route.params.lessonId
  unitId.value = route.params.unitId
  fetchOneCourses()
})

const fetchOneCourses = async() =>{
  const result = await axios.get(` http://localhost:5000/test-elearning-b0646/us-central1/api/coures/${coursesId.value}/${lessonId.value}/${unitId.value}`)
  if(result){
    Data.value = result.data
    if(Data.value){
      const { header, discription, answer,body,question } = Data.value;
      InputData.value = { header, discription, answer,body,question };
    }
    console.log("data",Data.value)
  }
}

const submit = () =>{
  Swal.fire({
        title: "ยืนยันแก้ไขข้อมูลบทเรียน?",
        text: "ไม่สามารถย้อนกลับการกระทำนี้ได้",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก"
      }).then((result) => {
        if (result.isConfirmed) {
          editCourses()
          if(editCourses()){
            Swal.fire({
            title: "แก้ไขข้อมูลสำเร็จ",
            icon: "success"
          });
          }
        }
      });
}

const editCourses = async() =>{
await axios.put(`http://localhost:5000/test-elearning-b0646/us-central1/api/coures/editCourse/${coursesId.value}/${lessonId.value}/${unitId.value}`,InputData.value)
}
const goback = () => {
  router.go(-1);
}
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
  width: 50%;
  border-radius: 15px;
  box-shadow: 0 6px 6px rgba(0, 0, 0, 0.1); /* กำหนดเงา */
  border: none; /* กำหนดไม่มีเส้นขอบ */
  margin: 5px; /* กำหนดการเว้นระยะขอบของ input */
}
textarea.body {
  width: 50%;
  height: 40vh;
  border-radius: 15px;
  box-shadow: 0 6px 6px rgba(0, 0, 0, 0.1); /* กำหนดเงา */
  border: none; /* กำหนดไม่มีเส้นขอบ */
  margin: 5px;
  resize: none;
}

.answer-container{
  display: flex;
  flex-direction: row;
}

.input-answer{
  display: flex;
  flex-direction: column;
  width: 27%;
}

.input-answer input{
  width: 80%;
}

button {
  background-color: #ec4088; /* สีพื้นหลัง */
  color: white; /* สีตัวอักษร */
  border: none; /* ไม่มีเส้นขอบ */
  border-radius: 15px; /* มุมทรงกลม */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* เงา */
  padding: 10px 20px; /* การเว้นระยะขอบของปุ่ม */
  cursor: pointer; /* เปลี่ยนรูปลูกศรเป็นหลังคา */
  margin-left: 71vh;
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
  cursor: pointer;
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

.container{
}
</style>
