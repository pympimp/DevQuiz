<template>
  <half-circle-spinner
            :animation-duration="1000"
            :size="60"
            color="#ff1d5e"
            class="loading"
            v-if="isLoading"
          />
  <div class="h-[calc(auto)] bg-gray-50 p-[20px] overflow-auto" v-if="!isLoading">
    <div class="top-sec">
      <router-link to="/Admin/ArticleList" class="back-link">
        <!-- <i class="bi bi-arrow-left"></i> -->
        <i class="fa fa-arrow-left"></i>
        <p>Back</p>
      </router-link>
      <div class="line" v-if="data">
        <img :src="data.img" alt="" />
        <h1>{{ data.fullname }}</h1>
      </div>
      <div class="right-end">
        <div class="search-container">
          <input v-model="Search" class="input1" />
          <FontAwesomeIcon
            icon="fa-solid fa-magnifying-glass"
            class="search-icon"
            v-if="Search === ''"
          />
          <FontAwesomeIcon
            @click="Search = ''"
            icon="fa-solid fa-xmark"
            class="search-icon"
            v-else
            style="cursor: pointer"
          />
        </div>
        <button v-if="data" class="btn" style="margin-bottom: 0.5vh" @click="changeName()">
          <i class="fa fa-plus"></i>
        </button>
      </div>
    </div>
    <div class="border border-gray-300 rounded-md p-[20px] h-full">
      <!-- หัวข้อ -->
      <!-- <ul class="grid-list" >
  <li class="grid-item col-1" style="font-weight: bold;">Unit</li>
  <li class="grid-item col-4" style="font-weight: bold;">Name</li>

  <li class="grid-item col-3" style="font-weight: bold;">Tools</li>
</ul> -->

      <!-- ตัวอย่างรายชื่อ -->
      <div v-if="data">
        <div class="card-container" v-for="(item, index) in fiteredLessonList" :key="index">
          <div class="card-lesson">
            <h1>{{ item.nameLesson }}</h1>
            <div class="button-box">
              <i
                class="bi bi-trash"
                style="
                  padding: 0;
                  cursor: pointer;
                  color: rgb(163, 22, 22);
                  font-size: 20px;
                  margin-top: 0.5vh;
                "
                v-if="!item.isExpanded"
                @click="preDelete(data.CoursesId, item.lessonId)"
              ></i>
              <router-link
                :to="`/Admin/AdminAddArticle/${data.CoursesId}/${item.lessonId}`"
                v-if="item.isExpanded"
              >
                <button class="btn"><i class="fa fa-plus"></i></button>
              </router-link>
              <button @click="toggleBox(index)" class="button-icon">
                <i
                  :class="{ 'bi-chevron-up': item.isExpanded, 'bi-chevron-down': !item.isExpanded }"
                ></i>
              </button>
            </div>
          </div>
          <Transition name="slide-fade">
            <div v-if="item.isExpanded" class="unit-container">
              <div v-for="(subitem, subindex) in item.units" :key="subindex" class="unit-card">
                <h2>{{ subindex + 1 }} {{ subitem.header }}</h2>
                <div>
                  <router-link
                    :to="`/Admin/AdminEditArticle/${data.CoursesId}/${item.lessonId}/${subitem.unitId}/${data.name}`"
                    ><i class="bi bi-pencil"></i
                  ></router-link>
                  <i
                    class="bi bi-trash"
                    style="color: rgb(163, 22, 22); cursor: pointer"
                    @click="preDelete(data.CoursesId, item.lessonId, subitem.unitId, 'unit')"
                  ></i>
                </div>
              </div>
            </div>
          </Transition>
        </div>
        <!-- <ul class="grid-list" v-for="(item, index) in data.lesson" :key="index">
  <div class="card-lesson">
    <h1>{{ item.nameLesson }}</h1>
    <button @click="toggleBox(index)">
              <i class="bi" :class="{'bi-chevron-up': item.isExpanded , 'bi-chevron-down': !item.isExpanded}"></i>
            </button>
  </div>
  <li class="grid-item col-1">1</li>
  <li class="grid-item col-4">User01</li>

  <li class="grid-item col-3"><router-link to="/Admin/AdminEditArticle"><i class="bi bi-pencil "/></router-link><i class="bi bi-trash" style="color: rgb(163, 22, 22);"/></li>
</ul> -->
      </div>

      <!-- <ul class="grid-list">
  <li class="grid-item col-1">2</li>
  <li class="grid-item col-4">User02</li>

  <li class="grid-item col-3"><i class="bi bi-pencil "/><i class="bi bi-trash "/></li>
</ul> -->
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { HalfCircleSpinner } from 'epic-spinners'
import axios from 'axios'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { authenKey } from '../utils/config';
import { useAuthenStore } from '../stores/auth'

const authenStore = useAuthenStore()
const route = useRoute()
const courses = ref()
const data = ref()
const isLoading = ref(false)
const Search = ref('')
const router = useRouter()

onMounted(() => {
  setTimeout(()=>{
    if (!localStorage.getItem(authenKey)) {
        router.push({ name: 'LogIn' })
  }if(authenStore.auth.role !== 'admin'){
    router.push("/")
  }
  },800)
  if (route.params.id) {
    courses.value = route.params.id
    fetchOneCourses()
  }
})

const fetchOneCourses = async () => {
  isLoading.value = true
  const result = await axios.get(
    `http://localhost:5000/test-elearning-b0646/us-central1/api/coures/lessons/${courses.value}`
  )
  if (result) {
    data.value = result.data
    console.log('data', data.value)
    isLoading.value = false
  }
}

const toggleBox = (index) => {
  if (data.value.lessons[index].isExpanded == false) {
    data.value.lessons[index].isExpanded = true
  } else {
    data.value.lessons[index].isExpanded = false
  }
}

const preDelete = (coursesId, lessonId, unitId, auth) => {
  if (auth === 'unit') {
    Swal.fire({
      title: 'ยืนยันลบข้อมูลแบบทดสอบ?',
      text: 'ไม่สามารถย้อนกลับการกระทำนี้ได้',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ลบ',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUnit(coursesId, lessonId, unitId)
        if (deleteUnit()) {
          Swal.fire({
            title: 'ลบข้อมูลแบบทดสอบสำเร็จ',
            icon: 'success'
          })
        }
      }
    })
  } else {
    Swal.fire({
      title: 'ยืนยันลบข้อมูลบทเรียน?',
      text: 'ไม่สามารถย้อนกลับการกระทำนี้ได้',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ลบ',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteLesson(coursesId, lessonId)
        if (deleteLesson()) {
          Swal.fire({
            title: 'ลบข้อมูลบทเรียนสำเร็จ',
            icon: 'success'
          })
        }
      }
    })
  }
}

const deleteUnit = async (coursesId, lessonId, unitId) => {
  const result = await axios.delete(
    ` http://localhost:5000/test-elearning-b0646/us-central1/api/coures/deleteCourse/${coursesId}/${lessonId}/${unitId}`
  )
  if (result) {
    fetchOneCourses()
  }
}

const changeName = () => {
  isLoading.value = true
  const lessonIndex = data.value.lessons.length - 1
  const lessonName = data.value.lessons[lessonIndex].nameLesson
  const match = lessonName.match(/(\d+)/)
  const number = parseInt(match[0], 10)
  const finalName = `lesson${number + 1}`
  if (finalName) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Add Lesson Success',
      showConfirmButton: false,
      timer: 1500
    })
    addLesson(finalName)
  }
}

const addLesson = async (finalName) => {
  const result = await axios.post(
    `http://localhost:5000/test-elearning-b0646/us-central1/api/coures/addLesson/${data.value.CoursesId}`,
    {
      nameLesson: finalName
    }
  )
  if (result) {
    fetchOneCourses()
    isLoading.value = false
  }
}

const deleteLesson = async (coursesId, lessonId) => {
  const result = await axios.delete(
    `http://localhost:5000/test-elearning-b0646/us-central1/api/coures/deleteLesson/${coursesId}/${lessonId}`
  )
  if (result) {
    fetchOneCourses()
  }
}

const fiteredLessonList = computed(()=>{
  const searchText = Search.value.toLowerCase();

  return data.value.lessons.filter((data)=>{
    return(
      data.nameLesson.toLowerCase().includes(searchText) 
    )
  })
})
</script>

<style scoped>
.top-sec {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.loading {
  position: absolute;
  top: 50%;
  left: 60%;
  transform: translate(-50%, -50%);
}

.right-end {
  display: flex;
  justify-content: flex-end;
  width: 50%;
}

.search-container {
  position: relative;
  width: 90%;
  margin-right: 5%;
}

.input1 {
  width: 100%;
  height: 35px;
  align-self: flex-start;
  border-radius: 24.5px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  padding: 0 0 0 40px;
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-80%);
  width: 20px; /* ปรับขนาดไอคอนตามต้องการ */
  height: 20px;
}

.unit-card {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  font-size: 20px;
  padding: 10px;
  border-bottom: 1px solid gray;
  justify-content: space-between;
}

.line {
  display: flex;
  align-items: start;
}

img {
  width: 3.5vh;
  height: 3.5vh;
  margin-bottom: 1vh;
}

h1 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 1vh;
}
.admin {
  background-color: rgb(183, 229, 229);
}

.card-lesson {
  display: flex;
  flex-direction: row;
  background-color: gainsboro;
  justify-content: space-between;
  padding: 10px;
  margin-top: 10px;
  border-radius: 10px;
}

.button-icon {
  background-color: #ffffff;
  color: #000000;
  padding: 10px;
  cursor: pointer;
  margin-left: 10px;
  width: 40px;
  height: 90%;
}

.button-icon:hover {
  background-color: #848484;
}

.unit-container {
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-top: 10px;
}

.card-container {
  display: flex;
  flex-direction: column;
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
}

.col-1 {
  flex-basis: calc(20% - 10px); /* 10% ของความกว้างแต่ละรายการ */
}

.col-4 {
  flex-basis: calc(20% - 10px); /* 10% ของความกว้างแต่ละรายการ */
}

.col-3 {
  flex-basis: calc(60% - 10px); /* 80% ของความกว้างแต่ละรายการ */
}

.bi {
  padding: 3vh;
}

button {
  width: fit-content;
  height: fit-content;
  background-color: #ec4088; /* สีพื้นหลัง */
  color: white; /* สีตัวอักษร */
  border: none; /* ไม่มีเส้นขอบ */
  border-radius: 15px; /* มุมทรงกลม */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* เงา */
  padding: 10px 20px; /* การเว้นระยะขอบของปุ่ม */
  cursor: pointer; /* เปลี่ยนรูปลูกศรเป็นหลังคา */
}

button:hover {
  background-color: #d32f6a; /* สีพื้นหลังเมื่อ hover */
}

.btn {
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

.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.button-box {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

@media only screen and (max-width: 480px) {
  img {
  width: 3vh;
  height: 3vh;
  margin-left: 1rem;
}

h1 {
  font-size: 1rem;
}
}

@media screen and (min-width: 481px) and (max-width: 768px) {
  img {
  width: 3vh;
  height: 3vh;
  margin-left: 1rem;
}

h1 {
  font-size: 1.2rem;
}
}

@media screen and (min-width: 769px)  {
  h1 {
  font-size: 1.2rem;
}
}

</style>
