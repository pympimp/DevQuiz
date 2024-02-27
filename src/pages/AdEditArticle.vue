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
      <h1>Edit Article / Class</h1>
      <div>
        <h3>บทความ</h3>
        <div v-if="Data">
        {{ Data.nameUnit }}<input type="text" v-model="InputData.header" />
        <h3>Description</h3>
        <textarea v-model="InputData.discription" class="body" style="height: 8rem;"></textarea>
      
        <h3>แบบฝึกหัด</h3>
        <textarea v-model="InputData.question" class="body" style="height: 8rem;"></textarea>

        <h3>รูปแบบโค้ด</h3>
        <textarea v-model="InputData.body" class="body" style="height: 8rem;"></textarea>

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
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import { authenKey } from '../utils/config';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useAuthenStore } from '../stores/auth';

const authenStore = useAuthenStore()
const router = useRouter()
const Data = ref();
const route = useRoute()
const coursesId = ref()
const lessonId = ref()
const unitId = ref()
const name = ref()
const InputData = ref({
  header:'',
  question:'',
  body:'',
  discription:'',
  answer:[],
})

const htmlstart = ref(`<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>
  
<h1>This is a Heading</h1>
<p>This is a paragraph.</p>

</body>
</html>`)

const cssstart = ref(`<!DOCTYPE html>
<html>
<head>
<style>
h1 {
  font-family: verdana;
  font-size: 300%;
}
</style>
</head>
<body>

<h1>This is a heading</h1>
<p>This is a paragraph.</p>

</body>
</html>`)

const javascriptstart = ref(`<!DOCTYPE html>
<html>
<head>
    <title>HTML with JavaScript</title>
</head>
<body>

    <h1>Hello, World!</h1>

</body>
</html>`)

const code = ref({
  HTML: htmlstart,
  CSS: cssstart,
  JavaScript: javascriptstart
})

onMounted(()=>{
  setTimeout(()=>{
    if (!localStorage.getItem(authenKey)) {
        router.push({ name: 'LogIn' })
  }if(authenStore.auth.role !== 'admin'){
    router.push("/")
  }
  },800)
  if(route.params.coursesId && route.params.lessonId && route.params.unitId && route.params.name)
  coursesId.value = route.params.coursesId
  lessonId.value = route.params.lessonId
  unitId.value = route.params.unitId
  name.value = route.params.name
  fetchOneCourses()
})

const fetchOneCourses = async() =>{
  const result = await axios.get(` http://172.16.49.120:3000/coures/${coursesId.value}/${lessonId.value}/${unitId.value}`)
  if(result){
    Data.value = result.data
    if(Data.value){
      const { header, discription, answer,body,question } = Data.value;
      InputData.value = { header, discription, answer,body,question };
      if(body === ''){
        InputData.value.body = code.value[name.value]
      }
    }
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
await axios.put(`http://172.16.49.120:3000/coures/editCourse/${coursesId.value}/${lessonId.value}/${unitId.value}`,InputData.value)
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

@media only screen and (max-width: 480px) {
  h1 {
  font-size: 1.3rem;
}

input {
  width: 90%;
}
textarea.body {
  width: 90%;
}


.input-answer{
  width: 90%;
}


button {
  margin-left:0%;
  margin-top: 0;
}
}

@media screen and (min-width: 481px) and (max-width: 768px) {
  h1 {
  font-size: 1.3rem;
}

input {
  width: 85%;
}
textarea.body {
  width: 90%;
}


.input-answer{
  width: 90%;
}

button {
  margin-left:0%;
  margin-top: 0;
}
}

@media screen and (min-width: 769px)  {
  input {
  width: 30rem;
}
textarea.body {
  width: 32rem;
}


.input-answer{
  width: 14rem;
}
button {
  margin-left:0%;
  margin-top: 0;
}
}

</style>
