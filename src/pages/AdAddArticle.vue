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
      <h1>Add Article</h1>
      <div>
        <h3>บทความ</h3>
        <input type="text" v-model="InputData.header" />
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
        <br />

        <button class="btn" @click="submit()">Submit</button>
      </div>
    </div>
  </div>
  </div>
</template>
  
  <script setup>
  import { ref,onMounted } from 'vue';
  import { useRouter,useRoute } from 'vue-router';
  import Swal from 'sweetalert2';
  import axios from 'axios';
import 'sweetalert2/dist/sweetalert2.min.css';
import { authenKey } from '../utils/config';
import { useAuthenStore } from '../stores/auth';

  const route = useRoute();
  const router = useRouter();
  const InputData = ref({
    header:'',
  question:'',
  body:'',
  discription:'',
  answer:[],
})
const authenStore = useAuthenStore()
const coursesId = ref();
const lessonId = ref();

onMounted(()=>{
  setTimeout(()=>{
    if (!localStorage.getItem(authenKey)) {
        router.push({ name: 'LogIn' })
  }if(authenStore.auth.role !== 'admin'){
    router.push("/")
  }
  },800)
  if(route.params.coursesId && route.params.lessonId){
    coursesId.value = route.params.coursesId;
    lessonId.value = route.params.lessonId
  }
})
const submit = () =>{
  Swal.fire({
        title: "ยืนยันการสร้างแบบทดสอบ?",
        text: "ไม่สามารถย้อนกลับการกระทำนี้ได้",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก"
      }).then(async(result) => {
        if (result.isConfirmed) {
          await createCourses()
          if(createCourses){
            Swal.fire({
            title: "สร้างสำเร็จ",
            icon: "success"
          });
          goback()
          }
        }
      });
}

const createCourses = async() =>{
const result = await axios.post(`https://functions-khaki-gamma.vercel.app/coures/create/${coursesId.value}/${lessonId.value}`,InputData.value)
if(result){
  InputData.value = ({
    header:'',
    question:'',
    body:'',
    discription:'',
    answer:[],
  })
}
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

@media screen and (min-width: 769px) and (max-width: 1024px) {

button {
  margin-left:0%;
  margin-top: 0;
}
}

@media screen and (min-width: 1025px) {
button {
  margin-left:0%;
  margin-top: 0;
}
}
</style>

  